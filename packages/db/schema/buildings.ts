import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import type { Apartment } from "./rooms";
import { admins } from "./admins";
import { hosts } from "./host";

export const buildings = sqliteTable("buildings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  slug: text("slug").notNull().unique(), // for SEO-friendly URLs
  name: text("name").notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull().default("NG"),
  latitude: real("latitude"),
  longitude: real("longitude"),

  // rules stored as JSON array of strings
  rules: text("rules", { mode: "json" }).$type<string[]>().default([]),

  // owner detail
  // adminId: text("admin_id")
  //   .notNull()
  //   .references(() => admins.id, { onDelete: "cascade" }),

  hostId: text("host_id")
    .notNull()
    .references(() => hosts.id, { onDelete: "cascade" }),

  // general amenities at apartment level (wifi, parking, pool etc)
  // amenities: text("amenities", { mode: "json" }).$type<string[]>().default([]),
  checkInTime: text("check_in_time").notNull().default("14:00"),
  checkOutTime: text("check_out_time").notNull().default("11:00"),
  minStayNights: integer("min_stay_nights").default(1),
  isPublished: integer("is_published", { mode: "boolean" })
    .notNull()
    .default(false),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export const buildingImages = sqliteTable("building_images", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  buildingId: text("building_id")
    .notNull()
    .references(() => buildings.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  key: text("key").notNull(), // R2 object key
  altText: text("alt_text"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export type Building = typeof buildings.$inferSelect & {
  apartments: Apartment[];
  images: BuildingImage[];
};
export type BuildingImage = typeof buildingImages.$inferSelect;

export type CreateBuilding = typeof buildings.$inferInsert;
