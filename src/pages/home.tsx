import { useContext, useEffect, useState } from "react";
import { FiCheck, FiChevronRight, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { Header } from "../components/Header";
import { UserContext } from "../contexts/getUser";
import Link from "next/link";
import { addDoc as aDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
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
         title: 'a',
         description1: 'a',
         subTitle2: 'a',
         description2: 'a',
         bgColor: '#252525',
         textColor: '#2177f8',
         img1: 'https://firebasestorage.googleapis.com/v0/b/test-login-f2dc2.appspot.com/o/XAc8pvMFuuOWI4ivZgyff98cQIr1%2Fgb3EumDsMVLH2XRVDfWH%2Fe021cccd68247bc9a6b64ac53c07d7a4.jpg?alt=media&token=9b48878c-62dd-45a4-b459-0b98ee6896ee',
         img2: 'https://firebasestorage.googleapis.com/v0/b/test-login-f2dc2.appspot.com/o/XAc8pvMFuuOWI4ivZgyff98cQIr1%2Fgb3EumDsMVLH2XRVDfWH%2Fe021cccd68247bc9a6b64ac53c07d7a4.jpg?alt=media&token=9b48878c-62dd-45a4-b459-0b98ee6896ee',
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
         <div className="p-10 py-16 flex-1 flex z-20 flex-col">
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

            <div className={`flex flex-col pt-16 items-center pl-4 text-lg gap-4 ${open?'opacity-100':'opacity-0'} delay-200 duration-1000`
            }>

               <div className="absolute w-[90%] h-[45%] sm:h-[60%] sm:w-[60%] sm:top-[35%] z-10 blur bg-orange-500/30" 
                  style={{borderRadius:'30% 70% 42% 58% / 67% 28% 72% 33%' }}
               ></div>

            {  (open) && (
                (data.projects != null) ? (
                  data.projects.map((ass) => (
                     <div key={ass.name} onClick={() => console.log(ass)}
                        className="p-1 px-6 text-gray-600 w-full flex justify-between items-center max-w-4xl shadow-orangelg ml-0 z-20 bg-gray-50 border-x-4 
                        hover:border-orange-400 font-medium rounded-lg transition-all duration-500 hover:ml-1"
                     >
                        
                        <Link  href={{
                           pathname:"dashboard",
                           query: { slug: ass.id, email: data.id},   
                        }}>
                           <button className="hover:text-orange-400 duration-500">
                              {ass.name}  
                           </button>
                        </Link>
                        
                        <div className="flex items-center gap-8 "> 
                           <text className="font-semibold text-orange-600 text-base"> {ass.createdAt?.toDate().toLocaleDateString()} </text>

                           <button  onClick={() => deleteProject(ass.id)}
                              className="hover:text-orange-400 hover:animate-pulse duration-500 rounded-full hover:bg-orange-100 p-2"
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