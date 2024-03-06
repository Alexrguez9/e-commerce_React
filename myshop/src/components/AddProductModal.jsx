import './Modal.css'
import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import {
    addProductThunk,
    getAllProductsThunk
} from '../redux/reducers/productReducer';

const AddProductModal = ({ /*addProduct,*/ closeModal }) => {
    const dispatch = useDispatch();
    const [newProduct, setNewProduct] = useState({
        id: (Math.floor(Math.random() * 1000) + 1).toString(),
        title: '',
        price: 0,
        description: '',
        category: '',
        image: '',
        rating: {
            rate: 0,
            count: 0
        }
    });

    const handleInputChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        // addProduct(newProduct); // with PROVIDER
        dispatch(addProductThunk(newProduct));
        closeModal();
        dispatch(getAllProductsThunk());
    };

    return (
    <div className={'edit-product-admin-modal'}>
            <div className='modal-admin-content'>
                <IoMdClose id="close-menu" onClick={closeModal} style={{ color: 'black' }} />
                <h3 className="modal-admin-title">Añadir Producto</h3>
                <form
                    onSubmit={handleSubmitForm}
                    className="form-modal-container"
                >
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={newProduct.title}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Guardar</button>
                </form>
            </div>
        </div>
    );
}
export default AddProductModal;