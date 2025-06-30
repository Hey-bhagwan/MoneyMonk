"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    // Use email as a unique identifier if 'id' is not present
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Retry later",
        }
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number: to,
        },
    })

    if (!toUser) {
        return {
            message: "User not found",
        }
    }

    await prisma.$transaction(async (txn) => {
        await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        const fromBalance = await txn.balance.findFirst({
            where: {
                id: Number(from),
            },
        });

        if (!fromBalance || fromBalance.amount < amount) {
            return {
                message: "Insufficient balance",
            }
        };

        await txn.balance.update({
            where: {
                id: Number(from)
            },
            data: {
                amount: fromBalance.amount - amount,
            }
        });

        await txn.balance.update({
            where: {
                id: toUser.id,
            },
            data: {
                amount: { increment: amount }
            }
        });

        const p2p = await txn.p2pTransfer.create({
            data: {
                fromUserId: Number(from),
                toUserId: toUser.id,
                amount: amount,
                timestamp: new Date(),
            }
        })

        await txn.transaction.create({
            data: {
                userId: Number(toUser.id),
                amount: -amount,
                type: "P2PTransfer",
                description: `Transferred ${amount} to ${toUser.name || toUser.number}`,
                status: "Completed",
                p2pTransferId: p2p.id
            }
        })
    });

}