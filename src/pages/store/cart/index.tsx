import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../../../utils/trpc";
import { signIn, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { CartView } from "../../../../components/cartview";
import Swal from "sweetalert2";

const Cart: NextPage = () => {
  const { data: user } = trpc.user.getOne.useQuery({ id: "1" });
  const { data: shoppingCart } = trpc.shoppingCart.getCustomerCart.useQuery();
  const { data: cartItems } = trpc.cartItem.getCartItems.useQuery({ cartId: shoppingCart?.id });
  const { mutate: checkOut } = trpc.shoppingCart.checkOut.useMutation();
  const [cart, setCart] = useState(shoppingCart);

  function checkout() {
    checkOut({ id: shoppingCart.id }, {
      onSuccess: (data) => {
        Swal.fire({
          title: "Success!",
          text: "Your order has been placed!",
          icon: "success",
          confirmButtonText: "Ok"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location = "/store";
          }
        });
      }
    });
  }

  return (
    <>
      <Head>
        <title>Carrito de compras</title>
      </Head>
      <nav
        className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
        <div className="mb-2 sm:mb-0 ml-3">
          <Link href="/">
            My awesome store
          </Link>
        </div>
        <div className={"mr-3"}>
          <Link href="/store/cart" className="mr-3 border-solid border-2 border-indigo-600 p-2 rounded-full">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="ml-2">Carrito <span className="rounded-full bg-gray-500 p-1 text-white">0</span></span>
          </Link>
          <button className="">
            <FontAwesomeIcon icon={faUser} className={"ml-1 mr-2"} />
            <span className="ml-2">{user ? user.name : "Iniciar sesion"}</span>
          </button>
        </div>
      </nav>
      <main>
        <div>
          <h1 className={"text-center text-4xl font-bold"}>Carrito de compra</h1>
        </div>
        <CartView checkout={checkout} shoppingCart={shoppingCart} cartItems={cartItems} />
      </main>
    </>
  );
};

export default Cart;
