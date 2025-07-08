import AllTransactionComp from "../../components/AllTransactionsComp";
import AllTransactionHandler from "../../lib/AllTransactionHandler"

export default async function(){
    const alltransactions = await AllTransactionHandler();
    if(!alltransactions.length){
        return (
            <div>
                No Transactions history
            </div>
        )
    }
    return <div>
        <AllTransactionComp transactions={alltransactions}></AllTransactionComp>
    </div>
}