import { relations } from "drizzle-orm";
import { blockedDates } from "../schema/availability";
import { bookings } from "../schema/bookings";
import { reviews } from "../schema/reviews";
import {
  apartmentImages,
  apartmentPricingRules,
  apartments,
  buildingImages,
  buildings,
  hosts,
} from "../schema";

const buildingRelations = relations(buildings, ({ many, one }) => ({
  apartments: many(apartments),
  images: many(buildingImages),
  blockedDates: many(blockedDates),
  bookings: many(bookings),
  reviews: many(reviews),
  host: one(hosts, {
    fields: [buildings.hostId],
    references: [hosts.id],
  }),
}));

const buildingImagesRelations = relations(buildingImages, ({ one }) => ({
  building: one(buildings, {
    fields: [buildingImages.buildingId],
    references: [buildings.id],
  }),
}));

const apartmentsRelations = relations(apartments, ({ one, many }) => ({
  building: one(buildings, {
    fields: [apartments.buildingId],
    references: [buildings.id],
  }),
  images: many(apartmentImages),
  pricingRules: many(apartmentPricingRules),
  blockedDates: many(blockedDates),
  bookings: many(bookings),
  reviews: many(reviews),
  host: one(hosts, {
    fields: [apartments.hostId],
    references: [hosts.id],
  }),
}));

const apartmentImagesRelations = relations(apartmentImages, ({ one }) => ({
  apartment: one(apartments, {
    fields: [apartmentImages.apartmentId],
    references: [apartments.id],
  }),
}));

const apartmentPricingRulesRelations = relations(
  apartmentPricingRules,
  ({ one }) => ({
    apartment: one(apartments, {
      fields: [apartmentPricingRules.apartmentId],
      references: [apartments.id],
    }),
  }),
);

const blockedDatesRelations = relations(blockedDates, ({ one }) => ({
  apartment: one(apartments, {
    fields: [blockedDates.apartmentId],
    references: [apartments.id],
  }),
  room: one(apartments, {
    fields: [blockedDates.apartmentId],
    references: [apartments.id],
  }),
}));

export {
  apartmentImagesRelations,
  apartmentsRelations,
  blockedDatesRelations,
  buildingImagesRelations,
  apartmentPricingRulesRelations,
  buildingRelations,
};
