/*
  Warnings:

  - You are about to drop the `_RoomToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RoomToUser" DROP CONSTRAINT "_RoomToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoomToUser" DROP CONSTRAINT "_RoomToUser_B_fkey";

-- DropTable
DROP TABLE "_RoomToUser";

-- CreateTable
CREATE TABLE "RoomOnUsers" (
    "userId" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "RoomOnUsers_pkey" PRIMARY KEY ("userId","roomId")
);

-- AddForeignKey
ALTER TABLE "RoomOnUsers" ADD CONSTRAINT "RoomOnUsers_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomOnUsers" ADD CONSTRAINT "RoomOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
