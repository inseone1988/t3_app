import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart,faUser } from "@fortawesome/free-solid-svg-icons";

import { trpc } from "../../utils/trpc";
import { useSession, signIn } from "next-auth/react";
import { Product } from "../../../types/product";

const Home: NextPage = () => {
  const products = trpc.product.getAll.useQuery();
  const { data: session } = useSession();

  const rows = products.data?products.data.map((product:Product) => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={"https://placeimg.com/640/480/tech"} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <div className="font-bold text-l mb-2">{product.name}</div>
          <p className="text-gray-700 text-sm">
            {product.description}
          </p>
          <p className={Number(product.stock)>1?"text-teal-700":"text-red-700"}>{Number(product.stock)>1?`En stock : ${product.stock}`:"Agotado"}</p>
          <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-3 text-sm">
            Agregar a carrito +
            <FontAwesomeIcon icon={faShoppingCart} className={"ml-1 mr-2"} />
          </button>
        </div>
      </div>
    );
  }) : <h1>Opps... something should be already here X|</h1>;

  return (
    <>
      <Head>
        <title>Welcome to my awesome store</title>
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
          <button onClick={()=>{console.log(session);signIn()}} className="">
            <FontAwesomeIcon icon={faUser}  className={"ml-1 mr-2"}/>
            {session ? "Mi cuenta" : "Iniciar sesion"}
          </button>
        </div>
      </nav>
      <main className="container mx-auto flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="grid grid-cols-1 sm grid-cols-2 md grid-cols-3 lg grid-cols-4 xl grid-cols-5 gap-4">
            {rows}
          </div>

        </div>
      </main>
    </>
  );
};


export default Home;
