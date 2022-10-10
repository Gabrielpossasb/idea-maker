import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { UserContext } from "../contexts/getUser";
import { auth } from "../services/firebase-config";


export default function Dashboard() {
   const { user, verifiedUser } = useContext(UserContext) 

    useEffect( () => {
      UserVerified();
   }, [])

   async function UserVerified() {
      await new Promise(resolve => setTimeout(resolve, 4000));
      verifiedUser()
   }

   

   return(
      <div className='h-[100vh] flex flex-col'>
         <Header/>
         <h1>
            Hello {user?.email}
         </h1>
         
      </div>
   )
}