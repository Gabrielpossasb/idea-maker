import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase-config";
import Router from 'next/router'

export type User = {
   email: string | null | undefined;
    isVerified: boolean | undefined;
}

type UserProviderProps = {
   children: ReactNode;
}

type UserContextData = {
   getUser: ({}: User) => void;
   user: User | null;
   verifiedUser: () => void;
}

export const UserContext = createContext<UserContextData>({} as UserContextData)

export function UserProvider({children}: UserProviderProps) {
   const [user, setUser] = useState({} as User | null);

   useEffect(() => {
      onAuthStateChanged(auth, currentUser => {
         const loginUser = {email:currentUser?.email, isVerified:currentUser?.emailVerified}
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
            console.log('logado')
         }
      })
   }

   return (
      <UserContext.Provider value={{ user, getUser, verifiedUser }}>
         {children}
      </UserContext.Provider>
   );
}
