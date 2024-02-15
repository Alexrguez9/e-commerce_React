import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import './index.css'
import { router } from './router/index.jsx'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
          <ThemeProvider>
            <CartProvider>
              <UserProvider>
                <SearchProvider>
                  <RouterProvider router={router} />
                </SearchProvider>
              </UserProvider>
            </CartProvider>
          </ThemeProvider>
    </React.StrictMode>
);