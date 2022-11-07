import {Cart,CartViewProps} from '../types/cart';

export function CartView(props){
    return <div>
        <h1>Cart</h1>
        <ul>
            {props.cart.items.map(item=><li>{item.name}</li>)}
        </ul>
    </div>
}