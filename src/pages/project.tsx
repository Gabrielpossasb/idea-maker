import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { db } from "../services/firebase-config";

interface dataType {
   email: {stringValue: string},
   docTitle: { stringValue: string},
   docDescription1: { stringValue: string},
}

export default function Project() {

   const [ data, setData ] = useState<dataType>()

   useEffect(() => {
      handleGetData()
   }, [])

   async function handleGetData() {
      const querySnapshot = await getDoc(doc(db, "user-data", '4PaqW5hKnzTvjs6wP14j'));
      const dataResponse: dataType = querySnapshot._document.data.value.mapValue.fields
      setData(dataResponse)
   }

   return (
      <div className='h-[100vh] flex flex-col'>
         <Header/>
         <div className="flex p-10 items-center flex-col gap-8">
            The project

            <text className="p-4 text-center text-5xl outline-none rounded-lg border-2 border-gray-400">{data?.docTitle.stringValue}</text>
            
            <text className="text-center w-[800px]">{data?.docDescription1.stringValue}</text>

         </div>
      </div>
   )
}