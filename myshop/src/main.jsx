import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import './index.css'
import { router } from './router/index.jsx'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
// import { ProductsProvider } from './context/ProductContext.jsx'
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
          <ThemeProvider>
            <CartProvider>
              <AuthProvider>
                <SearchProvider>

                    <RouterProvider router={router} />

                </SearchProvider>
              </AuthProvider>
            </CartProvider>
          </ThemeProvider>
          </Provider>
    </React.StrictMode>
);