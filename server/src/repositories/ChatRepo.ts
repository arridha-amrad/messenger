import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const include = {
  messages: {
    take: 1,
    orderBy: {
      sentAt: "desc" as const,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          imageURL: true,
        },
      },
    },
  },
  participants: {
    include: {
      user: {
        select: {
          id: true,
          username: true,
          imageURL: true,
        },
      },
    },
  },
};

type QueryResult = Prisma.ChatGetPayload<{
  include: typeof include;
}>;

export default class ChatRepo {
  async create(data: Prisma.ChatCreateInput) {
    const result = await prisma.chat.create({
      data,
    });
    return result;
  }

  async findOne(where: Prisma.ChatWhereUniqueInput) {
    const chat = await prisma.chat.findUnique({
      where,
    });
    return chat;
  }

  async deleteOne(id: string) {
    await prisma.chat.delete({
      where: {
        id,
      },
    });
  }

  async findChats(userId: number) {
    const result = await prisma.chat.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
      include,
    });
    const chats = result.map((chat) => this.normalizeChat(chat));
    return chats;
  }

  private normalizeChat(chat: QueryResult) {
    const { content, sentAt, user, id } = chat.messages[0];
    return {
      id: chat.id,
      name: chat.name,
      isGroup: chat.isGroup,
      participants: chat.participants.map((p) => p.user),
      message: {
        id,
        content,
        sentAt,
        user,
      },
    };
  }
}
