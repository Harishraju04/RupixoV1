"use client"

export default function TextInput({placeholder,onChange,label}:{placeholder:string,onChange:(value:string)=>void,label:string}){

    return(
        <div className="pt-2">
            <label className="block mb-2 text-md font-medium text-zinc-200">{label}</label>
            <input className="bg-zinc-800 text-slate-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} onChange={(e)=>{
                onChange(e.target.value)
            }}></input>
        </div>
    )
}