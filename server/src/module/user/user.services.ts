import { Prisma } from '@prisma/client';

import { TokenModel, UserModel } from './user.model';
import { ITokenModel, IUserModel } from './user.types';

export const save = async (
  data: Prisma.UserCreateInput
): Promise<IUserModel> => {
  try {
    const newUser = await UserModel.create({
      data,
    });
    return newUser;
  } catch (err) {
    throw new Error('Saving user failure');
  }
};

export const findUser = async (query: string): Promise<IUserModel | null> => {
  try {
    let user: IUserModel | null;
    if (query.includes('@')) {
      user = await UserModel.findFirst({ where: { email: query } });
    } else {
      user = await UserModel.findFirst({ where: { username: query } });
    }
    return user;
  } catch (err) {
    throw new Error('Query user failure');
  }
};

export const removeToken = async (id: number): Promise<void> => {
  try {
    await TokenModel.delete({ where: { id } });
  } catch (err) {
    console.log(err);
    throw new Error('remove token failure');
  }
};

export const findById = async (id: string): Promise<IUserModel | null> => {
  try {
    const user = await UserModel.findFirst({
      where: {
        id,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
    throw new Error('find by id failure');
  }
};

export const saveToken = async (
  token: string,
  userId: string
): Promise<ITokenModel> => {
  try {
    const newToken = await TokenModel.create({
      data: {
        value: token,
        userId,
      },
    });
    return newToken;
  } catch (err) {
    console.log(err);
    throw new Error('save token failure');
  }
};

export const findToken = async (token: string): Promise<ITokenModel | null> => {
  try {
    const savedToken = await TokenModel.findFirst({ where: { value: token } });
    return savedToken;
  } catch (err) {
    console.log(err);
    throw new Error('find token failure');
  }
};

export const searchUser = async (
  query: string
): Promise<
  Array<{ id: string; username: string; email: string; imageURL: string }>
> => {
  try {
    const users = await UserModel.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        imageURL: true,
      },
      where: {
        username: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
    return users;
  } catch (err) {
    console.log(err);
    throw new Error('search user failure');
  }
};
