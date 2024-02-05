import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import { useState } from 'react';



const MainApp = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <React.StrictMode>
      <Header onSearchInputChange={setSearchText} />
      <App searchText={searchText} />
      <Footer />
    </React.StrictMode>
  );
};
ReactDOM.createRoot(document.getElementById('root')).render(<MainApp />);