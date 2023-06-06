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
    return ctx.prisma.snapshot.findMany({
        where: {
            userId: {
              equals: ctx.session?.user.id,
            }
          }
        })
  }),

  // type
  getByUserCluster: protectedProcedure
    .input(z.object({ clusterIP: z.string()}))
    .query(({ ctx, input }) => {
      return ctx.prisma.snapshot.findMany({
        where: {
          clusterIP: {
            equals: input.clusterIP
          },
          AND: {
            userId: {
              equals: ctx.session?.user.id,
            }
          }
        }
      })
    }),

  // change to private procedure when working
  // new procudure: takes an object with timestamp info
  createNew: protectedProcedure
    .input(z.object({unixtime: z.number(),
    label:z.string(),
    clusterIP:z.string()
    }))
    .mutation(({ctx, input}) => {
    return ctx.prisma.snapshot.create({
        data: {
            unixtime: input.unixtime,
            label: input.label,
            userId: ctx.session?.user.id,
            clusterIP: input.clusterIP,
        }
    })
  }),

  deleteSnapshotsByIP: protectedProcedure
    .input(z.object({ ipToDelete: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deleteSnaps = await ctx.prisma.snapshot.deleteMany({
        where: {
          clusterIP: {
            equals: input.ipToDelete
          },
        },
      });

      return {
        success: 'deleted',
        data:{
          deleteSnaps
        }
      };
    }),

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
});
