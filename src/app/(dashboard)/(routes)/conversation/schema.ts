import { z } from "zod";

export const conversationSchema = z.object({
	prompt: z.string().min(5, {
		message: "Prompt must be at least 5 characters",
	}),
});
