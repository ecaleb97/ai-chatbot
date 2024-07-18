import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";

const DAYS_IN_MS = 86_400_000;

export async function checkSubscription() {
	const { userId } = auth();

	if (!userId) return false;

	const [subscription] = await db
		.select({
			stripeSubscriptionId: userSubscription.stripeSubscriptionId,
			stripeCurrentPeriodEnd: userSubscription.stripeCurrentPeriodEnd,
			stripeCustomerId: userSubscription.stripeCustomerId,
			stripePriceId: userSubscription.stripePriceId,
		})
		.from(userSubscription)
		.where(eq(userSubscription.userId, userId));

	if (!subscription) return false;

	const isValid =
		subscription.stripePriceId &&
		subscription.stripeCurrentPeriodEnd!.getTime() + DAYS_IN_MS > Date.now();

	console.log(subscription.stripeCurrentPeriodEnd!.getTime());
	// console.log(subscription.stripeCurrentPeriodEnd?.getTime());
	// console.log(new Date(subscription.stripeCurrentPeriodEnd).getTime());
	return !!isValid;
}
