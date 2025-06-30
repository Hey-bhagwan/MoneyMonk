-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('OnRamp', 'P2PTransfer');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('Pending', 'Completed', 'Failed');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "type" "TransactionType" NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "userId" INTEGER NOT NULL,
    "onRampTransactionId" INTEGER,
    "p2pTransferId" INTEGER,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_onRampTransactionId_fkey" FOREIGN KEY ("onRampTransactionId") REFERENCES "OnRampTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_p2pTransferId_fkey" FOREIGN KEY ("p2pTransferId") REFERENCES "p2pTransfer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
