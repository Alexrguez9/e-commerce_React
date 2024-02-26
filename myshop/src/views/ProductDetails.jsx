import React, { useState} from "react";
import { useParams, Link} from "react-router-dom";
import Discount from "../components/Discount";
import './ProductDetails.css';
import data from '../data/data.json';
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { LuPencil } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";

const ProductDetails = () => {
    const {productId} = useParams();
    const { addToCart } = useContext(CartContext);

    const findProduct = data.find((product) => product.id === Number(productId));
    const { title, price, description, image, category, rating } = findProduct;

    const {user} = useAuth();
    const [showModal, setShowModal] = useState(false); // State for controlling the modal


    const handleAddToCart = () => {
        addToCart(findProduct); 
    };

    const handleAdminEditProduct = () => {
        console.log('Edit product');
        setShowModal(true);
    }

    const handleAdminDeleteProduct = () => {
        console.log('Delete product');
        //TODO: delete product with axios in API
    }
    
    return (
        <div>
            {showModal && (
                <Modal open={showModal} onClose={() => setShowModal(false)}>
                        {/* Contenido del modal */}
                        <p>Contenido del modal...</p>
                    </Modal>
            )}
            <Discount />
            <Link to={'/'} className="back-button"><button>⭠ Volver</button></Link>
            <div className="product-details">
                <div className='card-image-and-icons'>
                    <img src={image} alt="Product" className="image"/>
                    {user?.role === 'admin' && (
                        <div className='admin-edit-delete-icons'>
                            <LuPencil className='admin-edit-product' onClick={handleAdminEditProduct}/>
                            <RiDeleteBinLine className='admin-delete-product' onClick={handleAdminDeleteProduct}/>
                        </div>
                    )}
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