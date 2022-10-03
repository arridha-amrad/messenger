export interface IUser {
  id: string;
  username: string;
  email: string;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILoginDTO {
  identity: string;
  password: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}

export interface IRegisterDTO {
  email: string;
  username: string;
  password: string;
}
