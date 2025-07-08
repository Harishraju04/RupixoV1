"use server"

import { prisma } from "@repo/db"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"

export default async function GetBalanceInfo(){
    const session = await getServerSession(authOptions);
    const res = await prisma.balance.findFirst({
        where:{
            userid:session?.user?.id
        }
    });
    console.log(res?.amount);
    return{
        amount:res?.amount||0,
        locked:res?.locked||0
    }
    
}