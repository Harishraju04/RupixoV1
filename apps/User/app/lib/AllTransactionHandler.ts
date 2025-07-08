import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export default async function AllTransactionHandler() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return [];

  const userid = session.user.id;

  const [onramp, p2ps] = await Promise.all([
    prisma.onRampTransactions.findMany({
      where: { userid },
      orderBy: { startTime: "desc" }
    }),
    prisma.p2pTransfer.findMany({
      where: {
        OR: [
          { fromUserid: userid },
          { toUserid: userid }
        ]
      },
      orderBy: { timestamp: "desc" }
    })
  ]);

  const p2pFormatted = p2ps.map((val) => {
    const isSent = val.fromUserid === userid;
    return {
      id: val.id,
      amount: val.amount,
      type: isSent ? "Sent" as const : "Received" as const,
      time: val.timestamp,
      counterparty: isSent ? val.toUserid : val.fromUserid
    };
  });

  const allTx = [
    ...onramp.map((val) => ({
      id: val.id,
      amount: val.amount,
      type: "OnRamp" as const,
      time: val.startTime,
      status: val.status
    })),
    ...p2pFormatted
  ];

  return allTx.sort((a, b) => b.time.getTime() - a.time.getTime());
}
