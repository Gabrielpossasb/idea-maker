import { confirmPasswordReset } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Header } from "../components/Header";
import { auth } from "../services/firebase-config";

export default function RecuperationPass() {
   const { formState:{isSubmitting}, handleSubmit, register } = useForm()

   const { push, query } = useRouter()

   const [ password, setPassword ] = useState('')
   const [ passwordConfirmation, setPasswordConfirmation ] = useState('')

   const [ loginError, setLoginError ] = useState(false)

   let regexUpper = /[A-Z]/.test(password)
   let regexEspecial = /[@!#$%^&*()/\\]/.test(password);

   const [ visiblePass, setVisiblePass] = useState(false);

   function resetPassword(e: FormEvent) {
      e.preventDefault()
      const code = query.oobCode as string;
      if (password === passwordConfirmation) {
         try {
            confirmPasswordReset(auth, code, password)
            push('/')
         } catch (err) {
            alert('Desculpe! Ocorreu um erro inesperado. Tente novamente')
         }
      } else {
         setLoginError(true)
      }
   }

   return (
      <div className='h-[100vh] flex flex-col'>
         <Header/>
         <div className=" flex items-center justify-center h-full w-ful">
            <div className="flex items-center justify-center max-w-[350px] p-2 w-full flex-col rounded-lg gap-8">
               <div className="flex items-center justify-center flex-col text-sm">
                  <text className="font-bold text-gray-800 text-[26px] mb-3">Redefina sua senha</text>
                  <text className="text-center">Por favor, insira abaixo uma nova senha e confirme-a em seguida.</text>
               </div>
               
               <form onSubmit={(e) => resetPassword(e)}  id="form-recuperation-pass" className="flex w-full gap-2 flex-col font-semibold">
                  Senha:
                  <input type={`${visiblePass?'':'password'}`} id="password" {...register("password", { required: true, maxLength: 20, min: 6,
                      onChange:(event) => setPassword(event.target.value),
                      pattern: /^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/
                     })} 
                     className={'outline-none p-1 pl-2 font-normal rounded-md shadow-orangelg'}
                  />
                     <i  className="-mt-[36px] mr-2 self-end" >
                        { !visiblePass ? 
                           <FiEyeOff className=" rounded-full" size={24} color="#666666" onClick={() => setVisiblePass(true)}/>
                           :
                           <FiEye size={24} color="#686868" onClick={() => setVisiblePass(false)}/>
                        }
                     </i>
                     
                  
                     
                  
                     <div className="ml-6 mb-4 font-medium text-[14px] flex-col flex gap-2 text-[#838282]">
                        <text className={`${password.length >= 6 && 'text-[#379b50]'}`}>- No mínimo 6 caracteres</text>
                        <text className={`${regexUpper && 'text-[#379b50]'}`}>- Uma letra maiúscula</text>
                        <text className={`${regexEspecial && 'text-[#379b50]'}`}>- Um caracter especial (@!#$% ...)</text>
                     </div>

                  Repita sua nova senha:
                  <input type={`${visiblePass?'':'password'}`} {...register("passwordCongirmation", { required: true, onChange:(event) => setPasswordConfirmation(event.target.value),})} className={'outline-none p-1 pl-2 font-normal rounded-md shadow-orangelg'}/>
                  
                  <text className={`mt-2 text-red-500 text-center font-medium transition-opacity duration-700 text-[14px] ${(loginError) ? 'opacity-100' : 'opacity-0'}`}>
                     As senhas não são iguais. Tente novamente
                  </text>
               </form>

               <div className="flex flex-col w-[90%] gap-4 -mt-4">
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