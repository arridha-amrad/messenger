import { Token, User } from '@prisma/client';

export type IUserModel = User;
export type ITokenModel = Token;
export type RegisterDTO = Pick<IUserModel, 'email' | 'password' | 'username'>;

export interface IFieldError {
  field: string;
  message: string;
}

export interface IValidatorResult {
  errors: IFieldError[];
  valid: boolean;
}

export interface ILoginDTO {
  identity: string;
  password: string;
}
