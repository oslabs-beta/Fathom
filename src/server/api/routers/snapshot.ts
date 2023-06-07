import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const snapshotRouter = createTRPCRouter({
    // queries and returns all snapshots
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.snapshot.findMany()
  }),

  // change to private procedure when working
  // new procudure: takes an object with timestamp info
  createNew: protectedProcedure
    .input(z.object({unixtime: z.number(), clusterIP:z.string()}))
    .mutation(({ctx, input}) => {
    return ctx.prisma.snapshot.create({
        data: {
          clusterIP: input.clusterIP,
            unixtime: input.unixtime,
            userId: ctx.session?.user.id,
            
        }
    })
  })

});
