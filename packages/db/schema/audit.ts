import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { users } from "./users";

// Immutable audit log of all admin actions
export const auditLogs = sqliteTable("audit_logs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  actorId: text("actor_id").references(() => users.id), // admin who did the action
  action: text("action").notNull(), // e.g. "apartment.update"
  entity: text("entity").notNull(), // e.g. "apartments"
  entityId: text("entity_id").notNull(),
  // JSON diff of what changed: { before: {...}, after: {...} }
  changes: text("changes", { mode: "json" }),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});
