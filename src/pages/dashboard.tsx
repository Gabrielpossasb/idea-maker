import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { UserContext } from "../contexts/getUser";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase-config";

export default function Dashboard() {
   const { user, verifiedUser } = useContext(UserContext) 

   const [ docTitle, setDocTitle ] = useState('')

    useEffect( () => {
      UserVerified();
   }, [])

   async function UserVerified() {
      await new Promise(resolve => setTimeout(resolve, 4000));
      verifiedUser()
      
   }

   async function handleGetData() {
      const querySnapshot = await getDoc(doc(db, "user-data", '4PaqW5hKnzTvjs6wP14j'));
      
      console.log(querySnapshot._document.data.value.mapValue.fields.email.stringValue);
   }

   async function handleSendData() {
      await updateDoc(doc(db, "user-data", "4PaqW5hKnzTvjs6wP14j"), {
         docTitle: docTitle  
      });
   }

   return(
      <div className='h-[100vh] flex flex-col'>
         <Header/>
         
         <div className="flex p-10 items-center flex-col">
            <input className="h-20 w-[80%] text-center text-5xl outline-none rounded-lg border-2 border-gray-400" value={docTitle} onChange={(e) => setDocTitle(e.target.value)}/>
            <img src="" className="bg-gray-700 h-48 w-[50%]"/>
            <input type={"image"}/>
            <button onClick={() => handleGetData()}>Receber dados</button>
            <button onClick={() => handleSendData()}>Enviar dados</button>
         </div>
         
      </div>
   )
}