// owner table for controling the whole app

// role: regular users vs admins
//   role: text("role", { enum: [ "admin", "super_admin"] })
//     .notNull()
//     .default("user"),
//   // admin-specific
//   permissions: text("permissions", { mode: "json" })
//     .$type<AdminPermission[]>()
//     .default([]),

// Fine-grained admin permissions
export type AdminPermission =
  | "manage_apartments"
  | "manage_rooms"
  | "manage_bookings"
  | "manage_users"
  | "manage_payments"
  | "manage_reviews"
  | "view_reports";
