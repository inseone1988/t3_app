import {Product} from './product';

export type Cart = {items :CartItem[], total:number, active:boolean,userId:string, id:string};
export type CartItem = {product:Product, quantity:number,userId:string, id:string, cartId:string};
export type CartViewProps = {cart:Cart, addToCart:(product:Product)=>void, removeFromCart:(product:Product)=>void, clearCart:()=>void, checkout:()=>void};