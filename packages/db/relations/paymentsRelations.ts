import { relations } from "drizzle-orm";
import { bookings } from "../schema/bookings";
import { payments } from "../schema/payments";
import { users } from "../schema/users";

export const paymentsRelations = relations(payments, ({ one }) => ({
  booking: one(bookings, {
    fields: [payments.bookingId],
    references: [bookings.id],
  }),
  user: one(users, { fields: [payments.userId], references: [users.id] }),
}));
