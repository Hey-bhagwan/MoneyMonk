import { getServerSession } from "next-auth";
import { TransactionCard } from "../../../components/TransactionCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";


export default async function() {
    const transactions = await getTransactiocreditns();



    return <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transactions
            </div>
            <TransactionCard transactions={transactions} />
    </div>
}

async function getTransactiocreditns() {
    const session = await getServerSession(authOptions);

    const trxns = await prisma.transaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        },
        orderBy: {
            timestamp: "desc"
        }
    });

    return trxns.map(t => ({
        date: t.timestamp.toDateString(),
        amount: ((t.amount)/100).toString(),
        type: t.type,
        status: t.status,
        description: t.description || "",
    }))
}