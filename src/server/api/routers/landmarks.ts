import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const landmarksRouter = createTRPCRouter({
  getLandmarksByCityId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const landmarks = await ctx.db.landmark.findMany({
        where: { cityId: input.id },
      });

      console.log(landmarks);

      if (!landmarks) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "City not found",
        });
      }

      return landmarks;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.city.findMany();
  }),
});
