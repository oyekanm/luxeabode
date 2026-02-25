import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { users } from "./users";
import { rooms } from "./rooms";
import { apartments } from "./apartments";

export const bookings = sqliteTable("bookings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  // human-friendly reference number shown to users
  referenceNo: text("reference_no").notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  // one of these will be set depending on booking type
  roomId: text("room_id").references(() => rooms.id),
  apartmentId: text("apartment_id").references(() => apartments.id),
  bookingType: text("booking_type", {
    enum: [
      "room_nightly",
      "room_monthly",
      "apartment_nightly",
      "apartment_monthly",
    ],
  }).notNull(),
  status: text("status", {
    enum: [
      "pending", // awaiting payment
      "confirmed", // payment received
      "checked_in",
      "checked_out",
      "cancelled",
      "refunded",
      "no_show",
    ],
  })
    .notNull()
    .default("pending"),
  checkIn: text("check_in").notNull(), // ISO date YYYY-MM-DD
  checkOut: text("check_out").notNull(), // ISO date YYYY-MM-DD
  nights: integer("nights").notNull(),
  guests: integer("guests").notNull().default(1),
  // pricing snapshot at time of booking (never recalculate from current rates)
  nightlyRate: real("nightly_rate").notNull(),
  subtotal: real("subtotal").notNull(), // nights * nightly_rate
  cleaningFee: real("cleaning_fee").notNull().default(0),
  securityDeposit: real("security_deposit").notNull().default(0),
  discountAmount: real("discount_amount").notNull().default(0),
  taxAmount: real("tax_amount").notNull().default(0),
  totalAmount: real("total_amount").notNull(),
  currency: text("currency").notNull().default("NGN"),
  // guest details (stored separately in case booking is for someone else)
  guestName: text("guest_name").notNull(),
  guestEmail: text("guest_email").notNull(),
  guestPhone: text("guest_phone"),
  specialRequests: text("special_requests"),
  // internal notes from admin
  adminNotes: text("admin_notes"),
  cancelledAt: integer("cancelled_at", { mode: "timestamp" }),
  cancellationReason: text("cancellation_reason"),
  checkedInAt: integer("checked_in_at", { mode: "timestamp" }),
  checkedOutAt: integer("checked_out_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

// Status change audit trail
export const bookingStatusHistory = sqliteTable("booking_status_history", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  bookingId: text("booking_id")
    .notNull()
    .references(() => bookings.id, { onDelete: "cascade" }),
  fromStatus: text("from_status"),
  toStatus: text("to_status").notNull(),
  changedBy: text("changed_by").references(() => users.id),
  note: text("note"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});
