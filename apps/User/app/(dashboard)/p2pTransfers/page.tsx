import P2PhistoryComponent from "../../components/P2PhistoryComponent";
import SendFormComp from "../../components/SendFormComp";
import { P2PhistoryHandler } from "../../lib/P2PhistoryHandler"; // <-- import server action

export default async function P2PPage() {
  // fetch the initial page of transactions from server action
  const { transactions, nextCursor } = await P2PhistoryHandler();

  return (
    <div className="w-full min-h-screen bg-black text-white flex justify-center">
      <div className="flex flex-col items-center w-full max-w-5xl p-6 space-y-6">
        {/* Grid layout for SendForm */}
        <div className="w-full">
          <SendFormComp />
        </div>
        {/* Pass initial history to client component */}
        <div className="w-full">
          <P2PhistoryComponent initialHistory={transactions} />
        </div>
      </div>
    </div>
  );
}
