import { relations } from "drizzle-orm";
import { bookings, bookingStatusHistory } from "../schema/bookings";
import { notifications } from "../schema/notifications";
import { invoices, payments } from "../schema/payments";
import { reviews } from "../schema/reviews";
import { users } from "../schema/users";
import { apartments, buildings } from "../schema";

const bookingsRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, { fields: [bookings.userId], references: [users.id] }),
  apartment: one(apartments, {
    fields: [bookings.apartmentId],
    references: [apartments.id],
  }),
  building: one(buildings, {
    fields: [bookings.buildingId],
    references: [buildings.id],
  }),
  payments: many(payments),
  invoice: many(invoices),
  review: many(reviews),
  statusHistory: many(bookingStatusHistory),
  notifications: many(notifications),
}));

const bookingStatusHistoryRelations = relations(
  bookingStatusHistory,
  ({ one }) => ({
    booking: one(bookings, {
      fields: [bookingStatusHistory.bookingId],
      references: [bookings.id],
    }),
  }),
);

const invoicesRelations = relations(invoices, ({ one }) => ({
  booking: one(bookings, {
    fields: [invoices.bookingId],
    references: [bookings.id],
  }),
}));

export { bookingsRelations, bookingStatusHistoryRelations, invoicesRelations };
