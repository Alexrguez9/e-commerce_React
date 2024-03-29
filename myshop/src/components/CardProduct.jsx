import React, { useContext, useState, useEffect } from 'react';
import './CardProduct.css';
import PropTypes from 'prop-types';
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LuPencil } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
// import { useProducts } from '../customHooks/useProducts.js';

import ProductEditModal from './ProductEditModal.jsx';
import { useDispatch, useSelector } from 'react-redux';

// import thunks and selectors from reducer for dispatch actions
import {
    getProductsError,
    getProductsLoading,
    deleteProductThunk,
} from '../redux/reducers/productReducer';

const Loader = () => {
    return <div className='spinner'>Cargando...</div>;
};


const CardProduct = ({ product }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addToCart } = useContext(CartContext);
    const { isAuthenticated } = useAuth();

    const dispatch = useDispatch();
    const loading = useSelector(getProductsLoading);
    const error = useSelector(getProductsError);

    const handleAddToCart = () => {
        addToCart(product); 
    };
    const {user} = useAuth();
/* with PROVIDER
    const { 
        deleteProduct, loading
    } = useProducts();
*/
    const handleToggleDelete = async () => {
        if (!loading){
            dispatch(deleteProductThunk(product.id));
        }
    }

    if (loading) {
        return <Loader />;
    }
    
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    
    // product como prop y pasamos product.name, product.price...
    return (
        <div className="card-product">
            <div className='card-image-and-icons'>
                <img src={product.image} alt={product.title} />
                {user?.role === 'admin' && (
                    <div className='admin-edit-delete-icons'>
                        <LuPencil className='admin-edit-product' onClick={openModal}/>
                        <RiDeleteBinLine className='admin-delete-product' onClick={handleToggleDelete}/>
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
            {isModalOpen && (
                <ProductEditModal product={product} closeModal={closeModal} />
            )}
            
        </div>
    );
}



export default CardProduct;