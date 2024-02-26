import React, { createContext, useState, useEffect} from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/products";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try{
            setLoading(true);
            const response = await axios.get(API_URL);
            setProducts(response.data);
        }
        catch (e) {
            if (e.response && e.response.status === 404) {
                setError("No products");
            }
            else{
                setError("Error fetching products");
            }
        }
        finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    const getProductById = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (e) {
            if (e.response && e.response.status === 404) {
                setError(`El producto con el id: ${id} no existe.`, e);
            } else {
            console.error(`Error al obtener el producto ${id}: `, e);
            }
        setLoading(false);
        }
    }

    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            console.log(products)
            await axios.delete(`${API_URL}/${id}`);
            console.log("Product deleted", id);
            
            // FORMA 2: suponemos que no hay nadie que está modificando la tabla también. 
                // NO es buena opción para varios usuarios a la vez en la red realizando cambios 
            await setProducts((prevProducts) => 
                prevProducts.filter((product) => product.id !== id)
            );
            console.log(products)
            // FORMA 1: más lenta (+ peticiones a api), pero nos aseguramos de no perder datos entre peticiones de usuarios
            //getProducts();
        } catch (error) {
            console.error("Error deleting product", error);
        }
        setLoading(false);
    };

    const addProduct = async (product) => {
        try{
            setLoading(true);
            const response = await axios.post(API_URL, product);
            const newProduct = response.data;
            setProducts((prevProducts) => [...prevProducts, newProduct]);
        } catch (e){
            console.error("Error adding product", e);
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id, editedProduct) => {
        try {
            setLoading(true);
            const response = await axios.put(`${API_URL}/${id}`, editedProduct);
            const updatedProduct = {
                ...response.data,
                updatedAt: new Date().toISOString(),
            }
            setProducts((prevProducts) => 
                prevProducts.map((product) =>
                    product.id === id ? updatedProduct : product
                ));
        } catch (error) {
            console.error("Error adding product", error);
        }
        setLoading(false);
    };

    return (
        <ProductsContext.Provider value={{ products, loading, error, getProducts, getProductById, deleteProduct, addProduct, updateProduct }}>
            {children}
        </ProductsContext.Provider>
    )
}