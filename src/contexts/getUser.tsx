import { onAuthStateChanged } from "firebase/auth";
import { createContext, ReactNode, useState } from "react";
import { auth, db } from "../services/firebase-config";
import Router, { useRouter } from 'next/router'
import { collection, doc, getDoc, getDocs, query as q, where } from "firebase/firestore";
import { Projects, UserData } from "../components/TypesUsage";

type UserProviderProps = {
   children: ReactNode;
}

type UserContextData = {
   data: UserData;
   user: string;
   verifiedUser: () => void;
   dataProject: Projects;
   getProject: () => void;
}

export const UserContext = createContext<UserContextData>({} as UserContextData)

export function UserProvider({children}: UserProviderProps) {
   const { query } = useRouter()
   const [user, setUser] = useState('');

   const [ data, setData ] = useState<UserData>({} as UserData)
   const [ dataProject, setDataProject ] = useState<Projects>({} as Projects)
   
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
         let projetctsArr: Projects[] = []
         let projectSave: Projects = {} as Projects
         const querySnapshotProjects = await getDocs(qProjects);
         querySnapshotProjects.forEach((doc) =>{
            projectSave = doc.data() as any
            projectSave = {...projectSave, id: doc.id as string}
            projetctsArr = [...projetctsArr, projectSave as Projects]
         })
         console.log(projectSave + '1')
         console.log(projetctsArr + '3')
         setData({...data, id:usertStats.id, user:usertStats.user, projects:projetctsArr as any});
      } else {
         console.log('usuario ainda nao logado')
      }
   }
   
   async function getDataProject() {
      const req = doc(db, "user-data", stats.id, 'projects', stats.name);
      const querySnapshot = await getDoc(req);
      setDataProject(querySnapshot.data() as Projects)
   }

   function verifiedUser() {
      onAuthStateChanged(auth, currentUser => {
         if (currentUser?.email === undefined) {
            console.log('deslogado')
            Router.push('/')
         } else {
            setData({...data, userID: currentUser.uid})
            if (Router.asPath === '/home') {
               setUser(currentUser.email!)
               getDataHome(currentUser.email!)
                              
            } else  {
               setUser(currentUser.email!)
               getDataProject()
            }
         }
      })
   }

   async function getProject() {
      getDataProject()
   }
   

   return (
      <UserContext.Provider value={{ user, verifiedUser, data, dataProject, getProject }}>
         {children}
      </UserContext.Provider>
   );
}
