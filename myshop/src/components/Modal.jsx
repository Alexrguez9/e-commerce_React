// Modal for displaying the edit form for products (for admins)
import './Modal.css'
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useProducts } from '../customHooks/useProducts';

const Modal = ({ open, onClose, product }) => {

    const {
        handleInputChange,
        handleSave,
        form,
    } = useProducts();


    const handleSubmitForm = (e) => {
        e.preventDefault();
        handleSave();
        console.log('Formulario enviado');
        onClose();
    }


    return (
        <div className={`edit-product-admin-modal ${open ? 'open' : ''}`}>
            <div className='modal-admin-content'>
                <IoMdClose id="close-menu" onClick={onClose} style={{ color: 'black' }} />
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
                        value={form.title}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={form.price}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Guardar</button>
                </form>
            </div>
        </div>
    );
}

export default Modal;