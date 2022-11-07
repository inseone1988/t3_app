import {Cart,CartViewProps} from '../types/cart';
import {useState,useEffect} from 'react';
import numeral from 'numeral';

export function CartView(props){

    const rows = props.cartItems?.map((item,index) => {
        return(
          <tr key={index} className={"text-center shadow"}>
              <td>
                  <div className="grid grid-cols-2">
                      <div>
                          <img src="https://picsum.photos/100" alt="product_image" />
                      </div>
                      <div>
                          <p className={"text-sm font-bold"}>{item.product.name}</p>
                          <p className={"text-xs"}>{item.product.description}</p>
                      </div>
                  </div>
              </td>
              <td className={"text-teal-500 font-bold"}>{item.quantity}</td>
              <td className={"text-teal-500 font-bold"}>{item.product.price}</td>
              <td className={"text-teal-500 font-bold"}>{numeral((Number(item.product.price) * Number(item.quantity))).format("$0.00")}</td>
          </tr>
        );
    });

    return (
    <div className={"container mx-auto px-8"}>
        <div className={"max-w-md rounded overflow-hidden shadow-lg"}>
            <div className={"px-6 py-4"}>
                <div className={"font-bold text-xl mb-2"}>Detalle de venta</div>
            </div>
            <table className={"table-auto w-full"}>
                <thead>
                    <tr>
                        <th style={{ "width": "300px" }}>Item</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
                <tfoot>
                    <tr className={"text-align-end"}>
                        <td colSpan={2} className={"text-right font-bold"}></td>
                        <td className={"text-right text-xl font-bold"}>Total</td>
                        <td className={"text-teal-500 text-xl font-bold"}>{numeral(props.shoppingCart?.total).format("$0.00")}</td>
                    </tr>
                    <tr>
                        <td colSpan={3}></td>
                        <td className={"text-align-end"}>
                            <button onClick={props.checkout} className={"w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
                                Pagar
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    )
}