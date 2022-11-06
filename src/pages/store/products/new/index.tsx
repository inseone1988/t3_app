import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

import { trpc } from "../../../../utils/trpc";
import { useSession, signIn } from "next-auth/react";
import { SyntheticEvent } from "react";

const Home: NextPage = () => {

    const { data: session } = useSession();
    type Product = {name:string, price:number,stock:number, description:string, image:string, slug:string}
    const productData = {} as Product;
    const [product, setProduct] = useState(productData);
    const {mutate:createProduct} = trpc.product.createOne.useMutation();
    
    function changeListener(e:SyntheticBaseEvent) {
        console.log(productData);
        productData[e.target.name] = e.target.value;
    }

    function setValue(target: EventTarget & HTMLInputElement) {
        product[target.name] = target.value;
        return product;
    }

    return (
        <>
            <Head>
                <title>Creacion de productos</title>
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
            <main className="container mx-auto flex-col items-center justify-center p-4">
                <div className="flex flex-col items-center justify-center gap-2">
                    <h1 className="text-4xl font-bold text-gray-800">Creacion de productos</h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex flex-col items-center justify-center gap-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nombre</label>
                            <input onChange={(e)=>setProduct(setValue(e.target))} type="text" name="name" id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-online" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Descripcion</label>
                            <input onChange={(e)=>setProduct(setValue(e.target))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-online" type="text" name="description" id="description" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">SKU / EAN / UPC / SLUG</label>
                            <input onChange={(e)=>setProduct(setValue(e.target))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-online" type="text" name="slug" id="sku" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Precio</label>
                            <input onChange={(e)=>setProduct(setValue(e.target))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-online" type="number" name="price" id="price" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">Stock</label>
                            <input onChange={(e)=>setProduct(setValue(e.target))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-online" type="number" name="stock" id="stock" />
                        </div>
                        <button onClick={() => { 
                            createProduct(product);
                             }}>Crear producto</button>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;

