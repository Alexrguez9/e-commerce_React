// productReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllProductsAPI,
    addProductAPI,
    updateProductAPI,
    deleteProductAPI
} from "../../api/products.js";

// Thunks
export const getAllProductsThunk = createAsyncThunk(
    "products/getAllProducts", 
    async () => {
        try {
            const products = await getAllProductsAPI();
            // Convertir las identificaciones de cadena a números
            const productsWithNumericIds = products.map(product => ({...product, id: parseInt(product.id)}));
            console.log('productsWithNumericIds', productsWithNumericIds);
            return productsWithNumericIds;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const addProductThunk = createAsyncThunk(
    "products/addProduct", 
    async (newProduct) => {
        console.log('form enviado2', newProduct);
        return await addProductAPI(newProduct);
    }
);

export const updateProductThunk = createAsyncThunk(
    "products/updateProduct",
    async (updatedProduct) => {
        try {
            return await updateProductAPI(updatedProduct);
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const deleteProductThunk = createAsyncThunk(
    "products/deleteProduct",
    async (productId, { dispatch }) => { // Agrega { dispatch } al segundo argumento: ARREGLA EL PROBLEMA DE QUE NO SE MUESTRA EN LA UI EL CAMBIO
        try {
            const response = await deleteProductAPI(productId);
            dispatch(getAllProductsThunk()); // Despachar la acción para obtener todas las tareas actualizadas
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);


// Slice
const initialState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProductsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload; // internamente redux hace la copia del estado, nosotros hacemos la mutación directa
            })
            .addCase(addProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                // state.products.push(action.payload);
                const addedProduct = action.payload;
                state.products = [...state.products, addedProduct];
            })
            .addCase(addProductThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Error al crear el producto.';
            })
            .addCase(updateProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.map((product) =>
                  product.id === action.payload.id ? action.payload : product
                );
            })
            .addCase(updateProductThunk.rejected, (state, action) => {
                state.loading = false;
                const id = action.meta.arg;
                if (action.error.response && action.error.response.status === 404) {
                    state.error = `Producto con id ${id} no existe.`;
                } else {
                    state.error = `Error al actualizar el producto con id ${id}.`;
                }
            })
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter((product) => product.id !== action.payload);
            })
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                }
            );
    }

});

export const { fetchAllProducts, addProduct, deleteProduct } = productSlice.actions;

export const getAllProducts = (state) => state.products.products;
export const getProductsLoading = (state) => state.products.loading;
export const getProductsError = (state) => state.products.error;

export default productSlice.reducer;