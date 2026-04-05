import * as userRelations from "./userRelations";
import * as apartmentsRelations from "./apartmentsRelations";
import * as bookingsRelations from "./bookingsRelations";
import * as paymentsRelations from "./paymentsRelations";
import * as hostsRelations from "./hostsRelations";

export const relationsObj = {
  ...userRelations,
  ...apartmentsRelations,
  ...bookingsRelations,
  ...paymentsRelations,
  ...hostsRelations,
};
