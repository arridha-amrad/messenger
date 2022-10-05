import { api } from '../../app/api';
import { IUser, ILoginResponse, ILoginDTO, IRegisterDTO } from './user.types';

export const userApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => 'user/me',
      transformResponse: (response: { user: IUser }, meta, arg) =>
        response.user,
      providesTags: ['User'],
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
} = userApiSlices;
