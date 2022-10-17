import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import {useRouter} from 'next/router'
import { UserContext } from "../contexts/getUser";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc, where, query as q } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { FiArrowRightCircle } from "react-icons/fi";
import { dataType } from "./project";
import { UserProject } from "./home";

export default function Dashboard() {
   const { user, verifiedUser } = useContext(UserContext) 
   const { query,push } = useRouter()

   const [ data, setData ] = useState<UserProject>({} as UserProject)

   const [ id , setId ] = useState('')

   const [ docTitle, setDocTitle ] = useState('')
   const [ docDescription1, setDocDescription1 ] = useState('')

   const stats = { name: query.slug as string, id: query.email as string}

    useEffect( () => {
      UserVerified();
   }, [])

   async function handleGetData() {
      const req = q(collection(db, "user-data", stats.id, 'projects'), where( "name", '==', stats.name));
      const querySnapshot = await getDocs(req);
      querySnapshot.forEach((doc) =>{
         console.log(doc.data(), 'as');
         setId(doc.id)
      })

   }

   async function UserVerified() {
      await new Promise(resolve => setTimeout(resolve, 4000));
      verifiedUser()   
   }

   async function handleSendData() {

      await updateDoc(doc(db, "user-data", stats.id, 'projects', 'xdMHEBCpqjBqP3s6j1Fz'), {
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

            <input className="h-20 w-[80%] text-center text-5xl outline-none rounded-lg border-2 border-gray-400" value={data.title}
             onChange={(e) => setData({...data, title: e.target.value})}/>
            
            <img src="" className="bg-gray-700 h-48 w-[50%]"/>

            <input type={"image"}/>


            <text className="text-center w-[800px]">{data.name}</text>

            <button onClick={() => handleGetData()} className={'bg-slate-400'}>Receber dados</button>
            <button onClick={() => handleSendData()} className={'bg-slate-400'}>Enviar dados</button>
         </div>
         
      </div>
   )
}