import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import {useRouter} from 'next/router'
import { UserContext } from "../contexts/getUser";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../services/firebase-config";
import { FiArrowRightCircle, FiEdit2 } from "react-icons/fi";
import { IoIosHome, IoIosSave, IoMdCreate } from "react-icons/io";
import Link from "next/link";
import { Projects } from "../components/TypesUsage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { InputAreaDescription } from "../components/InputAreaDescription";
import { InputAreaTitle } from "../components/InputAreaTitle";
import { CustomizeColor } from "../components/CustomizeColor";
import { InputImage } from "../components/InputImage";
import ReactTextareaAutosize from "react-textarea-autosize";

export default function Dashboard() {
   const { verifiedUser, dataProject, data } = useContext(UserContext) 
   const { query,push } = useRouter()

   const [project, setProject] = useState<Projects>({} as Projects)

   const [ editName, setEditName ] = useState(false)

   const [photo, setPhoto] = useState(null);

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

   async function handleSendData() {

      await updateDoc(doc(db, "user-data", stats.id, "projects", stats.name), {
         name: project.name,
         updatedAt: serverTimestamp(),
         title: project.title,
         description1: project.description1,
         subTitle2: project.subTitle2,
         description2: project.description2,
         bgColor: project.bgColor,
         textColor: project.textColor,
         img1: project.img1,
         img2: project.img2,
      }).then(() => alert('Salvo '+ project.name)).catch(() => {alert('Erro ao salvar:' + project.name )});
   }

   function handleChange(e: any) {
      if (e.target.files[0]) {
         setPhoto(e.target.files[0])
      }
   }

   async function Upload(file: any, img: number) {
      const fileRef = ref(storage, data.userID + '/' + stats.name + '/' + file.name);
    
      
      const snapshot = await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);

      if(img === 1) {
         setProject({...project, img1:photoURL})
      } else if (img === 2) {
         setProject({...project, img2:photoURL})
      }

      
      alert("Uploaded file!");
    }

   return(
      <div className='h-[100vh] flex flex-1 flex-col'>
         <Header/>         

         <div className="fixed w-[100%] bg-gradient-to-br bg-orange-100 justify-around p-2 px-2 lg:bg-transparent bottom-0 flex 
            shadow-insetBottom lg:px-16 lg:shadow-none
         ">

            <button onClick={() => handleSendData()} 
               className={`bg-[#ee7028cb] text-orange-200 p-2 px-4 shadow-insetBottom rounded-full
                duration-500 text-xl items-center hover:text-white hover:px-6`
            }>
               <IoIosSave size={32} />
            </button>

            <button onClick={() => push('/home')} 
               className={`bg-[#ee7028cb] text-orange-200 p-2 px-10 rounded-xl shadow-insetBottom top-1 hover:top-3
                duration-500 text-xl items-center hover:text-white hover:px-14 hover:rounded-3xl`
            }>
               <IoIosHome size={32} />
            </button>

            <Link href={{
               pathname:"project",
               query: { slug: stats.name, email: stats.id},   
            }}>
               <button onClick={() => handleSendData()} 
                  className={`bg-[#ee7028cb] text-orange-200 flex gap-3 px-4 p-2 shadow-insetBottom py-2 rounded-full 
                  opacity-100 duration-500 text-xl items-center hover:text-white hover:px-6`}
               >
                  <FiArrowRightCircle size={32}/>  
               </button>
            </Link>
         </div>

         <div className={`flex px-4 items-center flex-col justify-center`}
            style={{backgroundColor: project.bgColor, color: project.textColor}}
         >
            
            <div className="flex py-8 items-center mb-12 flex-col w-full max-w-5xl gap-10">

               <CustomizeColor project={project} 
                  setBg={(e: string) => setProject({...project, bgColor:e})}
                  setText={(e: string) => setProject({...project, textColor:e})}
               />

               <div className="flex flex-col gap-2 -mt-28 z-30 rounded-md items-center font-medium p-2 text-white ">
                  <IoMdCreate size={20} className={'text-green-400'}/>
 
                  <input value={project.name} onChange={(e) => setProject({...project, name:e.target.value})} 
                     className="text-3xl bg-orange-300 text-center rounded-md px-3 outline-none"
                  />
               </div>

               <input className="block p-2.5 w-full text-4xl text-center font-semibold bg-gray-50/5 rounded-lg
                  border border-transparent focus:ring-blue-500 focus:border-blue-500 outline-none" 
                  value={project?.title}
                  onChange={(e) => setProject({...project, title: e.target.value})}
               />

               <InputImage alt="Primeira Imagem" src={project.img1} Upload={() => Upload(photo, 1)} handleChange={(e) => handleChange(e)} />

               <InputAreaDescription label="Descrição 1 ..."  project={project.description1} 
                  setProject={(e: string) => setProject({...project, description1:e})}
                  decoration={''}
                  
               />

               <InputAreaTitle label="Sub-Title 1" project={project.subTitle2} 
                  setProject={(e: string) => setProject({...project, subTitle2:e})}
                  decoration={''}
               />

               <InputImage alt="Segunda Imagem" src={project.img2} Upload={() => Upload(photo, 2)} handleChange={(e) => handleChange(e)} />

               <InputAreaDescription label="Descrição 2 ..."  project={project.description2} 
                  setProject={(e: string) => setProject({...project, description2:e})}
                  decoration={''}
               />

            </div>
         </div>

      </div>
   )
}