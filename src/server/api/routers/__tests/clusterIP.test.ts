import { beforeEach, describe, expect, test, it, vi } from 'vitest'
import type { Session } from 'next-auth'
import db from '../../../__mocks__/db'
import { createInnerTRPCContext } from '../../trpc'
import { clusterIPRouter } from '../clusterIP'


// 1- mock prisma module
vi.mock('../../../db') 

// 2- our tests

describe('exo procedures testing', () => {
  // 3- Reset everything  
  beforeEach(() => {
    vi.restoreAllMocks()
  })
  
  // 4- session mocked  
  const session: Session = {
    expires: new Date().toISOString(),
    user: {
      id: 'clgb17vnp000008jjere5g15i'
    }
  }
  
  // 5- init tRPC for test
  const ctx = createInnerTRPCContext({ session })
  const caller = clusterIPRouter.createCaller({ ...ctx, prisma: db })   
  
  describe("procedure 1 - tests", async () => {
    const clusterIP = { id: 'clgb17vnp000008jjere5g15i', ipAddress: '12.34.567.890', userId: 'clgb17vnp000008jjere5g15j', createdAt: new Date(), updatedAt: new Date()}
    const result = [clusterIP]
    db.clusterIP.create.mockResolvedValue({...clusterIP})
    const getAllResult = await caller.clusterIP.getAll()
    test('getAll clusterIP', () => {
      expect(getAllResult).toStrictEqual(result)
    })
  })  
})
