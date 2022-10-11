import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import Router from 'next/router'
import { UserContext } from "../contexts/getUser";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { FiArrowRightCircle } from "react-icons/fi";

export default function Dashboard() {
   const { user, verifiedUser } = useContext(UserContext) 

   const [ docTitle, setDocTitle ] = useState('')
   const [ docDescription1, setDocDescription1 ] = useState('')

    useEffect( () => {
      UserVerified();
   }, [])

   async function UserVerified() {
      await new Promise(resolve => setTimeout(resolve, 4000));
      verifiedUser()
      
   }

   async function handleGetData() {
      const querySnapshot = await getDoc(doc(db, "user-data", '4PaqW5hKnzTvjs6wP14j'));
      
      console.log(querySnapshot._document.data.value.mapValue.fields);
   }

   async function handleSendData() {
      await updateDoc(doc(db, "user-data", "4PaqW5hKnzTvjs6wP14j"), {
         docTitle: docTitle,  
         docDescription1: docDescription1
      });
   }

   async function NavigateProject() {
      await updateDoc(doc(db, "user-data", "4PaqW5hKnzTvjs6wP14j"), {
         docTitle: docTitle,  
         docDescription1: docDescription1
      });
      await new Promise(resolve => setTimeout(resolve, 4000));
      Router.push('/project')
   }

   return(
      <div className='h-[100vh] flex flex-col'>
         <Header/>
         
         <div className="flex p-10 items-center flex-col gap-8">
            <button onClick={() => NavigateProject()} 
               className={`bg-orange-500 text-white flex gap-3 px-4 py-2 rounded-full opacity-40 
               hover:opacity-100 duration-700 text-xl items-center fixed hover:right-[7%] right-[6%] bottom-14
               hover:shadow-orangeButton`}
            >Go to project <FiArrowRightCircle size={24} color={'#fff'}/> </button>

            <input className="h-20 w-[80%] text-center text-5xl outline-none rounded-lg border-2 border-gray-400" value={docTitle} onChange={(e) => setDocTitle(e.target.value)}/>
            
            <img src="" className="bg-gray-700 h-48 w-[50%]"/>

            <input type={"image"}/>

            <input value={docDescription1} onChange={(e)=>setDocDescription1(e.target.value)} className=""/>

            <text className="text-center w-[800px]"></text>

            <button onClick={() => handleGetData()} className={'bg-slate-400'}>Receber dados</button>
            <button onClick={() => handleSendData()} className={'bg-slate-400'}>Enviar dados</button>
         </div>
         
      </div>
   )
}