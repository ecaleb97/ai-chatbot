import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const userApiLimit = sqliteTable("user_api_limit", {
	id: text("id").primaryKey(),
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
