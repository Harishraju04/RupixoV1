'use server';

import { PrismaClient } from "@repo/db";
import bcrypt from "bcrypt";
const prisma  = new PrismaClient();
export async function SignUp(email:string,username:string,phonenumber:string,password:string){
    try{
       const result = await prisma.$transaction(async(tx)=>{
            const hashedpassword = await bcrypt.hash(password,10);
            try{
                const res = await tx.user.create({
                data:{
                    email,
                    username,
                    phone:phonenumber,
                    password:hashedpassword
                }
            })
            await tx.balance.create({
                data: {
                    userid:res.userid,
                    amount:0,
                    locked:0
                }
            })
            return{
                msg:"SignUp successfull"
            }
            }
            catch(err){
                console.log("error Occured");
                console.log(err);
                return{
                    msg:"SignUp failed"
                }
            }
        })
        return result;
    }
    catch(err){
        console.log(err);
        return{
            msg:"SignUp failed"
        }
    }
}