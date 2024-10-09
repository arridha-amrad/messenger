import db from '@/lib/drizzle/db';
import { chats, messages, participants, users } from '@/lib/drizzle/schema';
import { aliasedTable, and, eq, ne } from 'drizzle-orm';

export const findChats = async (userId: string) => {
	const p = aliasedTable(participants, 'p');
	const result = await db
		.select({
			chatId: chats.id,
			chatName: chats.name,
			receiver: users.username,
		})
		.from(participants)
		.leftJoin(
			p,
			and(eq(p.chatId, participants.chatId), ne(p.userId, userId)),
		)
		.leftJoin(chats, eq(chats.id, p.chatId))
		.innerJoin(users, eq(p.userId, users.id))
		.where(eq(participants.userId, userId));

	return result;
};

export const findMessages = async (chatId: string) => {
	const result = await db
		.select()
		.from(messages)
		.where(eq(messages.chatId, chatId));
	return result;
};

export const newChat = async (data: typeof chats.$inferInsert) => {
	await db.insert(chats).values(data);
};

export const saveMessage = async (data: typeof messages.$inferInsert) => {
	await db.insert(messages).values(data);
};
