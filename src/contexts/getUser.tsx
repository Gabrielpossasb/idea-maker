import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, db } from "../services/firebase-config";
import Router, { useRouter } from 'next/router'
import { collection, getDocs, query as q, where } from "firebase/firestore";
import { UserData, UserProject } from "../pages/home";

export type User = {
   email: string;
   isVerified: boolean;
}

type UserProviderProps = {
   children: ReactNode;
}

type UserContextData = {
   data: UserData;
   user: string;
   verifiedUser: () => void;
   
}

export const UserContext = createContext<UserContextData>({} as UserContextData)

export function UserProvider({children}: UserProviderProps) {
   const { query,push } = useRouter()
   const [user, setUser] = useState('');

   const [ data, setData ] = useState<UserData>({} as UserData)
   const [ dataProject, setDataProject ] = useState<UserProject>({} as UserProject)

   const stats = { name: query.slug as string, id: query.email as string}
   

   async function getDataHome( u: string) {
      const userRef = q(collection(db, "user-data"), where("email", "==" , u));
      let usertStats: any = {}
      const querySnapshot = await getDocs(userRef);
      querySnapshot.forEach((doc) =>{
         usertStats = {id:doc.id, user:doc.data().email}
      })
      setData({...data, id:usertStats.id, user:usertStats.user as string});
      if(usertStats.id != '') {

         const qProjects = collection(db, "user-data", usertStats.id, 'projects');
         let projetctsArr: any[] = []
         const querySnapshotProjects = await getDocs(qProjects);
         querySnapshotProjects.forEach((doc) =>{
            projetctsArr = [...projetctsArr, doc.data()]
         })
         setData({...data, projects: projetctsArr as any});
      } else {
         console.log('usuario ainda nao logado')
      }
   }
   
   async function getDataHomeProject() {
      let dataProjectSave: any = {}
      const req =q(collection(db, "user-data", stats.id, 'projects'), where('name', '==', stats.name));
      const querySnapshot = await getDocs(req);
      querySnapshot.forEach((doc) =>{
         dataProjectSave = doc;
      });
      setDataProject(dataProjectSave as UserProject)
   }

   function verifiedUser() {
      onAuthStateChanged(auth, currentUser => {
         if (currentUser?.email === undefined) {
            console.log('deslogado')
            Router.push('/')
         } else {
            if (Router.asPath === '/home') {
               setUser(currentUser.email!)
               getDataHome(currentUser.email!)
                              
            } else  {
               setUser(currentUser.email!)
               getDataHomeProject()
            }
         }
      })
   }
   

   return (
      <UserContext.Provider value={{ user, verifiedUser, data  }}>
         {children}
      </UserContext.Provider>
   );
}
