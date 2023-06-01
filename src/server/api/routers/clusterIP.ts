import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const clusterIPRouter = createTRPCRouter({   
    getAll: publicProcedure.query(({ctx}) => {
        return ctx.prisma.clusterIP.findMany();
    }),
    createNew: protectedProcedure.input(z.object({clusterIP: z.string()})) 
    .mutation(({ctx,input})=> {
        return ctx.prisma.clusterIP.create({
            data: {
                ipAddress: input.clusterIP,
                userId: ctx.session?.user.id,
            }
        })
    })
})