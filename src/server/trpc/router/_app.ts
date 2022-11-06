import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { productRouter } from "./product";
import { shoppingCartRouter } from "./shoppingCart";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  product: productRouter,
  shoppingCart: shoppingCartRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
