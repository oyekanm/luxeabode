import { createDb } from '@repo/db/client'

export function getDb(d1: D1Database) {
  return createDb(d1)
}
