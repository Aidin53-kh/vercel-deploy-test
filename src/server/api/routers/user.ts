import { z } from "zod";
import { PrismaClient } from "@prisma/client";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const prisma = new PrismaClient();       
export const userRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({ username: z.string().min(4, "username most be more then 3 charecter") }))
        .mutation(async ({ input, ctx}) => {
            try {
                await prisma.user.create({ data: { username: input.username } });
                return { status: 201, message: "user created" };
            } catch {
                return { status: 500, message: "internal sever error" };
            }
        }),

    findAll: publicProcedure.query(async () => {
        console.log("aidin53")
        let f = await prisma.user.findMany();
        console.log({f})
        return f;
    }),

    findById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
        return await prisma.user.findUnique({ where: { id: input.id } });
    }),

    deleteById: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
        return await prisma.user.delete({ where: { id: input.id } });
    }),

    editById: publicProcedure
        .input(z.object({ username: z.string().min(4, "username most be more then 3 charecter"), id: z.string() }))
        .mutation(async ({ input }) => {
            return await prisma.user.update({ where: { id: input.id }, data: { username: input.username } });
        }),
});
