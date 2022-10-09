import { confirmPasswordReset } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../components/Header";
import { auth } from "../services/firebase-config";

export default function RecuperationPass() {
   const { formState:{isSubmitting}, handleSubmit, register } = useForm()

   const { push, query } = useRouter()

   const [ password, setPassword ] = useState('')
   const [ passwordConfirmation, setPasswordConfirmation ] = useState('')


   function resetPassword(e: FormEvent) {
      e.preventDefault()
      const code: string = query.oobCOde as string;
      console.log(code)
      if (password === passwordConfirmation) {
         try {
            confirmPasswordReset(auth, code, password)
            console.log('senha alteada')
            push('/')
         } catch (err) {
            alert('Desculpe! Ocorreu um erro inesperado. Tente novamente')
         }
      } else {
         alert('As senhas são diferentes')
      }
   }

   return (
      <div className='h-[100vh] flex flex-col'>
         <Header/>
         <div className=" flex items-center justify-center h-full w-ful">
            <div className="flex items-center justify-center max-w-[350px] p-2 w-full flex-col rounded-lg gap-10">
               <div className="flex items-center justify-center flex-col text-sm">
                  <text className="font-bold text-gray-800 text-[26px] mb-3">Redefina sua senha</text>
                  <text className="text-center">Por favor, insira abaixo uma nova senha e confirme-a em seguida.</text>
               </div>
               
               <form onSubmit={(e) => resetPassword(e)}  id="form-recuperation-pass" className="flex w-full gap-2 flex-col font-semibold">
                  Senha:
                  <input type={'password'} {...register("password", { required: true, onChange:(event) => setPassword(event.target.value),})} className={'outline-none p-1 pl-2 font-normal rounded-md shadow-orangelg'}/>
                     <div className="ml-6 mb-4 font-normal text-[14px] flex-col flex gap-2 text-[#838282]">
                        <text className="text-[#3fbb50]">- No mínimo 8 caracteres</text>
                        <text>- Uma letra maiúscula</text>
                        <text>- Um caracter especial</text>
                     </div>

                  Repita sua nova senha:
                  <input type={'password'} {...register("passwordCongirmation", { required: true, onChange:(event) => setPasswordConfirmation(event.target.value),})} className={'outline-none p-1 pl-2 font-normal rounded-md shadow-orangelg'}/>

               </form>

               <div className="flex flex-col w-[90%] gap-4 mt-4">
                  <button type="submit" form="form-recuperation-pass" disabled={isSubmitting}
                     className="bg-orange-500 p-2 text-white font-semibold text-lg rounded-full hover:brightness-90 duration-300"
                  >
                     Confirmar
                  </button>
                  <button onClick={() => push('/')} className="self-center underline hover:text-orange-400 duration-300">Cancelar</button>
               </div>
            </div>
         </div>
       </div>
      
   )
}