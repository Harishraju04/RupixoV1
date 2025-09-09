"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { prisma } from "@repo/db";

export async function P2PhistoryHandler(cursor?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { transactions: [], nextCursor: null };
  }

  const userId = session.user.id;
  const pageSize = 5;

  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserid: userId },
        { toUserid: userId },
      ],
    },
    orderBy: [
      { timestamp: "desc" },
      { id: "desc" }, // tie-breaker
    ],
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    take: pageSize + 1, // overfetch by 1
  });

  let nextCursor: string | null = null;
  if (transactions.length > pageSize) {
    const nextItem = transactions.pop(); // remove extra
    nextCursor = nextItem?.id ?? null;
  }

  return {
    transactions: transactions.map(val => ({
      id: val.id,
      time: val.timestamp,
      amount: val.amount,
      from: val.fromUserid,
      to: val.toUserid,
    })),
    nextCursor,
  };
}
