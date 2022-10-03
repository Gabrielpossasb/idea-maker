import { InputCustom } from "../components/Input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Link from "next/link";

export function Dashboard() {
   const users = [ 
      {
         email:'gabrielpossas17@gmail.com', 
         password: '123123'
      },
      {
         email:'gabrielpossas22@gmail.com', 
         password: '456456'
      },
   ];

   const { formState:{isSubmitting}, handleSubmit, register } = useForm()

   const [ email, setEmail ] = useState('')
   const [ password, setPassword ] = useState('')

   const { push } = useRouter()

   function onSubmit() {
      const login = {email, password}

      const loginVerifided = users.filter( data => {
         return (login.email === data.email && login.password === data.password)
      })
      console.log(loginVerifided[0])

      { !loginVerifided[0] ? (
            alert('login invalido')
         ): (
            push('/dashboard')
         ) 
      }

   }

   return(
      <div className=" flex items-center justify-center h-full w-ful">
         <div className="flex items-center justify-center max-w-[350px] p-2 w-full flex-col rounded-lg gap-10">
            <div className="flex items-center justify-center flex-col text-sm mb-2">
               <text className="font-bold text-gray-800 text-[26px] mb-3">Faça login na sua conta</text>
               <text>Bem-vindo! Insira seus dados.</text>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} id="form-login"  className={'w-full flex flex-col gap-8'}>
               <div className="flex w-full gap-1 flex-col font-semibold">
                  Email:
                  <input type={'email'} {...register("email", { required: true, onChange:(event) => setEmail(event.target.value),})} 
                     className={'outline-none p-1 pl-2 font-normal rounded-md shadow-orangelg'}
                  />
               </div>
               <div className="flex w-full gap-1 flex-col font-semibold">
                  Password:
                  <input type={'password'} {...register("password", { required: true, onChange:(event) => setPassword(event.target.value),})} className={'outline-none p-1 pl-2 font-normal rounded-md shadow-orangelg'}/>
               </div>
            </form>

            <div className="flex flex-col w-[90%] gap-2 mt-4">
               <button type="submit" form="form-login" disabled={isSubmitting}
                  className="bg-orange-500 p-2 text-white font-semibold text-lg rounded-full hover:brightness-90 duration-300"
               >
                  Entrar
               </button>
               
               <button onClick={ () => push('/passRecup')} className="self-center text-sm underline hover:text-orange-400 duration-300">
                  Esqueci minha senha
               </button>
               
            </div>
         </div>
      </div>
   )
}