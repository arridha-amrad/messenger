import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type TReaction = {
  id: number;
  value: string;
  unified: string;
  users: [
    {
      id: number;
      username: string;
      imageURL: string | null;
    }
  ];
};

const include = {
  chat: {
    select: {
      id: true,
      name: true,
      isGroup: true,
      createdAt: true,
    },
  },
  user: {
    select: {
      id: true,
      username: true,
      imageURL: true,
    },
  },
  reactions: {
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
  readers: {
    include: {
      reader: {
        select: {
          id: true,
          username: true,
          imageURL: true,
          email: true,
          createdAt: true,
        },
      },
    },
  },
};

type QueryResult = Prisma.MessageGetPayload<{
  include: typeof include;
}>;

export default class MessageRepo {
  async createOne(data: Prisma.MessageCreateInput) {
    const result = await prisma.message.create({
      data,
      include,
    });
    return this.normalizeMessage(result);
  }

  async findMany(where?: Prisma.MessageWhereInput) {
    const result = await prisma.message.findMany({
      where,
      include,
    });
    const messages = result.map((data) => this.normalizeMessage(data));
    return messages;
  }

  async deleteOne(id: number) {
    await prisma.message.delete({ where: { id } });
  }

  private normalizeMessage(message: QueryResult) {
    const reactions = message.reactions.reduce((prev, curr) => {
      const reaction = prev.find((v) => v.unified === curr.unified);
      if (!reaction) {
        prev.push({
          ...curr,
          users: [curr.user],
        });
      } else {
        reaction.users.push(curr.user);
      }
      return prev;
    }, [] as TReaction[]);
    return {
      id: message.id,
      chatId: message.chatId,
      content: message.content,
      sentAt: message.sentAt,
      user: message.user,
      readers: message.readers.map((r) => ({
        ...r.reader,
      })),
      reactions,
    };
  }
}
