import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@repo/db";
import { type NextAuthOptions, type Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:'text'},
                password:{label:"password",type:"password"}
            },
            async authorize(credentials:any){
                if (!credentials?.email || !credentials?.password) return null;
                const existingUser = await prisma.user.findFirst({
                    where:{
                        email:credentials.email,
                    },
                })
                if(!existingUser) return null;
                const isPasswordValid = await bcrypt.compare(credentials.password,existingUser.password);
                if(!isPasswordValid) return null;
                return{
                    id:existingUser.userid,
                    name:existingUser.username,
                }
            }
        })
    ],
    secret:process.env.JWT_SECRET||"secret",
    callbacks:{
        async jwt({token,user}:{token:JWT;user?:any}){
            if(user){
                token.username = user.username;
            }
            return token
        },
        async session({token,session}:any){
            if(token&&session.user){
                session.user.id = token.sub;
                session.user.username = token.username;
            }
            return session;
        }
    }
}