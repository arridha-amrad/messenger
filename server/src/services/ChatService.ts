import { SendMessageInput } from "@/middleware/validator/sendMessage.validator";
import ChatRepo from "@/repositories/ChatRepo";
import LastSeenRepository from "@/repositories/LastSeenRepository";
import MessageReactionRepository from "@/repositories/MessageReactionRepository";
import MessageRepo from "@/repositories/MessageRepo";
import ParticipantRepo from "@/repositories/ParticipantRepo";

export default class ChatService {
  constructor(
    private chatRepo = new ChatRepo(),
    private messageRepo = new MessageRepo(),
    private lastSeenRepo = new LastSeenRepository(),
    private participantsRepo = new ParticipantRepo(),
    private msgReactRepo = new MessageReactionRepository()
  ) {}

  async storeMessage(message: SendMessageInput, authUserId: number) {
    let chatId = message.chatId;
    const isChatExist = await this.chatRepo.findOne({
      id: chatId,
    });
    if (!isChatExist) {
      await this.initChat({
        isGroup: message.isGroup,
        name: message.chatName,
        id: chatId,
      });
      await this.addChatParticipants(chatId, [
        ...message.receiverIds,
        authUserId,
      ]);
    }
    const newMessage = await this.saveMessage(
      chatId,
      message.content,
      message.sentAt,
      authUserId
    );
    return newMessage;
  }

  async findLastSeenByUserId(id: number) {
    const lastSeen = await this.lastSeenRepo.findOne({ userId: id });
    return lastSeen;
  }

  async deleteOneReactionMessage(
    userId: number,
    messageId: number,
    unified: string
  ) {
    return this.msgReactRepo.deleteOne({
      unified_userId_messageId: {
        messageId,
        unified,
        userId,
      },
    });
  }

  async findOneReactionOfMessage(
    userId: number,
    messageId: number,
    unified: string
  ) {
    return this.msgReactRepo.findOne({
      unified_userId_messageId: {
        userId,
        messageId,
        unified,
      },
    });
  }

  async giveReactionToMessage(
    messageId: number,
    userId: number,
    value: string,
    unified: string
  ) {
    return this.msgReactRepo.createOne({
      message: { connect: { id: messageId } },
      user: { connect: { id: userId } },
      value,
      unified,
    });
  }

  async saveLastSeen(userId: number, date: Date) {
    const newRecord = await this.lastSeenRepo.createOne({
      user: { connect: { id: userId } },
      lastSeenAt: date,
    });
    return newRecord;
  }

  async updateLastSeen(id: number, date: Date) {
    const updatedRecord = await this.lastSeenRepo.updateOne(
      {
        id,
      },
      {
        lastSeenAt: date,
      }
    );
    return updatedRecord;
  }

  async fetchChatsByUserId(id: number) {
    const chats = await this.chatRepo.findChats(id);
    return chats;
  }

  async fetchMessagesByChatId(id: string) {
    const messages = await this.messageRepo.findMany({ chatId: id });
    return messages;
  }

  async initChat({
    isGroup,
    name,
    id,
  }: {
    id: string;
    name?: string;
    isGroup?: boolean;
  }) {
    const newChat = await this.chatRepo.create({ isGroup, name, id });
    return newChat;
  }

  async addChatParticipants(chatId: string, userIds: number[]) {
    const participants = await this.participantsRepo.create(chatId, userIds);
    return participants;
  }

  async saveMessage(
    chatId: string,
    content: string,
    sentAt: Date,
    userId: number
  ) {
    const newMessage = await this.messageRepo.createOne({
      chat: { connect: { id: chatId } },
      content,
      sentAt,
      user: { connect: { id: userId } },
    });
    return newMessage;
  }
}
