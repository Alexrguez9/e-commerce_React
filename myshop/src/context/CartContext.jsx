import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const addToCart = (element) => {
    const existingItem = cart.find((item) => item.id === element.id);
    
    if (existingItem) {
        // aumentamos cantidad
        const updatedCart = cart.map((item) =>
        item.id === element.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
    } else {
        // nuevo producto, cantidad 1
        setCart([...cart, { ...element, quantity: 1 }]);
    }
    setTotalItems(totalItems + 1);
  };

  const resetCart = () => {
    setCart([]);
    setTotalItems(0);
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart, totalItems, resetCart }}>
      {children}
    </CartContext.Provider>
  );
  
  }

  CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };