import { newChat, saveMessage } from '@/services/chats';
import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';

export const send = async (req: Request, res: Response, next: NextFunction) => {
	const userId = req.app.locals.userId;
	let { chatId, content, chatName } = req.body;
	try {
		if (chatId === '') {
			chatId = nanoid(15);
			await newChat({
				id: chatId,
				name: chatName,
			});
		}
		await saveMessage({ content, userId, chatId });
	} catch (err) {
		next(err);
	}
};
