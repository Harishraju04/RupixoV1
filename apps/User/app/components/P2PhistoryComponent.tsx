"use client";

import Card from "@repo/ui/card";
import { useSession } from "next-auth/react";

export default function P2PhistoryComponent({
  history,
}: {
  history: {
    time: Date;
    amount: number;
    from: string;
    to: string;
  }[];
}) {
  const { data: session } = useSession();

  if (!history.length) {
    return (
      <Card title="Recent P2P Transfers">
        <div className="text-center text-zinc-400 py-8">No Recent Transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent P2P Transfers">
      <div className="pt-2 space-y-4">
        {history.map((val, idx) => {
          const isSent = val.from === session?.user?.id;
          return (
            <div
              key={idx}
              className="flex justify-between items-center border-b border-zinc-700 pb-2 text-zinc-200"
            >
              <div>
                <div className="text-sm">{isSent ? "Sent" : "Received"} ₹{val.amount / 100}</div>
                <div className="text-zinc-500 text-xs">{new Date(val.time).toLocaleString()}</div>
              </div>

              <div className="text-xs px-2 py-1 rounded-md bg-zinc-800 border border-zinc-600">
                {isSent ? `To: ${val.to}` : `From: ${val.from}`}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
