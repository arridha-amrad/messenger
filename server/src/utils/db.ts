import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const connectToDB = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log('database ready 🔥🔥🔥');
  } catch (err) {
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
  } catch (err) {
    process.exit(1);
  }
};
