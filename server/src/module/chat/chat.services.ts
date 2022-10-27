import { MessageModel, RoomModel } from './chat.model';
import { IMessageModel, IRoomModel } from './chat.types';

export const findReceiverUnreadMessages = async (
	roomId: number,
	senderId: string
): Promise<IMessageModel[]> => {
	try {
		const messages = await MessageModel.findMany({
			where: {
				roomId,
				isRead: false,
				senderId: {
					not: senderId,
				},
			},
		});
		return messages;
	} catch (err) {
		console.log(err);
		throw new Error('find unread message failure');
	}
};

export const readMessage = async (
	roomId: number,
	loginUserId: string
): Promise<void> => {
	try {
		await MessageModel.updateMany({
			data: {
				isRead: true,
			},
			where: {
				AND: {
					roomId,
					senderId: {
						not: loginUserId,
					},
				},
			},
		});
	} catch (err) {
		console.log(err);
		throw new Error('update message read failure');
	}
};

export const findMessages = async (
	roomId: number
): Promise<IMessageModel[]> => {
	try {
		const messages = await MessageModel.findMany({
			where: {
				roomId,
			},
			orderBy: {
				id: 'asc',
			},
		});
		return messages;
	} catch (err) {
		console.log(err);
		throw new Error('find messages failure');
	}
};

export const createRoom = async (users: string[]): Promise<IRoomModel> => {
	try {
		const newRoom = await RoomModel.create({
			data: {
				users: {
					create: users.map((userId) => ({
						userId,
					})),
				},
			},
		});
		return newRoom;
	} catch (err) {
		console.log(err);
		throw new Error('create room failure');
	}
};

export const saveMessage = async (
	body: string,
	roomId: number,
	senderId: string
): Promise<IMessageModel> => {
	try {
		const newMessage = await MessageModel.create({
			data: {
				body,
				roomId,
				senderId,
			},
		});
		return newMessage;
	} catch (err) {
		console.log(err);
		throw new Error('save message failure');
	}
};

export const findRoomById = async (id: number): Promise<IRoomModel | null> => {
	try {
		const room = await RoomModel.findFirst({
			where: {
				id,
			},
		});
		return room;
	} catch (err) {
		console.log(err);
		throw new Error('find room by id error');
	}
};

export const findRooms = async (
	userId: string
): Promise<
	Array<
		IRoomModel & {
			users: Array<{
				user: {
					id: string;
					imageURL: string;
					username: string;
					email: string;
				};
			}>;
			messages: IMessageModel[];
		}
	>
> => {
	try {
		const rooms = await RoomModel.findMany({
			orderBy: {},
			include: {
				users: {
					select: {
						user: {
							select: {
								imageURL: true,
								username: true,
								id: true,
								email: true,
							},
						},
					},
					where: {
						userId: {
							not: userId,
						},
					},
				},
				messages: {
					orderBy: {
						createdAt: 'desc',
					},
					take: 1,
				},
			},
			where: {
				users: {
					some: {
						userId,
					},
				},
			},
		});
		return rooms;
	} catch (err) {
		console.log(err);
		throw new Error('find Rooms error');
	}
};
