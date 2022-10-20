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
         { (user != '') && (
            <div className="bg-orange-300 flex rounded-full items-center justify-center gap-2 px-4 py-2 border-[#e7ac7c] border-2">
               <div className="w-10 h-10 bg-cyan-400 items-center flex rounded-full justify-center text-white text-3xl font-medium">
                  {user.substring(0,1).toLocaleUpperCase()}
               </div>
               <text className="sm:flex hidden">{user.split('@')[0]}</text>
               <FiX color={'gray'} size={32} 
                  onClick={() =>signOut(auth)}
                  className={'hover:bg-[#c48e59a2] transition-colors duration-500 rounded-full p-1'}   
               />
            </div>
         )}
      </div>
   )
}