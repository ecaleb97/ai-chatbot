import { auth } from "@clerk/nextjs/server";
// import OpenAI from "openai";
import { NextResponse } from "next/server";
// import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

// const instructionMessage: ChatCompletionMessageParam = {
// 	role: "system",
// 	content:
// 		"You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
// };

// const openai = new OpenAI({
// 	apiKey: process.env.OPENAI_API_KEY,
// });

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const { messages } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		// if (!openai.apiKey) {
		// 	return new NextResponse("OpenAI API Key is required", { status: 500 });
		// }

		if (!messages) {
			return new NextResponse("Message is required", { status: 400 });
		}

		const response = await streamText({
			model: openai("gpt-3.5-turbo"),
			system:
				"You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
			messages,
		});

		return response.toAIStreamResponse();

		// const response = await openai.chat.completions.create({
		// 	model: "gpt-3.5-turbo",
		// 	messages: [instructionMessage, ...messages],
		// });

		// return new NextResponse(response.choices[0].message.content);
	} catch (error) {
		console.log("[CODE_GENERATOR_ERROR]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
