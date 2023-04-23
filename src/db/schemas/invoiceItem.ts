import type { InferModel } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const invoiceItem = sqliteTable("invoice_item", {
  id: text("id").primaryKey(),
  description: text("name"),
  hasRate: integer("hasrate").notNull().default(0),
  hours: real("hours").default(0),
  rate: real("rate").default(0),
  value: real("total").default(0),
});

export type InvoiceItem = InferModel<typeof invoiceItem>;
export type InsertInvoiceItem = InferModel<typeof invoiceItem, "insert">;
