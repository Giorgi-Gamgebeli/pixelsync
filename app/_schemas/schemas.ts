import { z } from "zod";

export const AddFriendSchema = z.object({
  userName: z.string({ message: "Only text is allowed" }),
});

export const DeletePendingFriendRequestSchema = z.object({
  id: z.string({ message: "Only text is allowed" }),
});
