import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../components/Header";

export default function PassRecup() {
   const { formState:{isSubmitting}, handleSubmit, register } = useForm()

   const { push } = useRouter()

   const [ email, setEmail ] = useState('')

   function onSubmit() {
      push('/')
   }

   return (
      <div className='h-[100vh] flex flex-col'>
         <Header/>
         <div className=" flex items-center justify-center h-full w-ful">
            <div className="flex items-center justify-center max-w-[350px] p-2 w-full flex-col rounded-lg gap-14">
               <div className="flex items-center justify-center flex-col text-sm">
                  <text className="font-bold text-gray-800 text-[26px] mb-3">Recuperação de senha</text>
                  <text className="text-center">Por favor, insira seu email que lhe enviaremos um link de recuperação</text>
               </div>
               
               <form onSubmit={handleSubmit(onSubmit)}  id="form-recuperation-pass" className="flex w-full gap-1 flex-col font-semibold">
                  Email:
                  <input type={'email'} {...register("email", { required: true, onChange:(event) => setEmail(event.target.value),})}
                     className={'outline-none p-1 pl-2 font-normal rounded-md shadow-orangelg'}
                  />
               </form>

               <div className="flex flex-col w-[90%] gap-4 mt-4">
                  <button type="submit" form="form-recuperation-pass" disabled={isSubmitting}
                     className="bg-orange-500 p-2 text-white font-semibold text-lg rounded-full hover:brightness-90 duration-300"
                  >
                     Confirmar
                  </button>
                  <button onClick={() => push('/')} className="self-center underline hover:text-orange-400 duration-300">Voltar</button>
               </div>
            </div>
         </div>
       </div>
      
   )
}