// packages/db/src/schema/tenants.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

export const tenants = sqliteTable("tenants", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(), // "Sunshine Properties Ltd"
  slug: text("slug").notNull().unique(), // "sunshine-properties"
  // custom domain support — "reservations.sunshineproperties.com"
  customDomain: text("custom_domain").unique(),
  plan: text("plan", {
    enum: ["free", "starter", "pro", "enterprise"],
  })
    .notNull()
    .default("free"),
  // plan limits
  maxBuildings: integer("max_buildings").notNull().default(1),
  maxRooms: integer("max_rooms").notNull().default(10),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

// every admin belongs to a tenant
export const tenantMembers = sqliteTable("tenant_members", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  tenantId: text("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull(),
  role: text("role", {
    enum: ["owner", "admin", "manager", "viewer"],
  })
    .notNull()
    .default("admin"),
  permissions: text("permissions", { mode: "json" })
    .$type<string[]>()
    .default([]),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

// TODO: all will have a tenantid to connect to a owner and a userid to know who created it (optional)

//  tenantId: text('tenant_id').notNull()
//     .references(() => tenants.id, { onDelete: 'cascade' }),
