"use client";

import Card from "@repo/ui/card";

export default function AllTransactionComp({ transactions }: {
  transactions: {
    id: string;
    type: "OnRamp" | "Sent" | "Received";
    amount: number;
    time: Date;
    status?: string;
    counterparty?: string;
  }[];
}) {
  if (!transactions.length) {
    return (
      <Card title="All Transactions">
        <div className="text-center text-zinc-400 py-8">No Transactions Found</div>
      </Card>
    );
  }

  return (
    <Card title="All Transactions">
      <div className="pt-2 space-y-4">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center border-b border-zinc-700 pb-2 text-zinc-200"
          >
            <div>
              <div className="text-sm">
                {t.type === "OnRamp"
                  ? `onRamp - ₹${t.amount / 100}`
                  : t.type === "Sent"
                  ? `sent ₹${t.amount / 100}`
                  : `received ₹${t.amount / 100}`}
              </div>
              <div className="text-zinc-500 text-xs">
                {new Date(t.time).toLocaleString()}
              </div>
            </div>

            <div className="text-xs px-2 py-1 rounded-md bg-zinc-800 border border-zinc-600">
              {t.type === "OnRamp" ? t.status : `User: ${t.counterparty}`}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
