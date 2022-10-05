import { ISearchUser } from '@features/chats/chat.types';
import { api } from '../../app/api';
import { IUser, ILoginResponse, ILoginDTO, IRegisterDTO } from './user.types';

export const userApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    searchUser: builder.query<ISearchUser[], string>({
      query: (query: string) => `user/search?user=${query}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    getUser: builder.query<IUser, void>({
      query: () => 'user/me',
      transformResponse: (response: { user: IUser }, meta, arg) =>
        response.user,
    }),
    login: builder.mutation<ILoginResponse, ILoginDTO>({
      query: (credentials: ILoginDTO) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<string, void>({
      query: () => 'user/logout',
    }),
    register: builder.mutation<ILoginResponse, IRegisterDTO>({
      query: (credentials: IRegisterDTO) => ({
        url: 'user/register',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useSearchUserQuery,
} = userApiSlices;
