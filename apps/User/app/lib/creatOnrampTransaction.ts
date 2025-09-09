"use server";

import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "./auth";
import axios from "axios";
import { prisma } from "@repo/db";

export async function CreateOnrampTransaction(provider:string,amount:number,userid:string){
    

    try{
        const token  = await axios.post("http://localhost:4000/api/bank/getToken",{
            userid,
            amount
        });
        amount = amount*100;
        const res =  await prisma.onRampTransactions.create({
            data:{
                provider,
                token:token.data.token,
                status:"Processing",
                startTime:new Date(),
                userid:userid,
                amount
            }
        })
        console.log(token.data.token);
        return{
            token: token.data.token
        }
    }
    catch(err){
        console.log(err);
        return{
            msg:"Cannot reach the server"
        }
    }
}