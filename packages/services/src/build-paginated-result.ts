import type { Apartment, Db } from "@repo/db";
import { and, apartments, desc, lt } from "@repo/db";
import type { GetRoomsFilters, PaginatedResult } from "./types";

export async function buildRoomPaginatedResult(
  rows: Apartment[],
  limit: number,
  cursor: string | undefined,
  db: Db,
  filters?: GetRoomsFilters,
): Promise<PaginatedResult<Apartment>> {
  const hasMore = rows.length > limit;
  const data = hasMore ? rows.slice(0, limit) : rows;

  // check if there are items before this page
  let prevCursor: string | null = null;

  if (cursor && data.length > 0) {
    const firstItem = data[0];

    console.log(firstItem.id, cursor, "testing cursor");

    const prevRow = await db.query.apartments.findFirst({
      where: and(
        lt(apartments.id, firstItem.id),
        // TODO:isactive filter
        // filters?.isPublished !== undefined
        //   ? eq(rooms.isActive, filters.isPublished)
        //   : undefined,
      ),
      orderBy: desc(apartments.id),
      columns: { id: true },
    });

    console.log(prevRow);

    prevCursor = prevRow?.id ?? null;
  }

  return {
    data,
    nextCursor: hasMore ? data[data.length - 1].id : null,
    prevCursor,
    hasMore,
  };
}
