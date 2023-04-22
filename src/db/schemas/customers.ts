import type { InferModel } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const customers = sqliteTable("customers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  email: text("email"),
  phone: text("phone"),
});

export type Customer = InferModel<typeof customers>;
export type InsertCustomer = InferModel<typeof customers, "insert">;
