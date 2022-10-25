import { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import { useRouter } from 'next/router'
import { UserContext } from "../contexts/getUser";

export default function Project() {
   const { verifiedUser, dataProject } = useContext(UserContext) 
   const { query,push } = useRouter()

   useEffect( () => {
      if (query.slug != undefined) {
         verifiedUser()
      }      
   }, [query.slug])

   return (
      <div className='h-[100vh] flex flex-col'>
         <Header/>
         <div className="flex p-4 py-8 justify-center">
            <div className="flex items-center flex-col w-full max-w-5xl gap-8">
               <text className="p-4 text-center text-5xl">{dataProject.title}</text>
               
               <div className="bg-gray-700 h-48 w-[50%]"/>

               <text className="text-center">{dataProject.description1}</text>

               <text className="text-center text-4xl">{dataProject.subTitle2}</text>

               <text className="text-center">{dataProject.description2}</text>
            </div>
         </div>
      </div>
   )
}