import { relations } from "drizzle-orm";
import { users, sessions, oauthAccounts } from "../schema/users";
import { apartments, apartmentImages } from "../schema/apartments";
import { rooms, roomImages, roomPricingRules } from "../schema/rooms";
import { blockedDates } from "../schema/availability";
import { bookings, bookingStatusHistory } from "../schema/bookings";
import { payments, invoices } from "../schema/payments";
import { reviews } from "../schema/reviews";
import { notifications } from "../schema/notifications";

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  oauthAccounts: many(oauthAccounts),
  bookings: many(bookings),
  reviews: many(reviews),
  notifications: many(notifications),
}));

export const apartmentsRelations = relations(apartments, ({ many }) => ({
  rooms: many(rooms),
  images: many(apartmentImages),
  blockedDates: many(blockedDates),
  bookings: many(bookings),
  reviews: many(reviews),
}));

export const roomsRelations = relations(rooms, ({ one, many }) => ({
  apartment: one(apartments, {
    fields: [rooms.apartmentId],
    references: [apartments.id],
  }),
  images: many(roomImages),
  pricingRules: many(roomPricingRules),
  blockedDates: many(blockedDates),
  bookings: many(bookings),
  reviews: many(reviews),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, { fields: [bookings.userId], references: [users.id] }),
  room: one(rooms, { fields: [bookings.roomId], references: [rooms.id] }),
  apartment: one(apartments, {
    fields: [bookings.apartmentId],
    references: [apartments.id],
  }),
  payments: many(payments),
  invoice: many(invoices),
  review: many(reviews),
  statusHistory: many(bookingStatusHistory),
  notifications: many(notifications),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  booking: one(bookings, {
    fields: [payments.bookingId],
    references: [bookings.id],
  }),
  user: one(users, { fields: [payments.userId], references: [users.id] }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, { fields: [reviews.userId], references: [users.id] }),
  booking: one(bookings, {
    fields: [reviews.bookingId],
    references: [bookings.id],
  }),
  room: one(rooms, { fields: [reviews.roomId], references: [rooms.id] }),
  apartment: one(apartments, {
    fields: [reviews.apartmentId],
    references: [apartments.id],
  }),
}));

export const relationsObj = {
  usersRelations,
  apartmentsRelations,
  roomsRelations,
  bookingsRelations,
  paymentsRelations,
  reviewsRelations,
};
