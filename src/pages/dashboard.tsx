import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import {useRouter} from 'next/router'
import { UserContext } from "../contexts/getUser";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc, where, query as q } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { FiArrowDown, FiArrowRightCircle } from "react-icons/fi";
import { dataType } from "./project";
import { UserProject } from "./home";

export default function Dashboard() {
   const { verifiedUser } = useContext(UserContext) 
   const { query,push } = useRouter()

   let idProject = ''
   const [data, setData] = useState<UserProject>({} as UserProject)

   const stats = { name: query.slug as string, id: query.email as string}


    useEffect( () => {
      verifiedUser()   
   }, [])

   async function handleGetData() {
      
   }

   async function handleSendData() {

      await updateDoc(doc(db, "user-data", stats.id, 'projects', idProject), {
         name: data.name,  
         title: data.title
      });
   }

   async function NavigateProject() {
      await updateDoc(doc(db, "user-data", stats.id), {
         name: data.name,  
         title: data.title
      });
      await new Promise(resolve => setTimeout(resolve, 4000));
      push('/project')
   }

   return(
      <div className='h-[100vh] flex flex-col'>
         <Header/>
         
         <div className="flex p-10 items-center flex-col gap-8">
            <button onClick={() => NavigateProject()} 
               className={`bg-orange-500 text-white flex gap-3 px-4 py-2 rounded-full opacity-40 
               hover:opacity-100 duration-700 text-xl items-center fixed hover:right-[7%] right-[6%] bottom-14
               hover:shadow-orangeButton`}
            >
               Go to project 
               <FiArrowRightCircle size={24} color={'#fff'}/>
            </button>

            <button onClick={() => handleGetData()}
               className=" px-6 absolute border-2 border-orange-400 top-6 py-2 rounded-xl text-white flex flex-col items-center
               hover:top-8 hover:text-orange-600 hover:bg-gray-600 duration-500">
               <FiArrowDown size={32}/>
               Carregar Dados
            </button>

            <input className="h-20 w-[80%] text-center text-5xl outline-none rounded-lg border-2 border-gray-400" value={data.title}
             onChange={(e) => setData({...data, title: e.target.value})}/>
            
            <input className="h-20 w-[80%] text-center text-5xl outline-none rounded-lg border-2 border-gray-400" value={data.name}
             onChange={(e) => setData({...data, name: e.target.value})}/>

            <div className="bg-gray-700 h-48 w-[50%]"/>

            <text className="text-center w-[800px]">{data.name}</text>

            <button onClick={() => handleGetData()} className={'bg-slate-400'}>Receber dados</button>
            <button onClick={() => handleSendData()} className={'bg-slate-400'}>Enviar dados</button>
         </div>
         
      </div>
   )
}