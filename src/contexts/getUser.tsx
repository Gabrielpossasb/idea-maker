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
   
   user: string;
   verifiedUser: () => void;
   
}

export const UserContext = createContext<UserContextData>({} as UserContextData)

export function UserProvider({children}: UserProviderProps) {
   const [user, setUser] = useState('');
   
   const [ projectID, setProjectID ] = useState(0)

   async function verifiedUser() {
      onAuthStateChanged(auth, currentUser => {
         if (currentUser?.email === undefined) {
            console.log('deslogado')
            Router.push('/')
         } else {
            console.log(currentUser.email!)
            setUser(currentUser.email!)
         }
      })
   }

   

   return (
      <UserContext.Provider value={{ user, verifiedUser  }}>
         {children}
      </UserContext.Provider>
   );
}
