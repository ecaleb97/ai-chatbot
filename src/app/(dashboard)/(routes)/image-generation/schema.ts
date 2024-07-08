import { z } from "zod";

export const imagesGeneratorSchema = z.object({
	prompt: z.string().min(1, {
		message: "Please enter a prompt",
	}),
	amount: z.string().min(1, {
		message: "Please select the number of photos",
	}),
	resolution: z.string().min(1, {
		message: "Please select the resolution",
	}),
});

export const amountOptions = [
	{
		value: "1",
		label: "1 Photo",
	},
	{
		value: "2",
		label: "2 Photos",
	},
	{
		value: "3",
		label: "3 Photos",
	},
	{
		value: "4",
		label: "4 Photos",
	},
	{
		value: "5",
		label: "5 Photos",
	},
];

export const resolutionOptions = [
	{
		value: "256x256",
		label: "256x256",
	},
	{
		value: "512x512",
		label: "512x512",
	},
	{
		value: "1024x1024",
		label: "1024x1024",
	},
];
