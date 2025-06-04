import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { formatZodErrors } from "./helper.validator";
import sanitizeHtml from "sanitize-html";

export const sendMessageSchema = z.object({
  content: z
    .string()
    .transform((val) =>
      sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
    ),
  receiverIds: z.number().array(),
  chatId: z.number().nullable(),
  sentAt: z.string().transform((val) => new Date(val)),
  chatName: z.string().optional(),
  isGroup: z.boolean().optional(),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;

export const validateSendMessageInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validation = sendMessageSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ errors: formatZodErrors(validation.error) });
    return;
  }

  req.body = validation.data;
  next();
};
