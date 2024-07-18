import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const userApiLimit = sqliteTable("user_api_limit", {
	id: text("id").primaryKey().default(createId()),
	userId: text("user_id").unique(),
	count: integer("count").default(0),
	createdAt: text("created_at")
		.notNull()
		.default(sql`(current_timestamp)`),
	updatedAt: text("updated_at")
		.notNull()
		.default(sql`(current_timestamp)`)
		.$onUpdate(() => sql`(current_timestamp)`),
});

export const userSubscription = sqliteTable("user_subscription", {
	id: text("id").primaryKey().default(createId()),
	userId: text("user_id").unique(),
	stripeCustomerId: text("stripe_customer_id").unique(),
	stripeSubscriptionId: text("stripe_subscription_id").unique(),
	stripePriceId: text("stripe_price_id").unique(),
	stripeCurrentPeriodEnd: integer("stripe_current_period_end", {
		mode: "timestamp_ms",
	}),
});
