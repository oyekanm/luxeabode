import { relations } from "drizzle-orm";
import { bookings } from "../schema/bookings";
import { notifications } from "../schema/notifications";
import { reviews } from "../schema/reviews";
import { accounts, sessions, users } from "../schema/users";
import { admins, apartments, buildings } from "../schema";
import { hosts } from "../schema/host";

const usersRelations = relations(users, ({ many, one }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  bookings: many(bookings),
  reviews: many(reviews),
  notifications: many(notifications),
  host: one(hosts, {
    fields: [users.id],
    references: [hosts.ownerId],
  }),
  admin: one(admins, {
    fields: [users.id],
    references: [admins.userId],
  }),
}));

const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, { fields: [reviews.userId], references: [users.id] }),
  booking: one(bookings, {
    fields: [reviews.bookingId],
    references: [bookings.id],
  }),
  apartment: one(apartments, {
    fields: [reviews.apartmentId],
    references: [apartments.id],
  }),
  building: one(buildings, {
    fields: [reviews.buildingId],
    references: [buildings.id],
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
  accountsRelations,
  notificationsRelations,
  reviewsRelations,
  sessionsRelations,
  usersRelations,
};
