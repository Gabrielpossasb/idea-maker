
interface InputAreaTitleProps {
   project: string,
   setProject: (arg: string) => void,
   label: string,
   decoration: string
}

export function InputAreaTitle({label, project, setProject, decoration}: InputAreaTitleProps) {
   return (
      <input placeholder={label} value={project}
         onChange={(e) => setProject(e.target.value)}
         className={`block  p-2.5 w-full text-2xl text-center font-semibold bg-gray-50/5 rounded-lg
         border border-transparent focus:ring-blue-500 focus:border-blue-500 outline-none duration-500 ${decoration}`}
      />
   )
}