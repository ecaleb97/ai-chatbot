import { auth } from "@clerk/nextjs/server";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const { messages } = await req.json();
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
			model: openai("gpt-3.5-turbo"),
			messages,
		});

		if (!isPro) {
			await increaseApiLimit();
		}

		return response.toAIStreamResponse();
	} catch (error) {
		console.log("[CONVERSATION_ERROR]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
