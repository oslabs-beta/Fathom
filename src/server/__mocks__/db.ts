import type { PrismaClient } from "@prisma/client"
import {beforeEach} from "vitest"
import {mockDeep, mockReset} from "vitest-mock-extended";

beforeEach(() => {
    mockReset(db)
})

const db = mockDeep<PrismaClient>()
export default db
