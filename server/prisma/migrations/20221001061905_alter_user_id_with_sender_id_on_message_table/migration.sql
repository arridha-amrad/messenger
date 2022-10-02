/*
  Warnings:

  - You are about to drop the column `userId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the `RoomOnUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `senderId` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoomOnUsers" DROP CONSTRAINT "RoomOnUsers_roomId_fkey";

-- DropForeignKey
ALTER TABLE "RoomOnUsers" DROP CONSTRAINT "RoomOnUsers_userId_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_userId_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "userId",
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "senderId" TEXT NOT NULL;

-- DropTable
DROP TABLE "RoomOnUsers";

-- CreateTable
CREATE TABLE "room_on_users" (
    "userId" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "room_on_users_pkey" PRIMARY KEY ("userId","roomId")
);

-- AddForeignKey
ALTER TABLE "room_on_users" ADD CONSTRAINT "room_on_users_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_on_users" ADD CONSTRAINT "room_on_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
