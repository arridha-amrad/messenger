import { api } from '../../app/api';
import { ISearchUser } from './chat.types';

export const chatApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    searchUser: builder.query<ISearchUser, string>({
      query: (query: string) => 'user/search',
      // transformResponse: (response: { user: IUser }, meta, arg) =>
      //   response.user,
    }),
  }),
});

export const {} = chatApiSlice;
