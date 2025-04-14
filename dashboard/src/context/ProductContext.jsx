
import { createContext, useState, useEffect, useContext } from "react";

const defaultProducts = [
  	{ id: 1, name: "Wireless Earbuds", category: "Electronics", price: 59.99, stock: 143, sales: 1200 },
 	{ id: 2, name: "Leather Wallet", category: "Accessories", price: 39.99, stock: 89, sales: 800 },
  	{ id: 3, name: "Smart Watch", category: "Electronics", price: 199.99, stock: 56, sales: 650 },
  	{ id: 4, name: "Yoga Mat", category: "Fitness", price: 29.99, stock: 210, sales: 950 },
  	{ id: 5, name: "Coffee Maker", category: "Home", price: 79.99, stock: 78, sales: 720 },
]; //productos por defecto que luego insertamos en el localstorage para hacer la simulacion 
//la idea es que se cargan los que estan por defectos(son los unico que por mas que se editen y se eliminen seguiran existiendo)
//los nuevos se cargan normalmente, se editan y se eliminan permanentemente 

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("dashboard_product")) || [];
    const combined = [...saved];

    defaultProducts.forEach((prod) => {
      const exists = saved.some((p) => p.id === prod.id);
      if (!exists) combined.push(prod);
    });//con esto cargamos los defaultproducts dentro del localstorage

    setProducts(combined);
    localStorage.setItem("dashboard_product", JSON.stringify(combined));
  }, []);

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || crypto.randomUUID(),
    };
    const updated = [...products, productWithId];
    setProducts(updated);
    localStorage.setItem("dashboard_product", JSON.stringify(updated));
  };//con esto habilitamos la opcion de agregar productos
  

  const updateProduct = (updatedProduct) => {
    const updated = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updated);
    localStorage.setItem("dashboard_product", JSON.stringify(updated));
  };// simplemente para actualizar

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("dashboard_product", JSON.stringify(updated));
  };//simplemente para eliminar

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};


export const useProductContext = () => useContext(ProductContext);

//esta seria la logica para crear eliminar y editar productos.
//llamada en lista de productos