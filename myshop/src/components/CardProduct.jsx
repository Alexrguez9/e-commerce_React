import React, { useContext, useState } from 'react';
import './CardProduct.css';
import PropTypes from 'prop-types';
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LuPencil } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import Modal from './Modal';


const CardProduct = ({ product, updateProduct }) => {
    const { addToCart } = useContext(CartContext);
    const { isAuthenticated } = useAuth();
    const handleAddToCart = () => {
        addToCart(product); 
    };
    const {user} = useAuth();
    const [showModal, setShowModal] = useState(false); // State for controlling the modal
    const [isNewProduct, setIsNewProduct] = useState(false); // State for controlling the modal

    const handleAdminEditProduct = () => {
        console.log('Edit product');
        setShowModal(true);
    }

    const handleAdminDeleteProduct = () => {
        console.log('Delete product');
        setShowModal(true);
    }

    const handleAdminNewProduct = () => {
        console.log('New product');
        setIsNewProduct(true);
        setShowModal(true);
    }

    const addNewProduct = (newProduct) => {
        // Aquí deberías agregar la lógica para agregar el nuevo producto al array de productos
        // Por ejemplo:
    }
    
    // product como prop y pasamos product.name, product.price...
    return (
        <div className="card-product">
            {showModal && (
                <Modal product={product} updateProduct={updateProduct} open={showModal} isNewProduct={isNewProduct} addNewProduct={addNewProduct} onClose={() => setShowModal(false)}></Modal>
            )}
            <div className='card-image-and-icons'>
                <img src={product.image} alt={product.title} />
                {user?.role === 'admin' && (
                    <div className='admin-edit-delete-icons'>
                        <LuPencil className='admin-edit-product' onClick={handleAdminEditProduct}/>
                        <RiDeleteBinLine className='admin-delete-product' onClick={handleAdminDeleteProduct}/>
                    </div>
                )}
            </div>
            <Link key={product.id} to={{
                pathname: `/product/${product.id}`,
                state: { product: product }
            }}>
                <h3 className='title'>{product.title}</h3>
                <div className="rating">
                    <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                </div>
                <div className='price'>
                    <p>{product.price}{'€'}</p>
                </div>
            </Link>
            {isAuthenticated && (
                <div>
                    <button className='btn-add-to-cart' onClick={handleAddToCart}>Add to cart</button>
                </div>
            )}
            {user?.role === 'admin' && (
                <button className='btn-new-product' onClick={handleAdminNewProduct}>New product</button>
            )}
        </div>
    );
}

CardProduct.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.shape({
            rate: PropTypes.number.isRequired,
            count: PropTypes.number.isRequired,
          }).isRequired,
    }).isRequired,
    updateProduct: PropTypes.func.isRequired
};


export default CardProduct;