import { z } from "zod";

export const musicGenerationSchema = z.object({
	prompt: z.string().min(3, {
		message: "Prompt must be at least 3 characters",
	}),
});
