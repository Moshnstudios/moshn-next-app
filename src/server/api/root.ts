import { formsRoutes } from "~/core/forms/_routes";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  formsRoutes,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
