import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../../../utils/trpc";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
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
      </nav>
    </>
  );
};

export default Home;
