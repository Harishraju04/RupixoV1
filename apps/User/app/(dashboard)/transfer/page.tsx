import AddMoneyComp from "../../components/AddMoneyComp";
import BalanceCard from "../../components/BalanceCard";
import { OnRampHistory } from "../../components/OnRampHistory";
import GetBalanceInfo from "../../lib/GetBalanceInfo";
import OnRampTransHistory from "../../lib/OnRampTransHistory";

export default async function () {
  const res = await GetBalanceInfo();
  const onramp = await OnRampTransHistory();

  return (
    <div className="w-full min-h-screen bg-black text-white flex justify-center">
      <div className="flex flex-col items-center w-full max-w-5xl p-6 space-y-6">
        {/* Grid layout for AddMoney + BalanceCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <AddMoneyComp />
          <BalanceCard amount={res.amount} locked={res.locked} />
        </div>

        {/* Full-width history card below */}
        <div className="w-full">
          <OnRampHistory transactions={onramp} />
        </div>
      </div>
    </div>
  );
}
