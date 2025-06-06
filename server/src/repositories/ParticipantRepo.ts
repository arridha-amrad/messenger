import { prisma } from "@/lib/prisma";

export default class ParticipantRepo {
  async create(chatId: string, userIds: number[]) {
    await prisma.participant.createMany({
      data: userIds.map((uid) => ({
        chatId,
        userId: uid,
      })),
    });
  }
}
