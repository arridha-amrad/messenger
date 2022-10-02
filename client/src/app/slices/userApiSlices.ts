import { api } from '../../app/api';

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

export const userApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => 'users/me',
      transformResponse: (response: { user: IUser }, meta, arg) =>
        response.user,
      providesTags: () => ['User'],
    }),
    login: builder.mutation<ILoginResponse, ILoginDTO>({
      query: (credentials: ILoginDTO) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<string, void>({
      query: () => '/users/logout',
    }),
    register: builder.mutation<ILoginResponse, IRegisterDTO>({
      query: (credentials: IRegisterDTO) => ({
        url: 'register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} = userApiSlices;
