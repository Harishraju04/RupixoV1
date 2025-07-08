import Card from "@repo/ui/card";

export const OnRampHistory = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center text-zinc-400 py-8">No Recent Transactions</div>
      </Card>
    );
  }
  
  return (
    <Card title="Recent Transactions">
      <div className="pt-2 space-y-4">
        {transactions.map((t, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b border-zinc-700 pb-2 text-zinc-200"
          >
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-zinc-500 text-xs">{t.time.toDateString()}</div>
            </div>

            <div className="text-sm font-medium text-[#67509d]">+ ₹{t.amount / 100}</div>

            <div className="text-xs px-2 py-1 rounded-md bg-zinc-800 border border-zinc-600">
              {t.status}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
