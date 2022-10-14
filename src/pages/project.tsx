import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { db } from "../services/firebase-config";
import Router from 'next/router'

export interface dataType {
   name: string,
   title: string
}

export default function Project() {

   const [ data, setData ] = useState({} as dataType)

   useEffect(() => {
      handleGetData()
   }, [])

   async function handleGetData() {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const stats = { name: Router.query.slug as string, id: Router.query.email as string}
      const querySnapshot = await getDoc(doc(db, "user-data", stats.id));
      const dataResponse = querySnapshot.data()
      const d = (dataResponse?.projects.filter((a: { name: string; }) => a.name === stats.name))
      setData(d[0])
      console.log(d)

   }

   return (
      <div className='h-[100vh] flex flex-col'>
         <Header/>
         <div className="flex p-10 items-center flex-col gap-8">
            {data.name}

            <text className="p-4 text-center text-5xl outline-none rounded-lg border-2 border-gray-400">{data.title}</text>
            
            <text className="text-center w-[800px]">{data.title}</text>

         </div>
      </div>
   )
}