import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase-config";
import Router from 'next/router'

export type User = {
   email: string;
   isVerified: boolean;
}

type UserProviderProps = {
   children: ReactNode;
}

type UserContextData = {
   getUser: ({}: User) => void;
   user: User | null;
   verifiedUser: () => void;
   setProject: (id: number) => void;
   projectID: number
}

export const UserContext = createContext<UserContextData>({} as UserContextData)

export function UserProvider({children}: UserProviderProps) {
   const [user, setUser] = useState({} as User | null);
   const [userData, setUserData] = useState([])
   const [ projectID, setProjectID ] = useState(0)

   useEffect(() => {
      onAuthStateChanged(auth, currentUser => {
         const loginUser = {email:currentUser?.email, isVerified:currentUser?.emailVerified} as User
        setUser(!!currentUser ? loginUser : null)
         console.log(loginUser)
      })
      
    }, [])

   function getUser({email, isVerified}: User) {
      setUser({email, isVerified})
   }

   async function verifiedUser() {
      onAuthStateChanged(auth, currentUser => {
         if (currentUser?.email === undefined) {
            console.log('deslogado')
            Router.push('/')

         } else {
            
         }
      })
   }

   function setProject(number: number) {
      setProjectID(number)
   }

   return (
      <UserContext.Provider value={{ user, getUser, verifiedUser, setProject, projectID }}>
         {children}
      </UserContext.Provider>
   );
}
