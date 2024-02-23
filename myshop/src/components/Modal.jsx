// Modal for displaying the edit form for products (for admins)
import './Modal.css'
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";

const Modal = ({ open, onClose, product, updateProduct, isNewProduct, addNewProduct }) => {

    const [form, setForm] = useState({
            title: isNewProduct ? '': product.title,
            price: isNewProduct ? '': product.price,
            description: isNewProduct ? '': product.description
    });

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (isNewProduct) {
            console.log('Adding new product:', form);
            // TODO: new product with axios in API
            addNewProduct(form);
        } else {
            console.log('Updating product:', form);
            updateProduct(product.id, form);
        }
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
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                        />
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                        />
                        <label htmlFor="description">Description</label>
                        <textarea
                            type="text"
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                        <button type="submit">Guardar</button>
                    </form>
                </div>
                
        </div>
    );
}

export default Modal;