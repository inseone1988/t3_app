import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart,faUser } from "@fortawesome/free-solid-svg-icons";

import { trpc } from "../../../utils/trpc";
import { useSession,signIn } from "next-auth/react";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Welcome to my awesome store</title>
            </Head>
            <div className="container w-full flex items-center justify-center h-screen">
                <div className="rounded border-solid border-2 border-gray-200 p-3 w-80">
                    <h1 className="text-lg font-bold text-center text-indigo-600">My awesome store</h1>
                    <h4 className="text-bold text-center font-bold">Iniciar sesion</h4>
                    <form className="flex flex-col gap-2 mt-3">
                        <input type="text" className="border-solid border-2 border-gray-200 p-2 rounded" placeholder="Correo electronico" />
                        <input type="password" className="border-solid border-2 border-gray-200 p-2 rounded" placeholder="Contraseña" />
                        <div className="w-full flex items-center justify-center text-center">
                            <span className="text-sm mr-2 mt-2 mb-2">¿Aun no estas registrado?</span>
                            <Link onClick={()=>signIn()} href="/store/register" className="text-blue-500 text-sm ">
                                Crear cuenta
                            </Link>
                        </div>
                        <button className="bg-indigo-600 text-white p-2 rounded">Iniciar sesion</button>
                        
                    </form>
                </div>
            </div>
        </>
    );
}

export default Home;