import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css'; 
import Discount from './Discount';

const Cart = () => {
  const { cart, resetCart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div>
        <Discount />
        <h2 className='cart-title'>Carrito de Compras</h2>
        <section>
          <p className='empty-cart-text'>El carrito está vacío.</p>
        </section>
        
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

  const handleBuy = () => { 
    alert('Vas a ser redirigido a la pasarela de pago');
    resetCart();
  }

  const handleResetCart = () => {
    resetCart();
  }

  return (
    <div className='cart-component'>
      <Discount />
      <h2 className='cart-title'>Carrito de Compras</h2>
      <section>
        <ul className="cart-list">
        {Object.values(products).map((item) => (
          <li key={item.id} className="cart-item">
            <div className="cart-item-details">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              {item.quantity > 0 && <span className="item-count">{item.quantity}</span>}
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio total: {item.price * item.quantity}€</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div><h2 className='cart-total-price'>Total a pagar: {totalPrice.toFixed(2)}€</h2></div>
      <div className='cart-buttons'>
        <button className='btn-checkout' onClick={handleBuy}>Comprar</button>
        <button className='btn-reset-cart' onClick={handleResetCart}>Resetar carrito</button>
      </div>
      </section>
      
    </div>
  );
};

export default Cart;