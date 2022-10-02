
interface InputCustomProps {
   type: string,
   name: string
}

export function InputCustom({ name, type }: InputCustomProps) {
   return(
      <div className="flex w-full gap-1 flex-col font-semibold">
         {name}
         <input type={type} className={'outline-none p-1 pl-2 font-medium rounded-md shadow-orangelg'}/>
      </div>
   )
}