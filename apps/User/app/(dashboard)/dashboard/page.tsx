"use client"
import { useSession } from "next-auth/react";
import HomePageCard from "../../components/HomePageCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Addmoney(){
    const router = useRouter();
    const {data:session,status} = useSession();
    const[username,setUsername] = useState<string|null>(null);

    useEffect(()=>{
        if(status === "loading") return;

        const name = session?.user?.name;
        if(!name){
            router.push("/api/auth/signin");
        }
        else{
            const formattedname = name.charAt(0).toUpperCase()+name.slice(1);
            setUsername(formattedname);
        }
    })
    if(!username) return null;
    return <div>
        <HomePageCard username={username}></HomePageCard>
    </div>
}