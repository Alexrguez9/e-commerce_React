// products.js
import axios from 'axios';
const API_URL = 'http://localhost:3000/products';

export const getAllProductsAPI = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const addProductAPI = async (newProduct) => {
    try {
        const response = await axios.post(API_URL, newProduct);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateProductAPI = async (updatedProduct) => {
    try {
        const response = await axios.put(`${API_URL}/${updatedProduct.id}`, updatedProduct);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteProductAPI = async (productId) => {
    try {
        const response = await axios.delete(`${API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};
