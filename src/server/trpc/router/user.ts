import {router,publicProcedure} from '../trpc';
import {z} from 'zod';

export const userRouter = router({
  getOne: publicProcedure
    .input(z.object({
      id: z.string().min(1),
    }))
    .query(async ({input,ctx}) => {
      let user = await ctx.prisma.user.findUnique({
        where: input,
      });
      if(!user) {
        user = await ctx.prisma.user.create({
          data: {
            id: input.id,
            email: "abigailquijano@globalpaq.mx",
            name: "Abigail Quijano",
            emailVerified: new Date(),
          }
        })
      }
    return user;
  }),
});