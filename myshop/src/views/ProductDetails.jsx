import React, { useContext }from "react";
import { useParams, Link} from "react-router-dom";
import Discount from "../components/Discount";
import './ProductDetails.css';
import { CartContext } from "../context/CartContext";
import { ProductsContext } from "../context/ProductContext";

const ProductDetails = () => {
    const {productId} = useParams();
    const { addToCart } = useContext(CartContext);
    const { products } = useContext(ProductsContext);

    const findProduct = products.find((product) => product.id === Number(productId));
    console.log(findProduct);
    const { title, price, description, image, category, rating } = findProduct;

    const handleAddToCart = () => {
        addToCart(findProduct); 
    };

    
    return (
        <div>
            <Discount />
            <Link to={'/'} className="back-button"><button>⭠ Volver</button></Link>
            <div className="product-details">
                <div className='card-image-and-icons'>
                    <img src={image} alt="Product" className="image"/>
                </div>
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