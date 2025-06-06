import { z } from "zod";

export const sendMessageSchema = z.object({
  content: z.string().min(1),
  receiverIds: z.number().array(),
  chatId: z.string(),
  sentAt: z.string(),
  chatName: z.string().nullable(),
  isGroup: z.boolean(),
});

export type TSendMessage = z.infer<typeof sendMessageSchema>;
