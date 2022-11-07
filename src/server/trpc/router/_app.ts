import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { productRouter } from "./product";
import { shoppingCartRouter } from "./shoppingCart";
import {userRouter} from "./user";
import {cartItemRouter} from "./cartItem";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  product: productRouter,
  shoppingCart: shoppingCartRouter,
  user: userRouter,
  cartItem : cartItemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
