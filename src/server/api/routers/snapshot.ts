import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const snapshotRouter = createTRPCRouter({
  // test procedure for checking that snapshot.ts is imported
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

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
          clusterIP:input.clusterIP,
            unixtime: input.unixtime,
            userId: ctx.session?.user.id,
            
        }
    })
  })

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
});
