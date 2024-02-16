import React from "react";
import { useParams, Link} from "react-router-dom";
import Discount from "../components/Discount";
import './ProductDetails.css';
import data from '../../data.json';
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
    const {productId} = useParams();
    const { addToCart } = useContext(CartContext);

    const findProduct = data.find((product) => product.id === Number(productId));
    const { title, price, description, image, category, rating } = findProduct;

    const handleAddToCart = () => {
        addToCart(findProduct); 
    };
    
    return (
        <div>
            <Discount />
            <Link to={'/'} className="back-button"><button>⭠ Volver</button></Link>
            <div className="product-details">
                <img src={image} alt="Product" className="image"/>
                <div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <p className="price">Price: {price}€</p>
                    <p className="category">Category: {category}</p>
                    <div className="rating">
                        <p>Rating: ★{rating.rate} ({rating.count} reviews)</p>
                    </div>
                    <button onClick={handleAddToCart}>Add to cart</button>
                </div>
            </div>
        </div>
    );
}
export default ProductDetails;