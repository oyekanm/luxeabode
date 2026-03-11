import { relations } from "drizzle-orm";
import { apartmentImages, apartments } from "../schema/apartments";
import { blockedDates } from "../schema/availability";
import { bookings } from "../schema/bookings";
import { reviews } from "../schema/reviews";
import { roomImages, roomPricingRules, rooms } from "../schema/rooms";

const apartmentsRelations = relations(apartments, ({ many }) => ({
  rooms: many(rooms),
  images: many(apartmentImages),
  blockedDates: many(blockedDates),
  bookings: many(bookings),
  reviews: many(reviews),
}));

const apartmentImagesRelations = relations(apartmentImages, ({ one }) => ({
  apartment: one(apartments, {
    fields: [apartmentImages.apartmentId],
    references: [apartments.id],
  }),
}));

const roomsRelations = relations(rooms, ({ one, many }) => ({
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

const roomImagesRelations = relations(roomImages, ({ one }) => ({
  room: one(rooms, {
    fields: [roomImages.roomId],
    references: [rooms.id],
  }),
}));

const roomPricingRulesRelations = relations(roomPricingRules, ({ one }) => ({
  room: one(rooms, {
    fields: [roomPricingRules.roomId],
    references: [rooms.id],
  }),
}));

const blockedDatesRelations = relations(blockedDates, ({ one }) => ({
  apartment: one(apartments, {
    fields: [blockedDates.apartmentId],
    references: [apartments.id],
  }),
  room: one(rooms, {
    fields: [blockedDates.roomId],
    references: [rooms.id],
  }),
}));

export {
  apartmentImagesRelations,
  apartmentsRelations,
  blockedDatesRelations,
  roomImagesRelations,
  roomPricingRulesRelations,
  roomsRelations,
};
