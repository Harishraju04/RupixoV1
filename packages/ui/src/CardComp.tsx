import React, { JSX } from "react";
export default function Card({title,children}:{title:string,children:React.ReactNode}):JSX.Element{
    return <div className="p-4 rounded-3xl bg-zinc-900">
        <h1 className="text-xl font-semibold text-zinc-100  border-b border-zinc-700 pb-2">{title}</h1>
        {children}
    </div>
}