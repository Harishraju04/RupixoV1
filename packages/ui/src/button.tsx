"use client"

import { ReactNode } from "react"

interface ButtonProps{
    children: ReactNode,
    onClick:()=>void
}

export const Button = ({children,onClick}:ButtonProps)=>{
    return(
        <button className="bg-zinc-800 p-2 text-zinc-200 rounded-2xl w-30 cursor-pointer hover:bg-slate-500" onClick={onClick} type="button">
            {children}
        </button>
    )
}