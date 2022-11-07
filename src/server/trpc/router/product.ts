import {z} from 'zod';
import {router,publicProcedure} from '../trpc';

export const productRouter = router({
  getAll: publicProcedure.query(({ctx}) => {
    return ctx.prisma.product.findMany();
  }),
  createOne: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      price: z.string().min(1),
      stock: z.string().min(1),
      slug: z.string().min(1),
    }))
    .mutation(({input,ctx}) => {
      return ctx.prisma.product.create({
        data: input,
      });
    }),
  deleteOne: publicProcedure
    .input(z.object({
      id: z.string().min(1),
    }))
    .mutation(({input,ctx}) => {
      return ctx.prisma.product.delete({
        where: {
          id: input.id,
        },
      });
    }),
  updateOne: publicProcedure
    .input(z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      description: z.string().min(1),
      price: z.string().min(1),
      stock: z.string().min(1),
      slug: z.string().min(1),
    }))
    .mutation(({input,ctx}) => {
      return ctx.prisma.product.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),
});

