import { api } from '../../app/api';
import { IMessage, IRoom, ISendMessageRequestBody } from './chat.types';

export const chatApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<IMessage[], string | undefined>({
      query: (roomId?: string) =>
        roomId ? `chat/messages?roomId=${roomId}` : null,
      providesTags: ['Message'],
    }),
    getRooms: builder.query<IRoom[], void>({
      query: () => 'chat/',
      transformResponse(baseQueryReturnValue: { rooms: IRoom[] }, meta, arg) {
        return baseQueryReturnValue.rooms;
      },
    }),
    sendMessage: builder.mutation<
      IMessage,
      ISendMessageRequestBody & { roomId?: string }
    >({
      query: (data: ISendMessageRequestBody & { roomId?: string }) => ({
        url: `chat/send?roomId=${data.roomId}`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(reqBody, { dispatch, queryFulfilled }) {
        try {
          const { data: body } = await queryFulfilled;
          dispatch(
            chatApiSlice.util.updateQueryData(
              'getMessages',
              reqBody.roomId,
              (draft: IMessage[]) => {
                draft.push(body);
              }
            )
          );
          dispatch(
            chatApiSlice.util.updateQueryData(
              'getRooms',
              undefined,
              (draft: IRoom[]) => {
                const room = draft.find((d) => d.user.id === reqBody.toId);
                if (room) {
                  room.message = body;
                  room.id = body.roomId;
                }
              }
            )
          );
        } catch {}
      },
      transformResponse(
        baseQueryReturnValue: { message: IMessage },
        meta,
        arg
      ) {
        return baseQueryReturnValue.message;
      },
    }),
  }),
});

export const { useSendMessageMutation, useGetRoomsQuery, useGetMessagesQuery } =
  chatApiSlice;
