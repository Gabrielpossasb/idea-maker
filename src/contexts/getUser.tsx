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

export interface UserProjectData extends UserProject {
   id:  string
}

type UserContextData = {
   data: UserData;
   user: string;
   verifiedUser: () => void;
   dataProject: UserProjectData;
   
}

export const UserContext = createContext<UserContextData>({} as UserContextData)

export function UserProvider({children}: UserProviderProps) {
   const { query } = useRouter()
   const [user, setUser] = useState('');

   const [ data, setData ] = useState<UserData>({} as UserData)
   const [ dataProject, setDataProject ] = useState<UserProjectData>({} as UserProjectData)
   
   let stats = {name: query.slug as string, id: query.email as string}

   async function getDataHome( u: string) {
      const userRef = q(collection(db, "user-data"), where("email", "==" , u));
      let usertStats: any = {}
      const querySnapshot = await getDocs(userRef);
      querySnapshot.forEach((doc) =>{
         usertStats = {id:doc.id, user:doc.data().email as string}
      })
      
      if(usertStats.id != '') {
         
         const qProjects = collection(db, "user-data", usertStats.id, 'projects');
         let projetctsArr: UserProject[] = []
         const querySnapshotProjects = await getDocs(qProjects);
         querySnapshotProjects.forEach((doc) =>{
            projetctsArr = [...projetctsArr, doc.data() as UserProject]
         })
         setData({id:usertStats.id, user:usertStats.user, projects:projetctsArr as [{ name: string; title: string; }]});
      } else {
         console.log('usuario ainda nao logado')
      }
   }
   
   async function getDataHomeProject() {
      console.log(stats)
      let dataProjectSave = {} as UserProjectData

      const req =q(collection(db, "user-data", stats.id, 'projects'), where('name', '==', stats.name));
      const querySnapshot = await getDocs(req);

      querySnapshot.forEach((doc) =>{
         dataProjectSave = {id:doc.id, name: doc.data().name, title: doc.data().title};
      
      });
      
      setDataProject(dataProjectSave)
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
      <UserContext.Provider value={{ user, verifiedUser, data, dataProject }}>
         {children}
      </UserContext.Provider>
   );
}
