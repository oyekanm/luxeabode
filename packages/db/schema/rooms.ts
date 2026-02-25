import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { apartments } from "./apartments";

export const rooms = sqliteTable("rooms", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  apartmentId: text("apartment_id")
    .notNull()
    .references(() => apartments.id, { onDelete: "cascade" }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(), // e.g. "Deluxe Suite", "Room 3A"
  description: text("description").notNull(),
  type: text("type", {
    enum: ["single", "double", "suite", "studio", "penthouse"],
  }).notNull(),
  // booking mode: can a room be booked alone, or only as part of whole-apartment booking
  bookingMode: text("booking_mode", {
    enum: ["room_only", "apartment_only", "both"],
  })
    .notNull()
    .default("both"),
  maxGuests: integer("max_guests").notNull().default(2),
  bedrooms: integer("bedrooms").notNull().default(1),
  bathrooms: real("bathrooms").notNull().default(1), // 1.5 = 1 full + 1 half
  floorNumber: integer("floor_number"),
  sizeM2: real("size_m2"),
  // pricing
  nightlyRate: real("nightly_rate").notNull(), // base nightly price
  monthlyRate: real("monthly_rate"), // discounted monthly rate
  cleaningFee: real("cleaning_fee").notNull().default(0),
  securityDeposit: real("security_deposit").default(0),
  // room-specific amenities (bed type, AC, balcony, etc.)
  amenities: text("amenities", { mode: "json" })
    .$type<RoomAmenity[]>()
    .default([]),
  // room-specific rules that override/extend apartment rules
  rules: text("rules", { mode: "json" }).$type<string[]>().default([]),
  coverImageKey: text("cover_image_key"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export const roomImages = sqliteTable("room_images", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  roomId: text("room_id")
    .notNull()
    .references(() => rooms.id, { onDelete: "cascade" }),
  r2Key: text("r2_key").notNull(),
  altText: text("alt_text"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

// Seasonal or special pricing overrides
export const roomPricingRules = sqliteTable("room_pricing_rules", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  roomId: text("room_id")
    .notNull()
    .references(() => rooms.id, { onDelete: "cascade" }),
  name: text("name").notNull(), // e.g. "Christmas Holiday"
  nightlyRate: real("nightly_rate"),
  monthlyRate: real("monthly_rate"),
  startDate: text("start_date").notNull(), // ISO date YYYY-MM-DD
  endDate: text("end_date").notNull(),
  priority: integer("priority").notNull().default(0), // higher = takes precedence
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export type RoomAmenity = {
  name: string;
  icon: string;
  category:
    | "bed"
    | "bathroom"
    | "kitchen"
    | "entertainment"
    | "climate"
    | "outdoor"
    | "other";
};
