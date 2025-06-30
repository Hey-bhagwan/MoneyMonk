"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTxn(amount: number, provider : string){
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = parseInt(session.user.id);

    if (!session?.user) {
        return{
            message: "User not authenticated",
        }
    }

    const onRamp = await prisma.onRampTransaction.create({
        data:{
            userId,
            amount,
            provider,
            status: "Processing",
            startTime: new Date(),
            token
        }
    })

    await prisma.transaction.create({
        data: {
            userId,
            amount,
            type: "OnRamp",
            status: "Pending",
            onRampTransactionId: onRamp.id
        }
    })

    return{
        message: "OnRamp created successfully"
    }

}