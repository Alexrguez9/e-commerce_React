import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css'; 
import Discount from './Discount';

const Cart = () => {
  const { cart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div>
        <Discount />
        <h2>Carrito de Compras</h2>
        <p>El carrito está vacío.</p>
      </div>
    );
  }

  
  const products = {};
  let totalPrice = 0;
  
  cart.forEach((item) => {
    if (products[item.id]) {
      products[item.id].quantity += item.quantity;
    } else {
      products[item.id] = {
        ...item,
        quantity: item.quantity,
      };
    }
    totalPrice += item.price * item.quantity;
  });

  return (
    <div>
      <Discount />
      <h2>Carrito de Compras</h2>
      <ul className="cart-list">
        {Object.values(products).map((item) => (
          <li key={item.id} className="cart-item">
            <div className="cart-item-details">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio total: ${item.price * item.quantity}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div>Total a pagar: ${totalPrice}</div>
    </div>
  );
};

export default Cart;