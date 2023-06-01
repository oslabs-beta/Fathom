import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { snapshotRouter } from "~/server/api/routers/snapshot"
import { clusterIPRouter } from "./routers/clusterIP";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  snapshot: snapshotRouter,
  clusterIP: clusterIPRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
