-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
