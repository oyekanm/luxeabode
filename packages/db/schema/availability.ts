import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { users } from "./users";
import { buildings } from "./buildings";
import { apartments } from "./rooms";

// Admin-created blocked dates (maintenance, private use, etc.)
export const blockedDates = sqliteTable("blocked_dates", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  // block either a specific room or the whole apartment
  apartmentId: text("apartment_id").references(() => apartments.id, {
    onDelete: "cascade",
  }),
  buildingId: text("building_id").references(() => buildings.id, {
    onDelete: "cascade",
  }),
  startDate: text("start_date").notNull(), // ISO date YYYY-MM-DD
  endDate: text("end_date").notNull(),
  reason: text("reason"), // internal note
  createdBy: text("created_by").references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});
