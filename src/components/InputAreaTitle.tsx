
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
         className={`block  p-2.5 w-full text-2xl text-center font-semibold text-gray-900 bg-gray-50/90 rounded-lg border
         border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none ${decoration}`}
      />
   )
}