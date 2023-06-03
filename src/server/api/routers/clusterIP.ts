import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const clusterIPRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.clusterIP.findMany({
      where: {
        userId: {
          equals: ctx.session?.user.id,
        },
      },
    });
  }),
  createNew: protectedProcedure.input(z.object({ clusterIP: z.string() })).mutation(
    ({ ctx, input }) => {
      return ctx.prisma.clusterIP.create({
        data: {
          ipAddress: input.clusterIP,
          userId: ctx.session?.user.id,
        },
      });
    }
  ),
  deleteIP: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deletedClusterIP = await ctx.prisma.clusterIP.delete({
        where: {
          id: input.id,
        },
      });

      return {
        success: Boolean(deletedClusterIP),
        deletedClusterIP,
      };
    }),
});
