import { useState } from 'react';
import './App.css'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Discount from './components/Discount.jsx';
import ListProductsSearch from './components/ListProductsSearch.jsx';
import Cart from './components/Cart.jsx';
import Profile from './components/Profile.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

function App() {
  const [searchText, setSearchText] = useState('');
  const [activeComponent, setActiveComponent] = useState('listProducts');
  const [cartItems, setCartItems] = useState(0);

  const handleClickCart = () => {
    setActiveComponent('cart');
  };

  const handleClickInicio = () => {
    setActiveComponent('listProducts');
  };

  const handleClickProfile = () => {
    setActiveComponent('profile');
  };

  const handleAddToCart = () => {
    setCartItems(cartItems + 1);
  }; 

  return (

    <ThemeProvider>
      <CartProvider>
        <UserProvider>
          <Header onSearchInputChange={setSearchText} onClickInicio={handleClickInicio} onClickCart={handleClickCart} onClickProfile={handleClickProfile} cartItems={cartItems}/>
          {activeComponent === 'listProducts' && <div><Discount /><ListProductsSearch searchText={searchText} onClickAddToCart={handleAddToCart} /></div>}
          {activeComponent === 'cart' && <Cart />}
          {/*  {activeComponent === 'profile' && <Profile />} */}
          <Profile></Profile>
          <Footer />
        </UserProvider>
      </CartProvider>
      
    </ThemeProvider>

  )
}

export default App
