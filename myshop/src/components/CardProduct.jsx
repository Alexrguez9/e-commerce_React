import './CardProduct.css';
import PropTypes from 'prop-types';
import '../../data.json';

const CardProduct = ({ product }) => {
    
    // product como prop y pasamos product.name, product.price y product.image
    return (
        <div className="card-product">
            <div>
                <img src={product.image} alt={product.title} />
                <h3 className='title'>{product.title}</h3>
                <p>{product.description}</p>
            </div>
            <div className='price'>
                <p>{product.price}{'€'}</p>
            </div>
        </div>
    );
}
/*
CardProduct.propTypes = {
    product: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired
};
*/

export default CardProduct;