"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { prisma } from "@repo/db";

export default async function p2pTransactionHandler(phone: string, amount: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return { msg: "Error while sending" };
    }

    const finalAmount = Number(amount) * 100;
    if (isNaN(finalAmount) || finalAmount <= 0) {
        return { msg: "Invalid amount" };
    }

    const fromUserId = session.user.id;

    const toUser = await prisma.user.findUnique({
        where: { phone: phone }
    });

    if (!toUser || !toUser.userid) {
        return { msg: "User not found" };
    }

    

    try {
        await prisma.$transaction(async (tx) => {
            // Lock sender's balance row
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userid"=${fromUserId} FOR UPDATE`;

            const fromBalance = await tx.balance.findUnique({
                where: { userid: fromUserId }
            });

            if (!fromBalance || fromBalance.amount < finalAmount) {
                throw new Error("Insufficient funds");
            }

            await tx.balance.update({
                where: { userid: fromUserId },
                data: { amount: { decrement: finalAmount } }
            });

            await tx.balance.update({
                where: { userid: toUser.userid },
                data: { amount: { increment: finalAmount } }
            });
            await tx.p2pTransfer.create({
                data:{
                    amount:finalAmount,
                    fromUserid:fromUserId,
                    toUserid:toUser.userid,
                    timestamp: new Date()
                }
            })
        });

        return { msg: "Transaction successful" };
    } catch (error: any) {
        return { msg: error.message || "Transaction failed" };
    }
}
