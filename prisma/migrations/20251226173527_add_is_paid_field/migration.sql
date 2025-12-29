/*
  Warnings:

  - You are about to drop the column `hasPayment` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hasPayment",
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false;
