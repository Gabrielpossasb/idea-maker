import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { db } from "../services/firebase-config";
import Router, { useRouter } from 'next/router'
import { UserContext, UserProjectData } from "../contexts/getUser";

export interface dataType {
   name: string,
   title: string,
   description: string
}

export default function Project() {
   const { verifiedUser, dataProject } = useContext(UserContext) 
   const { query,push } = useRouter()


   useEffect( () => {
      if (query.slug != undefined) {
         verifiedUser()
      } else {
         console.log('gmap')
      }
      
   }, [query.slug])

   

   return (
      <div className='h-[100vh] flex flex-col'>
         <Header/>
         <div className="flex p-10 items-center flex-col gap-8">
            {dataProject.name}

            <text className="p-4 text-center text-5xl outline-none rounded-lg border-2 border-gray-400">{dataProject.title}</text>
            
            <text className="text-center w-[800px]">{dataProject.title}</text>

         </div>
      </div>
   )
}