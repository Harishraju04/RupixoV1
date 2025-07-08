"use client";
import { useState } from "react";
import p2pTransactionHandler from "../lib/p2pTransactionHandler";
import Card from "@repo/ui/card";
import { TextInput } from "@repo/ui";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { resolve } from "path";



export default function SendFormComp() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const sleep = (ms:number)=> new Promise((resolve)=>setTimeout(resolve,ms));
  const handleSend = async () => {
    setSending(true);
    try {
      const res = await p2pTransactionHandler(phone, amount);
      if (res.msg === "Transaction successful") {
        setSuccess(true);

        // Delay before navigation to show success screen
        await sleep(3000);
        setSuccess(false);
        setSending(false);
        router.push("/p2pTransfers");
      } else {
        alert(res.msg);
        setSending(false);
      }
    } catch (err) {
      console.error(err);
      alert("Transaction Failed");
      setSending(false);
    }
  };

  // Don’t show anything if sending is done AND success is true (redirect is coming)
  if (sending && !success) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white bg-black">
        <div className="text-2xl font-semibold mb-4">Sending Money...</div>
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white bg-black">
        <div className="text-3xl font-bold text-green-500 mb-2">✅ Transaction Successful!</div>
        <div className="text-sm text-gray-400 mb-4">Redirecting to transfers...</div>
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Card title="Send Money" className="w-full p-4">
      <div className="flex flex-col gap-4">
        <TextInput
          placeholder="Enter phone number"
          label="Phone Number"
          onChange={(value) => setPhone(value)}
          value={phone}
        />
        <TextInput
          placeholder="Enter amount"
          label="Amount"
          onChange={(value) => setAmount(value)}
          value={amount}
        />
        <div className="flex justify-end">
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </Card>
  );
}
