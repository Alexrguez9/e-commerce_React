import { useState, useEffect } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API_URL = "http://localhost:3000/products";

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        price: "",
        title: "",
        description: "",
        id: null,
      });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [isNewProduct, setIsNewProduct] = useState(false);
    const [showModal, setShowModal] = useState(false); // hace que podamos mostrarlo despues de haber obtenido datos

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(API_URL);
                setProducts(response.data);
                // Simular un error 404 al obtener los productos
                // const errorResponse = { response: {status: 404} };
                // throw await Promise.reject(errorResponse);
                // Simular un error 400
                // const errorResponse = { response: {status: 400} };
                // throw await Promise.reject(errorResponse);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError("No products");
                } else {
                    setError("Error fetching products");
                }
            } finally {
                // simular tiempos de carga
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };
        getProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${API_URL}/${id}`);
            // FORMA 2: suponemos que no hay nadie que está modificando la tabla también. 
                // NO es buena opción para varios usuarios a la vez en la red realizando cambios 
            setProducts((prevProducts) => 
                prevProducts.filter((product) => product.id !== id)
            );
            // FORMA 1: más lenta (+ peticiones a api), pero nos aseguramos de no perder datos entre peticiones de usuarios
            //getProducts();
        } catch (error) {
            console.error("Error deleting product", error);
        }
        setLoading(false);
    }

    const handleSave = (id) => {
        if (id != null) {
            console.log("hola1", id);
            editProduct(id);
        } else {
            console.log("hola2", id);
            createProcuct();
            setIsNewProduct(false);
        }
    }

    const createProcuct = async () => {
            setForm({ id: null, title: "", price: "" });
            setShowModal(true);
    };

    const editProduct = async (id) => {
            const filteredProduct = products.filter((product) => product.id === id);
            console.log("filteredProduct", filteredProduct[0]);

            setForm({
                price: filteredProduct[0].price,
                title: filteredProduct[0].title,
                description: filteredProduct[0].description,
                id: filteredProduct[0].id,
            });
            setShowModal(true);
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
    
        if (isNewProduct) {
          const newProduct = {
            id: uuidv4(),
            title: form.title,
            price: form.price,
            description: form.description,
            image: "https://via.placeholder.com/150/92c952",
          };
    
          try {
            await axios.post(API_URL, newProduct);
            setProducts((prevProducts) => [...prevProducts, newProduct]);
            setShowModal(false);
          } catch (error) {
            console.error("Error creating product", error);
          }
        }
        else {
            
            const updatedProduct = {
                id: form.id,
                title: form.title,
                price: form.price,
                description: form.description,
            };
            try {
                await axios.put(`${API_URL}/${form.id}`, updatedProduct);
                setProducts((prevProducts) => {
                    const newProducts = prevProducts.map((product) => {
                    if (product.id === form.id) {
                        return updatedProduct;
                    }
                    return product;
                    });
                return newProducts;
            });

            } catch (error) {
            console.error("Error updating product", error);
            }
        }
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("name", name);
        setForm({ ...form, [name]: value });
    };

    const handleEditProductDetails = (id, title, price, description) => {
        const selectedProduct = products.find((product) => product.id === id);
        setForm({ ...selectedProduct, title, price, description, id });
    }


    return {
        products,
        editProduct,
        createProcuct,
        deleteProduct,
        handleInputChange, 
        handleSave,
        handleEditProductDetails,
        loading,
        error,
        form,
        setForm,
        isNewProduct, 
        setIsNewProduct,
        handleSubmitForm, 
        showModal,
        setShowModal,
    };

}
