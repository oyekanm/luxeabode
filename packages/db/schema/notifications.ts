import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { users } from "./users";
import { bookings } from "./bookings";

export const notificationTemplates = sqliteTable("notification_templates", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  slug: text("slug").notNull().unique(), // e.g. "booking_confirmed"
  name: text("name").notNull(),
  channel: text("channel", { enum: ["email", "sms", "both"] }).notNull(),
  subject: text("subject"), // email subject
  // template body with {{variable}} placeholders
  bodyHtml: text("body_html"), // email HTML
  bodyText: text("body_text").notNull(), // SMS or plain text fallback
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export const notifications = sqliteTable("notifications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  bookingId: text("booking_id").references(() => bookings.id),
  templateId: text("template_id").references(() => notificationTemplates.id),
  channel: text("channel", { enum: ["email", "sms"] }).notNull(),
  type: text("type", {
    enum: [
      "booking_pending",
      "booking_confirmed",
      "booking_cancelled",
      "booking_reminder",
      "check_in_reminder",
      "check_out_reminder",
      "payment_received",
      "payment_failed",
      "refund_processed",
      "review_request",
      "admin_message",
    ],
  }).notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  recipient: text("recipient").notNull(), // email address or phone number
  status: text("status", {
    enum: ["queued", "sent", "delivered", "failed", "bounced"],
  })
    .notNull()
    .default("queued"),
  // provider response (Resend, Twilio, etc.)
  providerRef: text("provider_ref"),
  sentAt: integer("sent_at", { mode: "timestamp" }),
  failReason: text("fail_reason"),
  // in-app notification read state
  isRead: integer("is_read", { mode: "boolean" }).notNull().default(false),
  readAt: integer("read_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});
