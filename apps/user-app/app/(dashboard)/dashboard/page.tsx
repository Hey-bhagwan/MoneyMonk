

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import PortfolioGraph from "../../../components/portfolio";

import prisma from "@repo/db/client";
import { redirect } from "next/navigation";

export default async function() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect('/login'); // or return a 401 page
      }

    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id),
        },
    });

    const amount = (balance?.amount ?? 0) / 100;

    return <div className="w-screen h-screen">
                <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                        Welcome Back, {session?.user?.name || "User"}!
                </div>
                {/* <Balance /> */}
                <PortfolioGraph Balance={amount || 0} />
            </div>
}