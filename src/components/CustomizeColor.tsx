import { useState } from "react";
import { Projects } from "./TypesUsage";
import { IoBrush } from 'react-icons/io5'

interface CustomizeColorProps {
   project: Projects,
   setBg: (arg: string) => void,
   setText: (arg: string) => void,
}

export function CustomizeColor({project, setBg, setText}: CustomizeColorProps) {
   const [ open, setOpen ] = useState(false)

   return (
      <div className={`absolute left-10 flex flex-col gap-4 items-center`}>
         <button className={`bg-gray-50 p-2 rounded-full hover:p-3 text-orange-500 duration-500 transition-all shadow-xl ${open ? 'p-3 bg-orange-200': ''}`} onClick={() => setOpen(!open)}>
            <IoBrush size={32} className={`${open&&'rotate-[270deg]'} duration-700`}/>
         </button>
        
         <div className={`relative left-0 flex flex-col py-6 p-1 rounded-xl items-center shadow-xl bg-orange-100 transition-all duration-500 gap-4 ${open ? 'opacity-100' : 'opacity-0'}`}>
            <input type={"color"} value={project.bgColor} onChange={e => setBg( e.target.value)}
               className={`rounded-full bg-transparent h-10 w-10`}
            />
            <input type={"color"} value={project.textColor} onChange={e => setText( e.target.value)}
               className={`rounded-full bg-transparent h-10 w-10`}
            />
         </div>
         
      </div>
   )
}