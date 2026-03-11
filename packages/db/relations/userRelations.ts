import { relations } from "drizzle-orm";
import { apartments } from "../schema/apartments";
import { bookings } from "../schema/bookings";
import { notifications } from "../schema/notifications";
import { reviews } from "../schema/reviews";
import { rooms } from "../schema/rooms";
import { oauthAccounts, sessions, users } from "../schema/users";

const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  oauthAccounts: many(oauthAccounts),
  bookings: many(bookings),
  reviews: many(reviews),
  notifications: many(notifications),
}));

const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

const oauthAccountsRelations = relations(oauthAccounts, ({ one }) => ({
  user: one(users, {
    fields: [oauthAccounts.userId],
    references: [users.id],
  }),
}));

const reviewsRelations = relations(reviews, ({ one }) => ({
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

const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, { fields: [notifications.userId], references: [users.id] }),
  booking: one(bookings, {
    fields: [notifications.bookingId],
    references: [bookings.id],
  }),
}));

export {
  notificationsRelations,
  oauthAccountsRelations,
  reviewsRelations,
  sessionsRelations,
  usersRelations,
};
