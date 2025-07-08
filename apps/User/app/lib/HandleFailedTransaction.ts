"use server"
import { prisma } from "@repo/db";

export async function HandleFailedTransaction(token:string){
    await prisma.onRampTransactions.update({
        where:{
            token
        },
        data:{
            status:"Failed"
        }
    })
}