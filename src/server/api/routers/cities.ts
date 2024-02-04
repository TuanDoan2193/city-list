import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const citiesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.city.findMany();
  }),
});
