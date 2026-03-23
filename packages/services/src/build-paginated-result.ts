import { GetRoomsFilters, PaginatedResult } from "./types";
import { Db, Room, and, desc, eq, gt, lt, rooms } from "@repo/db";

export async function buildRoomPaginatedResult(
  rows: Room[],
  limit: number,
  cursor: string | undefined,
  db: Db,
  filters?: GetRoomsFilters,
): Promise<PaginatedResult<Room>> {
  const hasMore = rows.length > limit;
  const data = hasMore ? rows.slice(0, limit) : rows;

  // check if there are items before this page
  let prevCursor: string | null = null;

  if (cursor && data.length > 0) {
    const firstItem = data[0];

    console.log(firstItem.id, cursor, "testing cursor");

    const prevRow = await db.query.rooms.findFirst({
      where: and(
        lt(rooms.id, firstItem.id),
        // TODO:isactive filter
        // filters?.isPublished !== undefined
        //   ? eq(rooms.isActive, filters.isPublished)
        //   : undefined,
      ),
      orderBy: desc(rooms.id),
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
