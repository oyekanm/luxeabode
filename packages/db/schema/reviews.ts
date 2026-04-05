import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { users } from "./users";
import { bookings } from "./bookings";
import { apartments } from "./rooms";
import { buildings } from "./buildings";

export const reviews = sqliteTable("reviews", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  bookingId: text("booking_id")
    .notNull()
    .references(() => bookings.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  // review targets one or the other
  apartmentId: text("apartment_id").references(() => apartments.id),
  buildingId: text("building_id").references(() => buildings.id),
  // ratings 1-5 across multiple dimensions
  overallRating: integer("overall_rating").notNull(), // 1-5
  cleanlinessRating: integer("cleanliness_rating"),
  accuracyRating: integer("accuracy_rating"),
  locationRating: integer("location_rating"),
  valueRating: integer("value_rating"),
  communicationRating: integer("communication_rating"),
  title: text("title"),
  body: text("body").notNull(),
  // admin moderation
  status: text("status", {
    enum: ["pending", "approved", "rejected", "flagged"],
  })
    .notNull()
    .default("pending"),
  adminResponse: text("admin_response"),
  adminResponseAt: integer("admin_response_at", { mode: "timestamp" }),
  isVerified: integer("is_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});
