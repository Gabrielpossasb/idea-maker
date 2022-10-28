import { useContext, useEffect, useState } from "react";
import { FiCheck, FiChevronRight, FiPlus, FiTrash2 } from "react-icons/fi";
import { Header } from "../components/Header";
import { UserContext } from "../contexts/getUser";
import Link from "next/link";
import { addDoc as aDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase-config";

export default function Home() {
   const { user, data, verifiedUser } = useContext(UserContext) 
   
   const [ open, setOpen ] = useState(true)
   const [ addDoc, setaddDoc ] = useState(false)

   const [ newProject, setNewProject ] = useState('')
   

    useEffect( () => {
      verifiedUser()  
   }, [])

   function handleProject() {
      setOpen(!open) 
   }

   async function addProject() {
      await aDoc(collection(db, "user-data", data.id, 'projects'), {
         name: newProject,
      })

      setaddDoc(!addDoc)
      verifiedUser()
   }

   async function deleteProject(id: string) {
      await deleteDoc(doc(db, "user-data", data.id, 'projects', id))
      verifiedUser()
   }

   return (
      <div className='h-[100vh] flex flex-col'>
         <Header/>
         <div className="p-10 py-16 flex-1 flex flex-col">
            <div className="flex gap-10 items-center flex-wrap">
               <div className="flex gap-4 items-center">
                  <div className={`w-2 h-2 bg-orange-400 rounded-sm  duration-500
                     ${open?' w-3 shadow-orangeButton h-6':''}
                  `}/>
                  
                  <button disabled={ (data === null) ? true : false} onClick={() => handleProject()} 
                     className={`flex items-center font-medium disabled:opacity-0 hover:shadow-orangeButton duration-500 gap-2 shadow-orangelg ease-in-out rounded-lg px-6 text-2xl
                        ${(open )?'shadow-orangeButton bg-orange-400 text-white py-1 px-8':''}
                     `}>
                     PROJETOS 
                     { open ? 
                        <FiChevronRight className="rotate-90 transition-transform duration-200"/>
                        : 
                        <FiChevronRight className="transition-transform duration-200"/>
                     }
                  </button>
               </div>

               <button onClick={() => !!newProject ? addProject() : setaddDoc(!addDoc)}
                  className="bg-gray-100 p-1 rounded-full relative top-0 hover:-top-1 
                  left-0 hover:left-1 duration-500  text-gray-500 hover:text-orange-700 shadow-orangelg hover:shadow-orangeButton"
               >  
                  { addDoc ? (
                     <FiCheck size={30} className={` ${newProject != '' ? 'text-green-600' : 'text-red-600'}`}/>
                     ) : (
                     <FiPlus size={30} className={``}/>
                  )}
               </button>
               
               { addDoc && (
                  <input className={`p-1 px-3 w-max max-w-[400px] outline-none bg-gray-50 rounded-lg border-2 border-red-600 border-opacity-60 ${newProject != '' ? 'border-green-700' : ''}`} value={newProject} onChange={(e) => setNewProject(e.target.value)}/>
               )}
            </div>

            <div className={`flex flex-col pt-16 pl-4 text-lg gap-4 ${open?'opacity-100':'opacity-0'} delay-200 duration-1000`
            }>

            {  (open) && (
                (data.projects != null) ? (
                  data.projects.map((ass) => (
                     <div key={ass.name}
                        className="p-1 px-6 text-gray-600 flex justify-between max-w-4xl shadow-orangelg ml-0 bg-gray-50 border-x-4 
                        hover:border-orange-400 font-medium rounded-lg transition-all duration-500 hover:ml-1"
                     >
                        
                        <button className="hover:text-orange-400 duration-500">
                           <Link  href={{
                              pathname:"dashboard",
                              query: { slug: ass.id, email: data.id},   
                           }}>
                              {ass.name}  
                           </Link>
                        </button>

                        <button  onClick={() => deleteProject(ass.id)}
                           className="hover:text-orange-400 duration-500 rounded-full hover:bg-orange-100 p-2"
                        >
                           <FiTrash2 size={26}/>
                        </button>
                     </div>
                  ))
                  ) : (
                     <div className={`text-gray-800 p-10 text-2xl font-medium`}>... Loading</div>
                  )
            )}
            </div>
         </div>
      </div>
   )
}