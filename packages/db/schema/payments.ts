import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { bookings } from "./bookings";
import { users } from "./users";

export const payments = sqliteTable("payments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  bookingId: text("booking_id")
    .notNull()
    .references(() => bookings.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  type: text("type", {
    enum: ["booking_payment", "security_deposit", "refund", "partial_refund"],
  }).notNull(),
  status: text("status", {
    enum: ["pending", "processing", "completed", "failed", "cancelled"],
  })
    .notNull()
    .default("pending"),
  amount: real("amount").notNull(),
  currency: text("currency").notNull().default("NGN"),
  // payment gateway details (Paystack, Flutterwave, Stripe, etc.)
  gateway: text("gateway", {
    enum: ["paystack", "flutterwave", "stripe", "manual"],
  }).notNull(),
  gatewayRef: text("gateway_ref"), // gateway transaction ID
  gatewayResponse: text("gateway_response", { mode: "json" }), // raw gateway payload
  paidAt: integer("paid_at", { mode: "timestamp" }),
  failureReason: text("failure_reason"),
  // for refunds, link back to the original payment
  refundedFromId: text("refunded_from_id"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export const invoices = sqliteTable("invoices", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  bookingId: text("booking_id")
    .notNull()
    .references(() => bookings.id),
  invoiceNo: text("invoice_no").notNull().unique(), // e.g. INV-2024-0001
  // snapshot of line items at invoice generation time
  lineItems: text("line_items", { mode: "json" })
    .$type<InvoiceLineItem[]>()
    .notNull(),
  subtotal: real("subtotal").notNull(),
  taxAmount: real("tax_amount").notNull().default(0),
  totalAmount: real("total_amount").notNull(),
  currency: text("currency").notNull().default("NGN"),
  // r2 key to the generated PDF
  pdfKey: text("pdf_key"),
  issuedAt: integer("issued_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  dueAt: integer("due_at", { mode: "timestamp" }),
  paidAt: integer("paid_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export type InvoiceLineItem = {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
};
