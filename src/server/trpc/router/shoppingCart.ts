import {router,publicProcedure} from "../trpc";
import {z} from "zod";

export const shoppingCartRouter = router({
  getCustomerCart: publicProcedure.query(async ({ctx}) => {
    let sc = await ctx.prisma.shoppingCart.findFirst({
      where: {
        userId: "1",
        active: true
      },
      include: {
        CartItems: true,
      }
    });
    if(!sc){
      sc = await ctx.prisma.shoppingCart.create({
        data: {
          userId: "1",
          active: true,
          total: "0",
        },
      });
    }
    return sc;
  }),
  createOne: publicProcedure
    .input(z.object({
      userId: z.string().min(1),
      total: z.string().min(1),
    }))
    .mutation(({input,ctx}) => {
      return ctx.prisma.shoppingCart.create({
        data: input,
      });
    }),
  checkOut : publicProcedure
    .input(z.object({
      id : z.string().min(1),
    }))
    .mutation(async ({input,ctx}) => {
      return ctx.prisma.shoppingCart.update({
        where: {
          id: input.id,
        },
        data: {
          active: false,
        },
      });
    }),
  updateCart: publicProcedure
    .input(z.object({
      id: z.string().min(1),
      total: z.string().min(1),
    }))
    .mutation(async ({input,ctx}) => {
      return ctx.prisma.shoppingCart.update({
        where: {
          id: input.id,
        },
        data: {
          total: input.total,
        },
      });
    }),
});