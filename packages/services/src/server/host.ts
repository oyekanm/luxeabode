// packages/services/src/hosts.ts
import { eq } from "@repo/db";
import { hosts, admins, users } from "@repo/db/schema";
import { ConflictError, NotFoundError, ForbiddenError } from "../errors";
import type { Db } from "@repo/db";
import type { HostApplicationInput } from "../types";

export class HostsService {
  // user submits host application
  static async apply(db: Db, userId: string, input: HostApplicationInput) {
    // check user exists
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    if (!user) throw new NotFoundError("User");

    // check not already a host
    const existing = await db.query.hosts.findFirst({
      where: eq(hosts.ownerId, userId),
    });
    //   check if user is an admin to a host
    const admin = await db.query.admins.findFirst({
      where: eq(admins.userId, userId),
    });
    if (admin?.hostId)
      throw new ConflictError(
        "You are already an admin to a host, please contact the super admin to remove you from the host before applying",
      );

    if (existing)
      throw new ConflictError("You already have a host application");

    // TODO: make host status approved and remove when theres a mechanism to verify and also remove the admin creation query

    const [host] = await db
      .insert(hosts)
      .values({ ...input, ownerId: userId, status: "approved" })
      .returning();

    // create admin
    await db.insert(admins).values({
      userId,
      hostId: host.id,
      role: "super_admin",
      permissions: [],
      isActive: true,
    });

    return host;
  }

  // LuxeStay staff approves a host application
  static async approve(
    db: Db,
    hostId: string,
    approvedAdminData: { id: string; name: string },
  ) {
    const host = await db.query.hosts.findFirst({
      where: eq(hosts.id, hostId),
    });
    if (!host) throw new NotFoundError("Host");

    // update host status in one batch
    await db.batch([
      // approve the host
      db
        .update(hosts)
        .set({
          status: "approved",
          approvedAt: new Date(),
          //   approvedBy: approvedAdminData.id,
          approvedAdminName: approvedAdminData.name,
        })
        .where(eq(hosts.id, hostId)),

      // automatically create super_admin record for the host owner
      db.insert(admins).values({
        userId: host.ownerId,
        hostId: host.id,
        role: "super_admin",
        permissions: [],
        isActive: true,
      }),
    ]);
  }

  // TODO: sent verification email to the admin invited to verify their user account
  // super admin invites a staff member
  // static async inviteAdmin(db: Db, input: {
  //   hostId:      string
  //   inviteEmail: string
  //   role:        'admin' | 'manager' | 'viewer'
  //   permissions: string[]
  //   invitedBy:   string   // the admin.id of who is inviting
  // }) {
  //   // verify inviter is a super_admin for this host
  //   const inviter = await db.query.admins.findFirst({
  //     where: eq(admins.id, input.invitedBy),
  //   })

  //   if (!inviter || inviter.hostId !== input.hostId) {
  //     throw new ForbiddenError()
  //   }
  //   if (inviter.role !== 'super_admin' && inviter.role !== 'admin') {
  //     throw new ForbiddenError()
  //   }

  //   // create admin record with invite token
  //   // userId is null until they accept — so we allow null temporarily
  //   const inviteToken = crypto.randomUUID()

  //   const [admin] = await db
  //     .insert(admins)
  //     .values({
  //       userId:      'pending',
  //       hostId:      input.hostId,
  //       role:        input.role,
  //       permissions: input.permissions,
  //       inviteEmail: input.inviteEmail,
  //       inviteToken,
  //       isActive:    false,           // not active until accepted
  //       createdBy:   input.invitedBy,
  //     })
  //     .returning()

  //   // caller sends the invite email with token
  //   return { admin, inviteToken }
  // }

  // // staff member accepts invite
  // static async acceptInvite(db: Db, token: string, userId: string) {
  //   const admin = await db.query.admins.findFirst({
  //     where: eq(admins.inviteToken, token),
  //   })

  //   if (!admin) throw new NotFoundError('Invite')

  //   const [updated] = await db
  //     .update(admins)
  //     .set({
  //       userId,
  //       isActive:          true,
  //       inviteAcceptedAt:  new Date(),
  //       inviteToken:       null,
  //     })
  //     .where(eq(admins.id, admin.id))
  //     .returning()

  //   return updated
  // }
}
