import OpenAI from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const { prompt, amount = 1, resolution = "256x256" } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!openai.apiKey) {
			return new NextResponse("OpenAI API Key is required", { status: 500 });
		}

		if (!prompt) {
			return new NextResponse("Prompt is required", { status: 400 });
		}

		if (!amount) {
			return new NextResponse("Amount is required", { status: 400 });
		}

		if (!resolution) {
			return new NextResponse("Resolution is required", { status: 400 });
		}

		const hasFreeTrial = await checkApiLimit();

		if (!hasFreeTrial) {
			return new NextResponse("You have reached the free trial limit", {
				status: 403,
			});
		}

		const response = await openai.images.generate({
			// model: "dall-e-2",
			prompt,
			n: parseInt(amount, 10),
			size: resolution,
		});

		await increaseApiLimit();

		return new NextResponse(
			response.data
				.map((image) => image?.url || "No image generated")
				.join("\n"),
		);
	} catch (error) {
		console.log("[IMAGE_GENERATION_ERROR]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
