export interface ISearchUser {
  id: string;
  username: string;
  email: string;
  imageURL: string;
}

export interface IChat {
  imageURL: string;
  username: string;
  time?: Date;
  message?: string;
  id?: string;
  isRead?: string;
}
