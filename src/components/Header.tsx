import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../contexts/getUser";
import { FiX } from 'react-icons/fi'
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase-config";


export function Header() {
   const { user } = useContext(UserContext)
   const { asPath } = useRouter()

   return(
      <div className={`bg-orange-600 shadow-header flex items-center justify-between px-10 `}>
         <img className="" src="./Logo.svg" />
         { (asPath === '/dashboard') && (
            <div className="bg-orange-300 flex rounded-full items-center justify-center gap-2 px-4 py-2 border-[#ff953f] border-4">
               <div className="w-12 h-12 bg-cyan-400 items-center flex rounded-full justify-center text-white text-4xl font-medium">
                  {user?.email?.substring(0,1).toLocaleUpperCase()}
               </div>
               <text className="sm:flex hidden">{user?.email?.split('@')[0]}</text>
               <FiX color={'gray'} size={32} 
                  onClick={() =>signOut(auth)}
                  className={'hover:bg-[#c48e59a2] rounded-full p-1'}   
               />
            </div>
         )}
      </div>
   )
}