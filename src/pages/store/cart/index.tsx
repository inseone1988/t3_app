import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../../../utils/trpc";
import { signIn, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {CartView} from "../../../../components/cartview";

const Cart: NextPage = () => {
  const shoppingCart = trpc.shoppingCart.getCustomerCart.useQuery();

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
          <button onClick={() => { console.log(session); signIn() }} className="">
            <FontAwesomeIcon icon={faUser} className={"ml-1 mr-2"} />
            {session ? "Mi cuenta" : "Iniciar sesion"}
          </button>
        </div>
      </nav>
      <main>
        <CartView shoppingCart={shoppingCart} />
      </main>
    </>
  );
};

export default Cart;
