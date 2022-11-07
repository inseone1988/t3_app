import {Cart,CartViewProps} from '../types/cart';

export function CartView(props){

    const list = props.shoppingCart?props.shoppingCart.items.map((item,index) => {
        return <li key={index}>{item.name}</li>
    }):null;

    return <div>
        <h1>Cart</h1>
        <ul>
            {list}
        </ul>
    </div>
}