import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const snapshotRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.snapshot.findMany()
  }),
  // change to private procedure when working
  // new procudure: takes an object with timestamp info
  createNew: protectedProcedure
    .input(z.object({unixtime: z.string()}))
    .mutation(({ctx, input}) => {
    return ctx.prisma.snapshot.create({
        data: {
            unixtime: input.unixtime,
            userId: ctx.session?.user.id,
            
        }
    })
  })

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
});
