/*
  Warnings:

  - You are about to drop the column `maxExperience` on the `Level` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `currentExperience` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `levelId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `maxExpTodoDaily` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `max_experience` to the `Level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_levelId_fkey";

-- AlterTable
ALTER TABLE "Level" DROP COLUMN "maxExperience",
ADD COLUMN     "max_experience" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "currentExperience",
DROP COLUMN "levelId",
DROP COLUMN "maxExpTodoDaily",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "current_experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "level_id" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "max_exp_todo_daily" INTEGER NOT NULL DEFAULT 7,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
