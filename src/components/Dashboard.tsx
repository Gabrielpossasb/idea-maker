import { InputCustom } from "../components/Input";

export function Dashboard() {
   return(
      <div className=" flex items-center justify-center h-full w-ful">
         <div className="flex items-center justify-center max-w-[350px] p-2 w-full flex-col rounded-lg gap-10">
            <div className="flex items-center justify-center flex-col text-sm mb-2">
               <text className="font-bold text-gray-800 text-[26px] mb-3">Faça login na sua conta</text>
               <text>Bem-vindo! Insira seus dados.</text>
            </div>

            <InputCustom name={'Email:'} type={'email'}/>
            <InputCustom name={'Password:'} type={'password'}/>

            <div className="flex flex-col w-[90%] gap-2 mt-4">
               <button className="bg-orange-500 p-2 text-white font-semibold text-lg rounded-full hover:brightness-90 duration-300">
                  Entrar
               </button>
               <a className="self-center text-sm underline hover:text-orange-400 duration-300">Esqueci minha senha</a>
            </div>
         </div>
      </div>
   )
}