"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { prisma } from "@repo/db";

export default async function P2PhistoryHandler(){
    const session = await getServerSession(authOptions);
    if(!session?.user){
        return [];
    }
    const userid = session.user.id;
    const transactionHistory = await prisma.p2pTransfer.findMany({
        where:{
            OR:[
                {fromUserid:userid},
                {toUserid:userid}
            ]
            
        },
        orderBy:{
                timestamp:"desc"
        },
        take:5
    })
    return transactionHistory.map(val=>({
        time:val.timestamp,
        amount:val.amount,
        from:val.fromUserid,
        to:val.toUserid
    }))
}