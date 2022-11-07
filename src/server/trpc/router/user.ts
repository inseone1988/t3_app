import {router,publicProcedure} from '../trpc';

export const userRouter = router({
  getOne: publicProcedure.query(({ctx}) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: "1",
      },
    });
  }),
});