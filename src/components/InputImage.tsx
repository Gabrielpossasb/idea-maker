
interface InputImage {
   handleChange: (arg: any) => void;
   Upload: () => void;
   src: string;
   alt: string; 
}

export function InputImage( {Upload, handleChange, alt, src}: InputImage ) {
   return (
      <div className="flex flex-col gap-8 items-center">
         <img src={src} alt={alt} className="bg-gray-700 max-w-full sm:max-w-3xl rounded-md"/>
         <div className="flex gap-8 items-center">
            <input className="block file:bg-pink-400 file:text-white file:border-0 file:p-2 file:mr-2 file:hover:brightness-75 file:duration-500 w-full text-white bg-slate-700 text-sm rounded-md border-gray-400 cursor-pointer focus:outline-none" 
            id="file_input" type="file" onChange={(e) => handleChange(e)}/>
            <button className="bg-pink-400 text-white px-4 p-1 hover:brightness-75 duration-500 rounded-lg" 
            onClick={() => Upload()}>Upload</button>
         </div>
      </div>
   )
}