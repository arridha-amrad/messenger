import { NextFunction, Request, Response } from 'express';

export const getChats = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const userId = req.app.locals.userId;
	try {
	} catch (err) {
		next(err);
	}
};
