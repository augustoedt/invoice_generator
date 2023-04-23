import type { InferModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userInfo = sqliteTable("user_info", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  country: text("country"),
  address: text("address"),
  zip: integer("zip"),
  contact: text("phone"),
});

export type UserInfo = InferModel<typeof userInfo>;
export type InsertUserInfo = InferModel<typeof userInfo, "insert">;
