"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignUp } from "../lib/actions";
import Link from "next/link";
import Image from "next/image";
export default function signup(){
    const session = useSession();
    const router = useRouter();
    const[email,setEmail] = useState("");
    const[username,setUsername] = useState("");
    const[phone,setPhone] = useState("");
    const[password,setPassword] = useState("");
    if(session.status == "authenticated"){
        router.push("/dashboard");
    }
    else{
        
         return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Left Side: Info */}
      <div className="flex items-center justify-center px-10 ">
        <div className="max-w-md space-y-6">
          <h1 className="text-6xl font-bold text-purple-800">Rupixo</h1>
          <h2 className="text-xl font-semibold ">Pay. Breathe. Done</h2>
          <Image src={"/signupImage.svg"} alt="signup image" width={400} height={400} className=""></Image>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center  text-white px-10">
        <div className="w-full max-w-sm space-y-6 bg-zinc-900 rounded-2xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Get Started</h2>
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link href="/api/auth/signin" className="text-purple-400 hover:underline">
                Login
              </Link>
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input onChange={(e)=>{
                setUsername(e.target.value);
              }}
                className="w-full px-3 py-2 border border-gray-500 rounded-lg bg-zinc-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="John"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input onChange={(e)=>{
                setEmail(e.target.value);
              }}
                type="email"
                className="w-full px-3 py-2 border border-gray-500 rounded-lg bg-zinc-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="johndoe@gmail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input onChange={(e)=>{
                setPhone(e.target.value);
              }}
                type="tel"
                className="w-full px-3 py-2 border border-gray-500 rounded-lg bg-zinc-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="9160147108"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input onChange={(e)=>{
                setPassword(e.target.value);
              }}
                type="password"
                className="w-full px-3 py-2 border border-gray-500 rounded-lg bg-zinc-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="********"
              />
            </div>
          </div>

          <div className="pt-4">
            <button onClick={()=>{
                SignUp(email,username,phone,password);
                router.push("/api/auth/signin");
            }}
              type="button"
              className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-medium py-2 px-4 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-400"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
    }
}