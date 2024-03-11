import './Modal.css'
import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import {
    addProductThunk,
    getAllProductsThunk
} from '../redux/reducers/productReducer';
import { useForm } from 'react-hook-form';

const AddProductModal = ({ /*addProduct,*/ closeModal }) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        clearErrors,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit((data) => {
        // addProduct(newProduct); // with PROVIDER
        data = {...data, rating: {rate: 0, count: 0}};
        dispatch(addProductThunk(data));
        closeModal();
        dispatch(getAllProductsThunk());
    });

    return (
    <div className={'edit-product-admin-modal'}>
            <div className='modal-admin-content'>
                <IoMdClose id="close-menu" onClick={closeModal} style={{ color: 'black' }} />
                <h3 className="modal-admin-title">Añadir Producto</h3>
                <form
                    onSubmit={onSubmit}
                    className="form-modal-container"
                >
                    <div className="form-field">
                        <label>
                            Title
                            <input
                                type="text"
                                {...register("title", { 
                                    required: "Por favor, introduce un título",
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
                    <div className="form-field">
                        <label>
                            Category
                            <input
                                type="text"
                                {...register("category", { 
                                    required: "Por favor, introduce una categoría.",
                                    minLength: {
                                        value: 3,
                                        message: "La categoría debe tener al menos 3 caracteres"
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "La categoría debe tener menos de 100 caracteres"
                                    }
                                })}
                            />
                            {errors.category && <span>{errors.category.message}</span>}
                        </label>
                    </div>
                    <div className="form-field">
                        <label>
                            Image URL
                            <input
                                type="text"
                                {...register("image", { 
                                    required: "Por favor, introduce la URL de la imagen",
                                    pattern: {
                                        value: /^(ftp|http|https):\/\/[^ "]+$/,
                                        message: "Por favor, introduce una URL válida"
                                    }
                                })}
                            />
                            {errors.image && <span>{errors.image.message}</span>}
                        </label>
                    </div>
                    <button type="submit">Guardar</button>
                </form>
            </div>
        </div>
    );
}
export default AddProductModal;