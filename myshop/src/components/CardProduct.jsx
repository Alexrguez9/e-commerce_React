import './CardProduct.css';
import PropTypes from 'prop-types';
import { CartContext } from '../context/CartContext'
import React, { useContext } from 'react';

const CardProduct = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        addToCart(product); 
    };
    
    // product como prop y pasamos product.name, product.price...
    return (
        <div className="card-product">
            <div>
                <img src={product.image} alt={product.title} />
                <h3 className='title'>{product.title}</h3>
                <p>{product.description}</p>
            </div>
            <div className="rating">
                <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            </div>
            <div className='price'>
                <p>{product.price}{'€'}</p>
            </div>
            <div>
                <button className='btn-add-to-cart' onClick={handleAddToCart}>Add to cart</button>
            </div>
        </div>
    );
}

CardProduct.propTypes = {
    product: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.shape({
            rate: PropTypes.number.isRequired,
            count: PropTypes.number.isRequired,
          }).isRequired,
    }).isRequired
};


export default CardProduct;