import './Modal.css'
import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
// import { useProducts } from '../customHooks/useProducts';
import { useDispatch } from 'react-redux';
import {
    updateProductThunk,
    getAllProductsThunk,
} from '../redux/reducers/productReducer';
import { useForm } from 'react-hook-form';

const ProductEditModal = ({ product, closeModal }) => {
    const [editedFields, setEditedFields] = useState({
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image
    });

    const {
        register,
        handleSubmit,
        watch,
        clearErrors,
        setError,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            title: product.title,
            price: product.price,
            description: product.description,
            image: product.image
        }
    });

    reset({
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image
    });

    // const { updateProduct } = useProducts();
    const dispatch = useDispatch();
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'price' ? parseFloat(value) : value;
        setEditedFields((prevFields) => ({
            ...prevFields,
            [name]: newValue
        }));
    };

    const handleSubmitForm = async (data) => {


        const updatedProduct = {
            ...product,
            ...data
        };

        dispatch(updateProductThunk(updatedProduct));
        // await updateProduct(product.id, updatedProduct); // with PROVIDER
        console.log('Updated product');
        dispatch(getAllProductsThunk());
        closeModal();
    };

    
    return (
    <div className={'edit-product-admin-modal'}>
            <div className='modal-admin-content'>
                <IoMdClose id="close-menu" onClick={closeModal} style={{ color: 'black' }} />
                <h3 className="modal-admin-title">Modificar Producto</h3>
                <form
                    onSubmit={handleSubmitForm}
                    className="form-modal-container"
                >
                    <div className="form-field">
                        <label>
                            Title
                            <input
                                type="text"
                                {...register("title", { 
                                    required: "Por favor, introduce un titulo",
                                    minLength: {
                                        value: 3,
                                        message: "El nombre debe tener al menos 3 caracteres"
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "El nombre debe tener menos de 40 caracteres"
                                    }
                                })}
                            />
                            {errors.title && <span>{errors.title.message}</span>}
                        </label>
                    </div>
                    <div className="form-field">
                        <label>Price</label>
                        <input
                            type="text"
                            {...register("price", {
                                required: "Por favor, introduce el precio",
                                min: {
                                    value: 0.01,
                                    message: "El precio debe ser mayor que 0"
                                },
                            })}
                        />
                        {errors.price && <span>{errors.price.message}</span>}
                    </div>
                    <div className="form-field">
                        <label>
                            Description
                            <textarea
                                type="text"
                                {...register("description", { 
                                    required: "Por favor, introduce una descripción.",
                                    minLength: {
                                        value: 3,
                                        message: "La descripción debe tener al menos 3 caracteres"
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "La descripción debe tener menos de 100 caracteres"
                                    }
                                })}
                            />
                            {errors.description && <span>{errors.description.message}</span>}
                        </label>
                    </div>
                    <button type="submit">Guardar</button>
                </form>
            </div>
        </div>
    );
}
export default ProductEditModal;