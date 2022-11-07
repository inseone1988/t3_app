import {Product} from './product';

export type Cart = {items :CartItem[], total:number, active:boolean, id:string};
export type CartItem = {product:Product, quantity:number};
export type CartViewProps = {cart:Cart, addToCart:(product:Product)=>void, removeFromCart:(product:Product)=>void, clearCart:()=>void, checkout:()=>void};