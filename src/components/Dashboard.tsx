import { useForm } from "react-hook-form";
import Router from "next/router";
import { FormEvent, useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase-config";
import { FiEye, FiEyeOff } from "react-icons/fi";


export function Dashboard() {
   const { formState:{isSubmitting}, handleSubmit, register } = useForm()

   const [ loginError, setLoginError ] = useState(false)

   const [ email, setEmail ] = useState('')
   const [ password, setPassword ] = useState('')

   const [ visiblePass, setVisiblePass] = useState(false);

   const login = async (event: FormEvent) => {
      event.preventDefault();
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        Router.push('/dashboard')
  
      } catch (error) {
         setLoginError(true)
      }
    };

   return(
      <div className=" flex items-center justify-center h-full w-ful">
         <div className="flex items-center justify-center max-w-[350px] p-2 w-full flex-col rounded-lg gap-8">
            <div className="flex items-center justify-center flex-col text-sm mb-2">
               <text className="font-bold text-gray-800 text-[26px] mb-3">Faça login na sua conta</text>
               <text>Bem-vindo! Insira seus dados.</text>
            </div>
            
            <form onSubmit={login} id="form-login"  className={'w-full flex flex-col gap-8'}>
               <div className="flex w-full gap-1 flex-col font-semibold">
                  Email:
                  <input type={'email'} {...register("email", { required: true, onChange:(event) => setEmail(event.target.value),})} 
                     className={'outline-none p-1 pl-2 font-normal rounded-md shadow-orangelg'}
                  />
               </div>
               <div className="flex w-full gap-1 flex-col font-semibold">
                  Password:
                  <input type={`${visiblePass?'':'password'}`} {...register("password", { required: true, onChange:(event) => setPassword(event.target.value),})} 
                  className={'outline-none p-1 pl-2 font-normal rounded-md shadow-orangelg'}/>
                  <i  className="-mt-[32px] mr-2 self-end" >
                     { !visiblePass ? 
                        <FiEyeOff className=" rounded-full" size={24} color="#aaaaaace" onClick={() => setVisiblePass(true)}/>
                        :
                        <FiEye size={24} color="#616161" onClick={() => setVisiblePass(false)}/>
                     }
                  </i>
               </div>
               
               <text className={`text-red-500 text-center font-medium transition-opacity duration-700 text-[14px] ${(loginError) ? 'opacity-100' : 'opacity-0'}`}>E-mail ou senha incorretos. Tente novamente</text>
               
            </form>

            <div className="flex flex-col w-[90%] gap-2 -mt-3">
               <button type="submit" form="form-login" disabled={isSubmitting}
                  className="bg-orange-500 p-2 text-white font-semibold text-lg rounded-full hover:brightness-90 duration-300"
               >
                  Entrar
               </button>
               
               <button onClick={ () => Router.push('/passRecup')} className="self-center text-sm underline hover:text-orange-400 duration-300">
                  Esqueci minha senha
               </button>
               
            </div>
         </div>
      </div>
   )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
   console.log(ctx.req.cookies);

   return {
      props: {}
   }
}