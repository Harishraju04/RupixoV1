"use client"
import { Card, Select, TextInput } from "@repo/ui";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import { CreateOnrampTransaction } from "../lib/creatOnrampTransaction";
import { useSession } from "next-auth/react";
import axios from "axios";
import { HandleFailedTransaction } from "../lib/HandleFailedTransaction";

const Banks = [{name:"HDFC",
    redirectUrl:"https://netbanking.hdfcbank.com"},
    {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}]
export default function AddMoneyComp(){
    //const[redirectUrl,setRedirecUrl] = useState(Banks[0]?.redirectUrl||" ");
    const[amount,setAmount] = useState(0);
    const[provider,setProvider] = useState("");
    const session = useSession();
    const userid = session.data?.user?.id;
    
    return(
        <div>
            <Card title="Add Money">
                <div className="w-full" >
                    <TextInput label={"Amount"} placeholder="Amount" onChange={(val)=>{
                        setAmount(Number(val));
                    }}></TextInput>
                </div>
                <div className="text-zinc-200">
                    Bank
                </div>
                <Select onSelect={(value)=>{
                       setProvider(Banks.find(x=>x.name === value)?.name||"");
                      //setRedirecUrl(Banks.find(x=>x.name === value)?.redirectUrl||"")
                    }} options={Banks.map(x=>({key:x.name,value:x.name}))}>
                </Select>

                <div className="flex justify-center pt-4">
                    <Button onClick={async()=>{
                        const token = await CreateOnrampTransaction(provider, amount, userid);

                        try{
                            const res = await axios.put(
                            "http://localhost:4000/api/bank/transfer",
                            {},
                            {
                            headers: {
                                "transfer-token": token.token,
                            },
                            }
                        );
                        }
                        catch(err){
                            if(axios.isAxiosError(err)&&err.response){
                                await HandleFailedTransaction(token.token);
                                alert("transaction failed");
                            }
                        }
                       
                    }}> Add Money </Button>
                </div>
            </Card>
        </div>
    )
}