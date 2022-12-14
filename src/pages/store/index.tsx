import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart,faUser } from "@fortawesome/free-solid-svg-icons";

import { trpc } from "../../utils/trpc";
import { useSession, signIn } from "next-auth/react";
import { Product } from "../../../types/product";
import numeral from "numeral";

import {useState} from "react";
import { Cart } from "../../../types/cart";

const Home: NextPage = () => {
  const products = trpc.product.getAll.useQuery();
  const user = trpc.user.getOne.useQuery({id:"1"});
  const sCart = trpc.shoppingCart.getCustomerCart.useQuery();
  const { data: session } = useSession();
  const {mutate: saveCartItem} = trpc.cartItem.addCartItem.useMutation();
  const [cart, setCart] = useState<Cart>({ id: "", items: [], total: 0,active:true});
  const [itemcount, setItemcount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const {mutate: updateCart} = trpc.shoppingCart.updateCart.useMutation();

  function addToCart(product: Product) {
    console.log(sCart.data);
    if (sCart.data) {
      saveCartItem({cartId: sCart.data.id, productId: product.id,quantity:1}, {
        onSuccess: (data) => {
          console.log(data);
          sCart.data.total = `${Number(sCart.data.total) + Number(product.price)}`;
          sCart.data.CartItems.push(data);
          updateCart({id: sCart.data.id,total:sCart.data.total}, {
            onSuccess: (data) => {
              setCart(data);
              setItemcount(sCart.data.CartItems.length);
              setTotal(data.total);
            }
          });
        }
      });
    }
  }

  const rows = products.data?products.data.map((product:Product,index:number) => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg" key={index}>
        <img className="w-full" src={"https://picsum.photos/200/100?random="+ (index+1)} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <div className="font-bold text-sm mb-2 h-10">{product.name}</div>
          <p className="text-gray-700 text-xs h-10">
            {product.description.substring(0,50) + " ..."}
          </p>
          <p className={Number(product.stock)>1?"text-teal-700 h-8 mt-2":"text-red-700 h-8 mt-2"}>{Number(product.stock)>1?`En stock : ${product.stock}`:"Agotado"}</p>
          <h4 className="text-xl font-bold text-center text-blue-800">
             {numeral(product.price).format("$0.00")}
          </h4>
          <button onClick={()=>addToCart(product)} className={`mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-3 text-sm ${product.stock>1? "":"hidden"}`}>
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
              <span className="ml-2">Carrito <span className="rounded-full bg-gray-500 p-1 text-white">{numeral(total).format("$0.00")}</span></span>
          </Link>
          <button onClick={()=>{console.log(session);signIn()}} className="">
            <FontAwesomeIcon icon={faUser}  className={"ml-1 mr-2"}/>
            {session ? "Mi cuenta" : "Iniciar sesion"}
          </button>
        </div>
      </nav>
      <main className="container mx-auto flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="grid grid-cols-1 sm grid-cols-2 md grid-cols-3 lg grid-cols-6 xl grid-cols-6 gap-4">
            {rows}
          </div>
        </div>
      </main>
    </>
  );
};


export default Home;
