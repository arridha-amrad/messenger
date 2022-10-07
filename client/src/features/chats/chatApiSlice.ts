import { api } from '../../app/api';
import {
  IRoom,
  ISendMessageRequestBody,
  ISendMessageResponse,
} from './chat.types';

export const chatApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query<IRoom[], void>({
      query: () => 'chat/',
      transformResponse(baseQueryReturnValue: { rooms: IRoom[] }, meta, arg) {
        return baseQueryReturnValue.rooms;
      },
    }),
    sendMessage: builder.mutation<
      ISendMessageResponse,
      ISendMessageRequestBody & { roomId?: string }
    >({
      query: (data: ISendMessageRequestBody, roomId?: string) => ({
        url: `chat/send?roomId=${roomId}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSendMessageMutation, useGetRoomsQuery } = chatApiSlice;
