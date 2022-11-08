import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useRouter } from 'next/router'
import { UserContext } from "../contexts/getUser";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase-config";

export default function Project() {
   const { verifiedUser, dataProject, getProject,  } = useContext(UserContext) 
   const { query,push, asPath } = useRouter()

   const [ user, setUser ] = useState('')

   useEffect( () => {
      if (query.slug != undefined) {
         getProject()
      }      
      onAuthStateChanged(auth, currentUser => {
         setUser(currentUser?.email!)
      })
   }, [query.slug])

   return (
      <div className='h-[100vh] flex flex-col'>

         {(!!user) && (
            <div className="left-10 top-4 absolute cursor-pointer bg-orange-600 rounded-lg"
            >
               <img className="w-32 lg:w-36 hover:brightness-75 duration-300" onClick={() => push('/home')} src="./Logo.svg" />
            </div>
         )}
         <div className="flex p-4 py-8 justify-center "
            style={{backgroundColor: dataProject.bgColor, color: dataProject.textColor}}
         >
            <div className="flex items-center flex-col w-full max-w-5xl gap-12">
               
               <text className="p-4 text-center font-bold text-5xl">{dataProject.title}</text>

               <img src={dataProject.img1} alt={'Image Intouction'} className="bg-gray-700 max-w-3xl rounded-md border border-gray-500"/>

               <text className="text-center">{dataProject.description1}</text>

               <text className="text-center text-4xl">{dataProject.subTitle2}</text>

               <img src={dataProject.img2} alt={'Image Intouction'} className="bg-gray-700 max-w-3xl rounded-md border border-gray-500"/>

               <text className="text-center">{dataProject.description2}</text>
            </div>
         </div>
      </div>
   )
}