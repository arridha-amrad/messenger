/*
  Warnings:

  - Made the column `userId` on table `tokens` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tokens" ALTER COLUMN "userId" SET NOT NULL;
