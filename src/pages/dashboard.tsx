import { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";

export default function Dashboard() {
   const { user } = useContext(AuthContext)

   useEffect(() => {
      api.get('/me')
         .then(response => console.log(response))
         .catch(err => console.log(err))
   }, [])

   return(
      <div className='h-[100vh] flex flex-col'>
         <Header/>
         <h1>
            Hello {user?.email}
         </h1>
      </div>
   )
}