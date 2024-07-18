import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { userSubscription } from "@/db/schema";
import { absoluteUrl } from "@/lib/utils";
import { eq } from "drizzle-orm";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
	try {
		const { userId } = auth();
		const user = await currentUser();

		if (!user || !userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const [subscriptionUser] = await db
			.select()
			.from(userSubscription)
			.where(eq(userSubscription.userId, userId));

		if (subscriptionUser && subscriptionUser.stripeCustomerId) {
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: subscriptionUser.stripeCustomerId,
				return_url: settingsUrl,
			});
			return new NextResponse(JSON.stringify({ url: stripeSession.url }));
		}

		const stripeSession = await stripe.checkout.sessions.create({
			success_url: settingsUrl,
			cancel_url: settingsUrl,
			payment_method_types: ["card"],
			mode: "subscription",
			billing_address_collection: "auto",
			customer_email: user.emailAddresses[0].emailAddress,
			line_items: [
				{
					price_data: {
						currency: "USD",
						product_data: {
							name: "AI Generator",
							description: "AI Generator Subscription",
						},
						unit_amount: 1000,
						recurring: {
							interval: "month",
						},
					},
					quantity: 1,
				},
			],
			metadata: {
				userId: userId,
			},
		});

		return new NextResponse(JSON.stringify({ url: stripeSession.url }));
	} catch (error) {
		console.log("[STRIPE_ERROR]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
