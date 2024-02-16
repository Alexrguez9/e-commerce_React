import React, { useContext } from 'react';
import './CardProduct.css';
import PropTypes from 'prop-types';
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom';

const CardProduct = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const handleAddToCart = () => {
        addToCart(product); 
    };
    
    // product como prop y pasamos product.name, product.price...
    return (
        <div className="card-product">
            <Link key={product.id} to={{
                pathname: `/product/${product.id}`,
                state: { product: product }
            }}>
                <div>
                    <img src={product.image} alt={product.title} />
                    <h3 className='title'>{product.title}</h3>
                </div>
                <div className="rating">
                    <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                </div>
                <div className='price'>
                    <p>{product.price}{'€'}</p>
                </div>
            </Link>
            <div>
                <button className='btn-add-to-cart' onClick={handleAddToCart}>Add to cart</button>
            </div>
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
    }).isRequired
};


export default CardProduct;