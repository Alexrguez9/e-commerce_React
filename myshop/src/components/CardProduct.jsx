import React, { useContext, useState, useEffect } from 'react';
import './CardProduct.css';
import PropTypes from 'prop-types';
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LuPencil } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import Modal from './Modal';
import { useProducts } from '../customHooks/useProducts.js';

const Loader = () => {
    return <div className='spinner'>Cargando...</div>;
};


const CardProduct = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { isAuthenticated } = useAuth();
    const handleAddToCart = () => {
        addToCart(product); 
    };
    const {user} = useAuth();

    const { 
        products, 
        editProduct,
        deleteProduct,
        createProcuct,
        handleSave,
        form,
        setform,
        loading,
        error,
        setError,
        showModal,
        setShowModal,
    } = useProducts();

    // useEffect solo se ejecuta cuando se ha modificado el estado de error
    useEffect(() => {
        if (error) {
            alert(error);
            setError(null);
        }
    }, [setError]);

    if (loading) {
        return <Loader />;
    }

    const handleAdminEditProduct = () => {
        console.log('Edit product', product.id);
        handleSave(product.id);
    }

    const handleAdminDeleteProduct = () => {
        console.log(product);
        console.log('Delete product');
        deleteProduct(product.id);
    }

    const handleAdminNewProduct = () => {
        console.log('New product');
        handleSave(null);
    }
    
    // product como prop y pasamos product.name, product.price...
    return (
        <div className="card-product">
            {showModal && (
                <Modal product={product} open={showModal} form={form} onClose={() => setShowModal(false)}></Modal>
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



export default CardProduct;