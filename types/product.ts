/**
 * Basic product type
 */

export type Product = {name:string, price:number,stock:number, description:string, image:string, slug:string};
export type ProductViewProps = {products:Product[],onProductSelected:(product:Product)=>void, onProductDeleted:(product:Product)=>void,onProductEdited:(product:Product)=>void};
// export default Product;