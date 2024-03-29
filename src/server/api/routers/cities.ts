import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const citiesRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const city = await ctx.db.city.findUnique({ where: { id: input.id } });

      if (!city) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "City not found",
        });
      }

      const landmarks = await ctx.db.landmark.findMany({
        where: { cityId: input.id },
      });

      return { ...city, landmarks };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.city.findMany();
  }),
});
