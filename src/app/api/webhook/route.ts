import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
	const body = await request.text();
	const signature = headers().get("Stripe-Signature") as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
	} catch (error: any) {
		return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
	}

	const session = event.data.object as Stripe.Checkout.Session;

	if (event.type === "checkout.session.completed") {
		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string,
		);
		if (!session?.metadata?.userId) {
			return new NextResponse("User id is required", { status: 400 });
		}

		await db.insert(userSubscription).values({
			userId: session.metadata.userId,
			stripeSubscriptionId: subscription.id,
			stripeCustomerId: subscription.customer as string,
			stripePriceId: subscription.items.data[0].price.id,
			stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
		});
	}

	if (event.type === "invoice.payment_succeeded") {
		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string,
		);

		await db
			.update(userSubscription)
			.set({
				stripePriceId: subscription.items.data[0].price.id,
				stripeCurrentPeriodEnd: new Date(
					subscription.current_period_end * 1000,
				),
			})
			.where(eq(userSubscription.stripeSubscriptionId, subscription.id));
	}

	return new NextResponse(null, { status: 200 });
}
