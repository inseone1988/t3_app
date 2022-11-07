import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { trpc } from "../../../utils/trpc";
import { useSession, signIn } from "next-auth/react";
import numeral from "numeral";
import ProductsView from "../../../../components/productsview";
import {Product} from "../../../../types/product";


const Home: NextPage = () => {

    const { data: products } = trpc.product.getAll.useQuery();
    const { data: session } = useSession();

    function onProductSelect(product:Product){

    }

    return (
        <>
            <Head>
                <title>Productos</title>
            </Head>
            <nav
                className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
                <div className="mb-2 sm:mb-0 ml-3">
                    <Link href="/">
                        My awesome store
                    </Link>
                </div>
                <div className={"mr-3"}>
                </div>
            </nav>
            <main>
                <div className="container mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-4xl font-bold text-gray-700">Productos</h1>
                        <ProductsView products={products} onProductSelected={onProductSelect} />
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home;