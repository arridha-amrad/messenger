import { searchUsers } from '@/services/user';
import { NextFunction, Request, Response } from 'express';

export default async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const { searchKey } = req.params;
	try {
		const users = await searchUsers(searchKey);
		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
};
