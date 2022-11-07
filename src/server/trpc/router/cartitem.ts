import {router,publicProcedure} from '../trpc';
import {z} from 'zod';
export const cartItemRouter = router({
  addCartItem: publicProcedure
    .input(z.object(
      {
        cartId: z.string().min(1),
        productId: z.string().min(1),
        quantity: z.number().min(1),
        }
    ))
    .mutation(async ({input,ctx}) => {
      return ctx.prisma.cartItems.create({
        data: input,
        include: {
          product: true,
        }
      });
    }),
});