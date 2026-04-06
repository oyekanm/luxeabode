// packages/db/src/schema/hosts.ts
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { users } from "./users";
import { admins } from "./admins";

export const hosts = sqliteTable("hosts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),

  // the user who owns this host account
  // this person automatically becomes super_admin for this host
  ownerId: text("owner_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "restrict" }),

  // business details
  businessName: text("business_name").notNull(), // "Sunshine Properties" or just their name
  // businessType: text("business_type", {
  //   enum: ["individual", "company"],
  // })
  //   .notNull()
  //   .default("individual"),
  slug: text("slug").notNull().unique(),

  // contact and legal
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull().default("Nigeria"),

  // verification documents (stored as R2 keys)
  // e.g. govt ID, CAC certificate for companies
  govtIdKey: text("govt_id_key"),
  cacDocKey: text("cac_doc_key"), // company registration doc

  // bank details for payouts
  bankName: text("bank_name"),
  bankAccount: text("bank_account").notNull(),
  bankCode: text("bank_code"), // for paystack transfers
  accountHolderName: text("account_holder_name"),

  // platform settings
  commissionRate: real("commission_rate").notNull().default(0.1), // 10% default
  status: text("status", {
    enum: ["pending", "under_review", "approved", "suspended", "rejected"],
  })
    .notNull()
    .default("pending"),

  rejectionReason: text("rejection_reason"), // if rejected, why
  rejectedAt: integer("rejected_at", { mode: "timestamp" }),

  // TODO: create a new table schema for luxeabode admin and reference it here
  // rejectedBy: text("rejected_by").references(() => users.id, {
  //   onDelete: "set null",
  //   onUpdate: "cascade",
  // }),
  rejectedAdminName: text("rejected_name"),

  approvedAt: integer("approved_at", { mode: "timestamp" }),
  // approvedBy: text("approved_by").references(() => users.id, {
  //   onDelete: "set null",
  //   onUpdate: "cascade",
  // }),
  approvedAdminName: text("approved_name"),

  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export type Host = typeof hosts.$inferSelect;
export type HostStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "suspended"
  | "rejected";
