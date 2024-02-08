/*
  Warnings:

  - You are about to drop the column `expEarned` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "expEarned",
ADD COLUMN     "exp_earned" BOOLEAN NOT NULL DEFAULT false;
