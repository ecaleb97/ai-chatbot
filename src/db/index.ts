import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@/db/schema";

// TODO: Implement turso later on

const sqlite = new Database("dbtest.db");
export const db = drizzle(sqlite, { schema });
