import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import {useRouter} from 'next/router'
import { UserContext } from "../contexts/getUser";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { FiArrowRightCircle, FiHome } from "react-icons/fi";
import { IoIosHome, IoIosSave, IoMdHome } from "react-icons/io";
import Link from "next/link";
import { Projects } from "../components/TypesUsage";

export default function Dashboard() {
   const { verifiedUser, dataProject } = useContext(UserContext) 
   const { query,push } = useRouter()

   const [project, setProject] = useState<Projects>({} as Projects)
   const [IDproject, setIDroject] = useState('')

   const stats = { name: query.slug! as string, id: query.email! as string}

    useEffect( () => {
      if (query.slug != undefined) {
         verifiedUser()
      } else {
         console.log('gmap')
      }
      
   }, [query.slug])

   useEffect(() => {
      setProject(dataProject)
   }, [dataProject])

   async function handleGetData() {
      console.log(stats)
      
   }

   async function handleSendData() {
      console.log(IDproject)

      await updateDoc(doc(db, "user-data", stats.id, "projects", stats.name), {
         title: project.title,
         description1: project.description1,
         subTitle2: project.subTitle2,
         description2: project.description2,

      }).then(() => alert('Salvo '+ project.name));
   }

   async function NavigateProject() {
      handleSendData()
   }

   return(
      <div className='h-[100vh] flex flex-col'>
         <Header/>

         <button onClick={() => NavigateProject()} 
            className={`bg-orange-500 text-white flex gap-3 px-4 py-2 rounded-full opacity-50 
            hover:opacity-100 duration-700 text-xl items-center fixed hover:right-[7%] right-[6%] bottom-10
            hover:shadow-orangeButton`}
         >
            <Link href={{
               pathname:"project",
               query: { slug: stats.name, email: stats.id},   
            }}>
               Go to project 
            </Link>
            <FiArrowRightCircle size={24} color={'#fff'}/>  
         </button>

         <button onClick={() => handleSendData()} 
            className={`bg-orange-500 text-white p-3 rounded-full opacity-50 
            hover:opacity-100 duration-700 text-xl items-center fixed hover:left-[4.7%] left-[4%] bottom-10 
            hover:shadow-orangeButton `
         }>
            <IoIosSave size={32} />
         </button>
         
         <div className="flex px-4 items-center flex-col justify-center">
            <button onClick={() => push('/home')} 
               className={`bg-[#ee7028cb] text-orange-200 p-2 px-10 rounded-xl shadow-insetBottom top-1 hover:top-3
               hover:opacity-100 duration-700 text-xl items-center relative hover:text-white hover:px-14 hover:rounded-3xl`
            }>
               <IoIosHome size={32} />
            </button>
            <div className="flex py-8 items-center flex-col w-full max-w-5xl gap-8">
               
               <input className="w-full text-center text-5xl outline-none rounded-lg border-2 border-gray-400" 
                  value={project?.title}
                  onChange={(e) => setProject({...project, title: e.target.value})}/>

               <div className="bg-gray-700 h-48 w-[50%]"/>

               <input className="w-full text-center text-xl outline-none rounded-lg border-2 border-gray-400" 
                  value={project?.description1}
                  onChange={(e) => setProject({...project, description1: e.target.value})}/>

               <input className="w-full text-center text-xl outline-none rounded-lg border-2 border-gray-400" 
                  value={project?.subTitle2}
                  onChange={(e) => setProject({...project, subTitle2: e.target.value})}/>

               <input className="w-full text-center text-xl outline-none rounded-lg border-2 border-gray-400" 
                  value={project?.description2}
                  onChange={(e) => setProject({...project, description2: e.target.value})}/>



               <button onClick={() => handleGetData()} className={'bg-slate-400'}>Receber dados</button>
            </div>
         </div>
         
      </div>
   )
}