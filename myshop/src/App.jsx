import { useState } from 'react';
import './App.css'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Discount from './components/Discount.jsx';
import Products from './components/Products.jsx';
import Cart from './components/Cart.jsx';
import Profile from './components/Profile.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

function App() {
  return (

    <ThemeProvider>
      <CartProvider>
        <UserProvider>
          <Header />
          {<div><Discount /><Products /></div>}
          {<Cart />}
          {/*  {activeComponent === 'profile' && <Profile />} */}
          <Profile></Profile>
          <Footer />
        </UserProvider>
      </CartProvider>
    </ThemeProvider>

  )
}

export default App
