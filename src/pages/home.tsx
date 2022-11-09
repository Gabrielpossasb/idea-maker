import { useContext, useEffect, useState } from "react";
import { FiCheck, FiChevronRight, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { Header } from "../components/Header";
import { UserContext } from "../contexts/getUser";
import Link from "next/link";
import { addDoc as aDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase-config";

export default function Home() {
   const { user, data, verifiedUser } = useContext(UserContext) 
   
   const [ hover, setHover ] = useState(false)
   const [ open, setOpen ] = useState(true)
   const [ addDoc, setaddDoc ] = useState(false)

   const [ newProject, setNewProject ] = useState('')
   
   let defaultImage = 'https://firebasestorage.googleapis.com/v0/b/test-login-f2dc2.appspot.com/o/Vector-Image-Default.svg?alt=media&token=0629c071-c1aa-4811-83c5-c5c82906111b'

   useEffect( () => {
      verifiedUser()  
   }, [])

   function handleProject() {
      setOpen(!open) 
   }

   async function addProject() {
      let verifiedName = data.projects.filter((doc) => {
         return doc.name === newProject
      })

      if (verifiedName != null) {
         console.log('ja existe')
         console.log(verifiedName)
      } else {
         console.log('criado')
         console.log(verifiedName)
      }

      await aDoc(collection(db, "user-data", data.id, 'projects'), {
         name: newProject,
         createdAt: serverTimestamp(),
         updatedAt: serverTimestamp(),
         title: 'Text Example',
         description1: 'Text Example',
         subTitle2: 'Text Example',
         description2: 'Text Example',
         bgColor: '#252525',
         textColor: '#2177f8',
         img1: defaultImage,
         img2: defaultImage,
      })

      setaddDoc(!addDoc)
      verifiedUser()
      setNewProject('')
   }

   async function deleteProject(id: string) {
      await deleteDoc(doc(db, "user-data", data.id, 'projects', id))
      verifiedUser()
   }

   return (
      <div className='h-[100vh] flex flex-col '>
         
         <Header/>
         <div className="p-4 sm:p-10 py-16 flex-1 flex z-20 flex-col">
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

               <button disabled={(!newProject && addDoc) && true} onClick={() => addDoc ? addProject() : setaddDoc(!addDoc)}
                  className="bg-gray-100 p-1 rounded-full relative top-0 hover:-top-1 disabled:shadow-gray disabled:cursor-not-allowed disabled:hover:text-gray-500
                  left-0 hover:left-1 duration-500 text-gray-500 hover:text-orange-700 shadow-orangelg hover:shadow-orangeButton"
               >  
                  { addDoc ? (
                        <FiCheck size={30} className={`${newProject&&'text-green-600'}`}/>
                     ) : (
                        <FiPlus size={30} className={``}/>
                  )}
               </button>
               
               { addDoc && (
                  <div className={`flex items-center gap-4 duration-500 transition-all delay-200 w-2 ${addDoc ? 'opacity-100 w-full' : 'opacity-0'}`}>
                     <input autoFocus className={`p-1 px-3 w-max ml-8 sm:ml-2 max-w-[400px] outline-none bg-gray-50 rounded-lg border-2 border-red-600 border-opacity-60 ${newProject != '' ? 'border-green-700' : ''}`} value={newProject} onChange={(e) => setNewProject(e.target.value)}/>
                     <button className="p-1 rounded-full shadow-orangelg hover:shadow-orangeButton text-gray-500 top-0 hover:-top-1
                     left-0 hover:left-1 duration-500 relative" onClick={() => {setaddDoc(false), setNewProject('')}}> <FiX size={26}/></button>
                  </div>
               )}
            </div>

            <div className={`flex flex-col pt-16 items-center text-lg gap-4 ${open?'opacity-100':'opacity-0'} 
               delay-200 duration-1000`
            }>

               <div className="absolute w-[90%] h-[45%] sm:h-[60%] sm:w-[60%] sm:top-[35%] z-10 blur bg-orange-500/30" 
                  style={{borderRadius:'30% 70% 42% 58% / 67% 28% 72% 33%' }}
               ></div>

               {  (open) && (
                  (data.projects != null) ? (
                     data.projects.map((ass) => (
                        <div key={ass.id} onClick={() => console.log(hover)}
                           className={`p-2 px-6 w-full sm:flex group flex-wrap justify-between items-center max-w-4xl shadow-orangelg ml-0 z-20 bg-gray-50 border-x-4 
                           hover:border-orange-400 font-medium rounded-lg transition-all duration-500 hover:ml-1`}
                           style={{}}
                        >
                           
                           <Link  href={{
                              pathname:"dashboard",
                              query: { slug: ass.id, email: data.id },   
                           }}>
                              <button className={`group-hover:text-orange-600 font-semibold group-hover:animate-pulse duration-300`}>
                                 {ass.name}  
                              </button>
                           </Link>

                           
                           <div className="flex items-center gap-4 justify-between sm:gap-10 "> 
                              <text className="text-xl"> 
                                 <span className="mr-1 text-sm font-medium text-orange-300/80"> atualizado: </span>
                                 { ass.updatedAt?.toDate().toLocaleTimeString('pt-Br', { timeZone: 'America/Campo_Grande', timeStyle: 'short' }) }
                                 <span className="font-medium text-sm"> - { ass.updatedAt?.toDate().toLocaleDateString('pt-Br') } </span>
                              </text>


                              <button  onClick={() => deleteProject(ass.id)}
                                 className="hover:text-orange-400 hover:animate-spin duration-500 rounded-full hover:bg-orange-100 p-2"
                              >
                                 <FiTrash2 size={26}/>
                              </button>
                           </div>
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