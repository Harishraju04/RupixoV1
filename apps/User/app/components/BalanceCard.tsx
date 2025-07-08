import Card from "@repo/ui/card"

export default function BalanceCard({ amount, locked }: { amount: number; locked: number }) {
  return (
    <Card title="Balance">
      <div className="bg-zinc-900 p-4 rounded-2xl">
        <div className="flex justify-between border-b border-zinc-700 pb-2 text-zinc-200 ">
        <div>Unlocked Balance</div>
        <div>{(amount / 100).toFixed(2)} INR</div>
      </div>

      <div className="flex justify-between border-b border-zinc-700 py-2 text-zinc-200">
        <div>Total Locked Balance</div>
        <div>{(locked / 100).toFixed(2)} INR</div>
      </div>

      <div className="flex justify-between border-b border-zinc-700 py-2 text-zinc-200">
        <div>Total Balance</div>
        <div>{((locked + amount) / 100).toFixed(2)} INR</div>
      </div>
      </div>
    </Card>
  );
}
