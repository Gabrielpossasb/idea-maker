import { collection, getDocs, query, queryEqual, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";

import { Header } from "../components/Header";
import { UserContext } from "../contexts/getUser";
import { db } from "../services/firebase-config";
import Link from "next/link";

interface User {
   id:  string,
   user:  string,
   
   projects :[
         {
            name: string,
            title: string,
         },
   ]
      
   
}
export interface UserProject {
   name: string,
   title:  string,
}

export default function Home() {
   const { user, verifiedUser } = useContext(UserContext) 

   const [ data, setData ] = useState<User>({} as User)
   const [ open, setOpen ] = useState(false)

    useEffect( () => {
      UserVerified();
      console.log(user)
   }, [])

   async function UserVerified() {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('foi1')
      verifiedUser()  
      console.log(user)
   }


   async function handleGetData() {
      if (user != '') {
      const q = query(collection(db, "user-data"), where("email", "==" , user));

      console.log(user)
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>{
         setData({...data, id:doc.id, user:doc.data().email as string});
      })

      const qProjects = query(collection(db, "user-data", data.id, 'projects'));

      console.log(data)
      const querySnapshotProjects = await getDocs(qProjects);
      querySnapshotProjects.forEach((doc) =>{
         setData({...data, projects:[doc.data() as UserProject]});
      })
    } else {

    }
   }

   function handleProject() {
      handleGetData()
      setOpen(!open)
   }


   return (
      <div className='h-[100vh] flex flex-col'>
         <Header/>
         <div className="p-10">
            <div className="flex gap-4">
              
               <div className={`w-2 rounded-lg shadow-orangeButton duration-500
                  ${open?' w-3 bg-orange-400 ':''}
               `}/>
               
               <button disabled={ (data === null) ? true : false} onClick={() => handleProject()} 
                  className={`flex items-center font-medium disabled:opacity-0 hover:shadow-orangeButton duration-700 gap-2 shadow-orangelg ease-in-out rounded-lg px-6 text-2xl
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
            <div className={`flex flex-col p-10 text-lg gap-2 ${open?'opacity-100':'opacity-0'} delay-200 duration-1000`}>

               {  (open && data != null) && (
                  data.projects.map((ass) => (
                     <div key={ass.name}
                        className="p-2 flex hover:bg-orange-200 transition-colors duration-500 ">
                           <Link href={{
                              pathname:"dashboard",
                              query: { slug: ass.name, email: data.id},   
                           }}>
                              {ass.name}  
                           </Link>
                     </div>
                  )))
               }
            </div>
            <button onClick={() => console.log(data)}>Recive</button>
         </div>
      </div>
   )
}