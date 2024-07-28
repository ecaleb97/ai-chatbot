import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export async function POST(request: Request) {
	try {
		const { userId } = auth();
		const { messages } = await request.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!messages) {
			return new NextResponse("Message is required", { status: 400 });
		}

		const hasFreeTrial = await checkApiLimit();
		const isPro = await checkSubscription();

		if (!hasFreeTrial && !isPro) {
			return new NextResponse("You have reached the free trial limit", {
				status: 403,
			});
		}

		const response = await streamText({
			model: openai("gpt-4-turbo"),
			system: `You are a code generator. You must answer only in markdown code snippets. 
				Use code comments for explanations.`,
			messages,
		});

		if (!isPro) {
			await increaseApiLimit();
		}

		return response.toAIStreamResponse();
	} catch (error) {
		console.log("[CODE_GENERATOR_ERROR]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
