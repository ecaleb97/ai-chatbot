import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { userApiLimit } from "@/db/schema";
import { eq } from "drizzle-orm";
import { MAX_FREE_COUNTS } from "./constants";

export async function increaseApiLimit() {
	const { userId } = auth();

	if (!userId) {
		return;
	}

	const [userLimit] = await db
		.select()
		.from(userApiLimit)
		.where(eq(userApiLimit.userId, userId));

	if (userLimit) {
		await db
			.update(userApiLimit)
			.set({ count: (userLimit.count ?? 0) + 1 })
			.where(eq(userApiLimit.userId, userId));
	} else {
		await db.insert(userApiLimit).values({
			userId: userId,
			count: 1,
		});
	}
}

export async function checkApiLimit() {
	const { userId } = auth();

	if (!userId) {
		return false;
	}

	const [userLimit] = await db
		.select()
		.from(userApiLimit)
		.where(eq(userApiLimit.userId, userId));

	if (!userLimit || userLimit.count! < MAX_FREE_COUNTS) {
		return true;
	} else {
		return false;
	}
}

export async function getApiLimitCount() {
	const { userId } = auth();

	if (!userId) {
		return 0;
	}

	const [userLimit] = await db
		.select()
		.from(userApiLimit)
		.where(eq(userApiLimit.userId, userId));

	if (!userLimit) {
		return 0;
	}

	return userLimit?.count ?? 0;
}
