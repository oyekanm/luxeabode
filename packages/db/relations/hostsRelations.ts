import { admins, hosts, users, apartments, buildings } from "../schema";
import { relations } from "drizzle-orm";

const hostsRelations = relations(hosts, ({ one, many }) => ({
  owner: one(users, {
    fields: [hosts.ownerId],
    references: [users.id],
  }),
  //   adminApprover: one(admins, {
  //     fields: [hosts.approvedBy],
  //     references: [admins.id],
  //     relationName: "hostApprovals",
  //   }),
  //   adminRejector: one(admins, {
  //     fields: [hosts.rejectedBy],
  //     references: [admins.id],
  //     relationName: "hostRejections",
  //   }),
  apartments: many(apartments),
  buildings: many(buildings),
}));

const adminsRelations = relations(admins, ({ one, many }) => ({
  host: one(hosts, {
    fields: [admins.hostId],
    references: [hosts.id],
  }),
  user: one(users, {
    fields: [admins.userId],
    references: [users.id],
  }),
  //   approvedHosts: many(hosts, {
  //     relationName: "hostApprovals",
  //   }),
  //   rejectedHosts: many(hosts, {
  //     relationName: "hostRejections",
  //   }),
}));

export { hostsRelations, adminsRelations };
