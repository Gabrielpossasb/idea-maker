import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { db } from "../services/firebase-config";

export interface dataType {
   email:  string,
   docTitle:  string,
   docDescription1:  string,
}

export default function Project() {

   const [ data, setData ] = useState({} as dataType)

   useEffect(() => {
      handleGetData()
   }, [])

   async function handleGetData() {
      const querySnapshot = await getDoc(doc(db, "user-data", '4PaqW5hKnzTvjs6wP14j'));
      const dataResponse = querySnapshot.data() as dataType
      console.log(dataResponse)
      setData(dataResponse)
   }

   return (
      <div className='h-[100vh] flex flex-col'>
         <Header/>
         <div className="flex p-10 items-center flex-col gap-8">
            The project

            <text className="p-4 text-center text-5xl outline-none rounded-lg border-2 border-gray-400">{data.docTitle}</text>
            
            <text className="text-center w-[800px]">{data.docDescription1}</text>

         </div>
      </div>
   )
}