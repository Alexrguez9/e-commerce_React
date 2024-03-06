import './Modal.css'
import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
// import { useProducts } from '../customHooks/useProducts';
import { useDispatch } from 'react-redux';
import {
    updateProductThunk,
    getAllProductsThunk,
} from '../redux/reducers/productReducer';

const ProductEditModal = ({ product, closeModal }) => {
    const [editedFields, setEditedFields] = useState({
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

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            ...product,
            ...editedFields
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
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={editedFields.title}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={editedFields.price}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        value={editedFields.description}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Guardar</button>
                </form>
            </div>
        </div>
    );
}
export default ProductEditModal;