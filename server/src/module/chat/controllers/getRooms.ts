import { Request, Response } from 'express';

import {
	findReceiverUnreadMessages,
	findRooms,
} from '@chat-module/chat.services';
import { disconnectDB } from '@utils/db';

export default async (req: Request, res: Response): Promise<void> => {
	const userId = req.app.locals.userId;
	try {
		const myRooms = await findRooms(userId);
		const rooms: any = myRooms;
		for (const room of rooms) {
			const messages = await findReceiverUnreadMessages(room.id, userId);
			room.user = room.users[0].user;
			room.message = room.messages[0];
			room.sum = messages.length;
			delete room.users;
			delete room.messages;
		}
		rooms.sort((a: any, b: any) => {
			return (
				new Date(b.message.createdAt).getTime() -
				new Date(a.message.createdAt).getTime()
			);
		});
		res.status(200).json({ rooms });
		return;
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	} finally {
		await disconnectDB();
	}
};
