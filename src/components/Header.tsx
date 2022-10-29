import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../contexts/getUser";
import { FiX } from 'react-icons/fi'
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase-config";


export function Header() {
   const { user } = useContext(UserContext)
   const { asPath, push } = useRouter()

   return(
      <div className={`bg-orange-600 shadow-header relative top-0 flex items-center justify-between px-10 `}>
         <img className="w-32 lg:w-36" onClick={() => push('/home')} src="./Logo.svg" />
         { (user != '') && (
            <div className="bg-[#f7a74c] flex rounded-full items-center border-2 duration-200 border-orange-600 hover:border-orange-400 font-medium text-white justify-center gap-2 px-4 py-2">
               <div className="w-10 h-10 bg-[#0ECBC0] items-center flex rounded-full justify-center text-3xl">
                  {user.substring(0,1).toLocaleUpperCase()}
               </div>
               <text className="sm:flex hidden">{user.split('@')[0]}</text>
               <FiX size={32} 
                  onClick={() =>signOut(auth)}
                  className={'hover:bg-[#d1832abb] text-gray-500 transition-colors duration-500 rounded-full p-1'}   
               />
            </div>
         )}
      </div>
   )
}