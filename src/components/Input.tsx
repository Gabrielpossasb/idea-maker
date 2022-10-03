import { useForm } from "react-hook-form"

interface InputCustomProps {
   type: string,
   name: string
}

export function InputCustom({ name, type }: InputCustomProps) {
   const { formState:{isSubmitting}, handleSubmit, register } = useForm()

   return(
      <div className="flex w-full gap-1 flex-col font-semibold">
         {name}
         <input type={type} className={'outline-none p-1 pl-2 font-normal rounded-md shadow-orangelg'}/>
      </div>
   )
}