import {router,publicProcedure} from "../trpc";

export const shoppingCartRouter = router({
  getCustomerCart: publicProcedure.query(({ctx}) => {
    const session = ctx.session;
    if (session) {
      return ctx.prisma.shoppingCart.findMany({
        where: {
          userId: session.user.id
        }
      });
    }
  })
});