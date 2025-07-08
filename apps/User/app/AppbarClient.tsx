"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {Appbar} from "@repo/ui"
export function AppbarClient(){
    const session = useSession();
    const router = useRouter();

    return(
        <div>
            <div className="bg-zinc-900">
                <Appbar user={session.data?.user} onSigin={signIn} onSignout={async()=>{await signOut(); router.push("/api/auth/signin")}}></Appbar>
            </div>
        </div>
    )
}