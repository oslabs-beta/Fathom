import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Session } from 'next-auth'
import prismaMock from '../../../__mocks__/db'
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
  const caller = clusterIPRouter.createCaller({ ...ctx, prisma: prismaMock })   
    
  describe("procedure 1 - tests", () => {
    await caller.clusterIP.getAll()
  })  
})
