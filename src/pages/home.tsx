import { collection, getDocs, query, queryEqual, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";

import { Header } from "../components/Header";
import { UserContext } from "../contexts/getUser";
import { db } from "../services/firebase-config";
import Link from "next/link";

interface User {
   id:  string,
   user: {
      email:  string,
      projects: [
         {
            name: string,
            title: string,
         },
      ]
   }
      
   
}

export default function Home() {
   const { user, verifiedUser } = useContext(UserContext) 

   const [ data, setData ] = useState<User>()
   const [ open, setOpen ] = useState(false)

    useEffect( () => {
      UserVerified();

   }, [])

   async function UserVerified() {
      await new Promise(resolve => setTimeout(resolve, 2000));
      verifiedUser()   
      handleGetData();


   }


   async function handleGetData() {
   const q = query(collection(db, "user-data"), where("email", "==" , `gabrielpossas17@gmail.com`));

      console.log(data)
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>{
         setData({id:doc.id, user:doc.data() as any});
      })
      setOpen(true)
   }

   function handleProject() {
      console.log('fui')
   }


   return (
      <div className='h-[100vh] flex flex-col'>
         <Header/>
         <div className="p-10">
            <button disabled={ (data === null) ? true : false} onClick={() =>setOpen(!open)} 
               className={`flex items-center font-medium disabled:opacity-0 hover:shadow-orangeButton duration-700 gap-2 shadow-orangelg ease-in-out rounded-full px-6 text-2xl
                  ${(open )?'shadow-orangeButton bg-orange-400 text-white py-1 px-8':''}
               `}>
               PROJETOS 
               { open ? 
                  <FiChevronRight className="rotate-90 transition-transform duration-200"/>
                  : 
                  <FiChevronRight className="transition-transform duration-200"/>
               }
            </button>
            <div className={`flex flex-col p-10 text-lg gap-2 ${open?'opacity-100':'opacity-0'} delay-200 duration-1000`}>

               {  (open && data != null) ? (
                  data.user.projects.map((ass) => (
                     <div key={ass.name} onClick={() => handleProject()}
                        className="p-2 flex hover:bg-orange-200 transition-colors duration-500 ">
                           <Link href={{
                              pathname:"project",
                              query: { slug: ass.name, email: data.id},   
                           }}>
                              {ass.name}  
                           </Link>
                     </div>
                  ))) : (
                     <div></div>
                  )
               }
            </div>
            <button onClick={() => console.log(data)}>Recive</button>
         </div>
      </div>
   )
}