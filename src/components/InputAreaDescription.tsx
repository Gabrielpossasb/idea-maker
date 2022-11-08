import ReactTextareaAutosize from "react-textarea-autosize"

interface InputAreaDescriptionProps {
   project: string,
   setProject: (arg: string) => void,
   label: string,
   decoration: string
}

export function InputAreaDescription({label, project, setProject, decoration}: InputAreaDescriptionProps) {
   return (
      <ReactTextareaAutosize placeholder={label} value={project}
         onChange={(e) => setProject(e.target.value)}
         className={`block p-2.5 w-full h-full text-md text-center max-w-2xl font-medium bg-gray-50/5 rounded-lg 
         border border-transparent focus:ring-blue-500 focus:border-blue-500 outline-none ${decoration}`} 
      />
   )
}