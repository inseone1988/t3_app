import { ProductViewProps } from "../types/product";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser, faInfo, faDeleteLeft, faPencil } from "@fortawesome/free-solid-svg-icons";
import numeral from "numeral";
import { trpc } from "../src/utils/trpc";

import Swal from "sweetalert2";

function ProductsView(props: ProductViewProps) {

  const [view, setView] = useState("gridview");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const { mutate: updateOneProduct } = trpc.product.updateOne.useMutation();
  const { mutate: createOneProduct } = trpc.product.createOne.useMutation();
  const { mutate: deleteP } = trpc.product.deleteOne.useMutation();

  function setProduct(product) {
    setView("productInfo");
    setSelectedProduct(product);
  }

  function deleteProduct() {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteP({ id: selectedProduct.id }, {
          onSuccess: () => {
            Swal.fire(
              "Borrado!",
              "El producto ha sido borrado.",
              "success"
            );
            setView("gridlist");
          }
        });
      }
    });
  }

  function createProduct(){
    setView("editProduct");
    setSelectedProduct({ name: "", description: "", price: 0, stock: 0 ,slug:""});
    setIsNew(true);
  }

  function EditProduct() {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-700">{isNew?"Nuevo":"Editar"} Producto</h1>
        <div className="flex flex-col items-center justify-center">
          <div>
            <label className={"block text-gray-700 text-sm font-bold mb-2"} htmlFor="name">Nombre</label>
            <input onChange={(e)=>updateSelectedProductValue(e)}  className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} defaultValue={selectedProduct?selectedProduct.name:""} type="text" name="name" id="name" />
          </div>
          <div>
            <label className={"block text-gray-700 text-sm font-bold mb-2"} htmlFor="description">Descripcion</label>
            <textarea onChange={(e)=>updateSelectedProductValue(e)} rows={8} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} defaultValue={selectedProduct?selectedProduct.description:""} type="text" name="description" id="description" />
          </div>
          <div>
            <label className={"block text-gray-700 text-sm font-bold mb-2"} htmlFor="price">Precio</label>
            <input onChange={(e)=>updateSelectedProductValue(e)} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} defaultValue={selectedProduct?selectedProduct.price:""} type="text" name="price" id="price" />
          </div>
          <div>
            <label className={"block text-gray-700 text-sm font-bold mb-2"} htmlFor="stock">Exitencias</label>
            <input onChange={(e)=>updateSelectedProductValue(e)} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} defaultValue={selectedProduct?selectedProduct.stock:""} type="text" name="stock" id="stock" />
          </div>
          <div>
            <label className={"block text-gray-700 text-sm font-bold mb-2"} htmlFor="image">Codigo de producto</label>
            <input onChange={(e)=>updateSelectedProductValue(e)} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} defaultValue={selectedProduct?selectedProduct.slug:""} type="text" name="slug" id="slug" />
          </div>
          <div className={"text-center"}>
            <button onClick={()=>setView(isNew?"gridView":"productInfo")} className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
              Cancelar
            </button>
            <button onClick={()=>isNew?createProduct():updateProduct()} className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1"}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    );
  }

  function updateSelectedProductValue(e){
    setSelectedProduct({
      ...selectedProduct,
      [e.target.name]: e.target.value
    });
  }

  function updateProduct() {
    updateOneProduct(selectedProduct, {
      onSuccess: () => {
        Swal.fire(
          "Actualizado!",
          "El producto ha sido actualizado.",
          "success"
        );
        setView("productInfo");
      }
    });
  }

  function ProductInfo() {
    return (
      <div className={"max-w-sm rounded overflow-hidden shadow-lg mt-3"}>
        <div className="grid grid-cols-2">
          <div>
            <img src="https://picsum.photos/300" alt="Product image" />
          </div>
          <div className={"p-3"}>
            <div className="">
              <p className="text-2xl font-bold text-gray-700">{selectedProduct.name}</p>
              <p className={"text-sm"}>{selectedProduct.description}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className={"p-3"}>
            <p className="text-sm font-bold text-gray-700">Precio : {numeral(selectedProduct.price).format("$0.00")}</p>
            <p className="text-sm font-bold text-gray-700">Codigo de producto : {selectedProduct.slug}</p>
            <p className="text-sm font-bold text-gray-700">Existencias : {selectedProduct.stock}</p>
          </div>
          <div className="grid grid-cols-3 items-center text-center">
            <div className={"p-2"}>
              <button onClick={() => setView("gridview")}
                      className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Cancelar
              </button>
            </div>
            <div className={"p-2"}>
              <button onClick={() => deleteProduct()}
                      className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Eliminar
              </button>
            </div>
            <div className={"p-2"}>
              <button onClick={()=>setView("editProduct")} className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Editar</button>
            </div>
          </div>
        </div>
      </div>

    );
  }

  function ProductGridView() {
    return (
      <div className="grid grid-cols-3 gap-4">
        <button onClick={createProduct} className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Crear nuevo producto</button>
        {props.products?.map((product, index) => {
          return (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <img src={`https://picsum.photos/300/100?random=${index}`} alt="" />
              <div className="flex flex-col items-center">
                <div className="w-full h-48 bg-gray-100 rounded-lg"></div>
                <div className="mt-4">
                  <h3 className="text-gray-700 uppercase">{product.name}</h3>
                  <span className="text-gray-500 mt-3">${product.price}</span>
                </div>
              </div>
              <div>
                <div className="text-center">
                  <button onClick={() => setProduct(product)}
                          className="drop-shadow bg-blue-700 p-2 rounded text-center">
                    Informacion
                    <FontAwesomeIcon className="ml-3" icon={faInfo} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function ProductListView() {

    const rows = props.products ? props.products.map((element, index) => {
      return <tr onDoubleClick={() => setView("gridview")} className="hover:bg-gray-100 dark:hover:bg-gray-700">
        <td
          className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{element.name}</td>
        <td
          className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{element.slug}</td>
        <td
          className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{element.stock}</td>
      </tr>;
    }) : <tr>
      <td colSpan={4}>No hay productos para mostrar</td>
    </tr>;

    return <div>
      <h1 className="p-2">Doble click en un producto par editar</h1>
      <table className="rounded table-auto min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700">
        <tr>
          <th
            className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">Nombre
          </th>
          <th
            className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">Codigo
          </th>
          <th
            className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">Existencias
          </th>
        </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
        {rows}
        </tbody>
      </table>
    </div>;
  }

  function whatToDisplay() {
    switch (view) {
      case "gridview":
        return <ProductGridView />;
      case "productInfo":
        return <ProductInfo />;
      case "editProduct":
        return <EditProduct />;
      default :
        return <ProductGridView />;
    }
  }

  return (whatToDisplay());
}

export default ProductsView;