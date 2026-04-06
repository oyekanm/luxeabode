import { getDb } from "@/lib/db";
import { requireSession } from "@/lib/require-session";
import { hostSchema } from "@/lib/validators/hostSchema";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { admins, eq, hosts } from "@repo/db";
import { ValidationError } from "@repo/services/errors";
import { handleError } from "@repo/services/handle-error";
import { HostsService } from "@repo/services/server/host";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await requireSession();
    const { env } = getCloudflareContext();
    const db = getDb(env.DB);
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) throw new ValidationError("Invalid request body");

    const admin = await db.query.admins.findFirst({
      where: eq(admins.userId, userId),
      with: {
        host: {
          columns: {
            businessName: true,
          },
        },
      },
      columns: {
        userId: true,
      },
    });

    return NextResponse.json({ success: true, data: admin }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();
    const { env } = getCloudflareContext();
    const db = getDb(env.DB);
    const body = await req.json();

    const validated = hostSchema.safeParse(body);

    if (!validated.success) throw new ValidationError("Invalid request body");

    const { data } = validated;

    await HostsService.apply(db, session.user.id, data);

    return NextResponse.json(
      { success: true, message: "Host application submitted successfully" },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error);
  }
}
