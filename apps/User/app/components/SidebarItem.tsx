"use client"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
export const SidebarItem = ({href,title,icon}:{href:string;title:string;icon:React.ReactNode})=>{
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href

    const textColorClass = selected ? "text-[#6a51a6]" : "text-slate-500"
    const handleClick = ()=>{
        router.push(href);
    }
    return(
        <div onClick={handleClick} className={`flex items-center cursor-pointer p-4 ${textColorClass}`}>
            <div className="mr-2">{icon}</div>
            <div className="font-medium">{title}</div>
        </div>
    )
}