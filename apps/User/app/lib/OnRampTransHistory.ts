"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { prisma } from "@repo/db";

export default async function OnRampTransHistory(){
    const session = await getServerSession(authOptions);
    const res = await prisma.onRampTransactions.findMany({
        where:{
            userid:session?.user?.id
        },
        orderBy:{
            startTime:"desc"
        },
        take:5
    })
    return res.map(val=>({
        time:val.startTime,
        amount:val.amount,
        status:val.status,
        provider:val.provider
    }))
}