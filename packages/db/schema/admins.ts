// packages/db/src/schema/admins.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { users } from "./users";
import { hosts } from "./host";

export const admins = sqliteTable("admins", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),

  // admin belongs to a user account
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // admin belongs to a host — this is the key relationship
  hostId: text("host_id")
    .notNull()
    .references(() => hosts.id, { onDelete: "cascade" }),

  role: text("role", {
    enum: ["super_admin", "admin"],
  })
    .notNull()
    .default("admin"),

  permissions: text("permissions", { mode: "json" })
    .$type<AdminPermission[]>()
    .notNull()
    .default([]),

  // invite tracking
  inviteEmail: text("invite_email"), // email the invite was sent to
  inviteToken: text("invite_token"), // token for accepting invite
  inviteAcceptedAt: integer("invite_accepted_at", { mode: "timestamp" }),

  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  // createdBy:   text('created_by')
  //              .references(() => users.),    // which admin invited them
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export type Admin = typeof admins.$inferSelect;

// Fine-grained admin permissions
export type AdminPermission =
  | "manage_apartments"
  | "manage_rooms"
  | "manage_bookings"
  | "manage_users"
  | "manage_payments"
  | "manage_reviews"
  | "view_reports";
