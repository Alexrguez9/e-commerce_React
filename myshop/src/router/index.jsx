import { createBrowserRouter } from 'react-router-dom';
import Layout from '../views/Layout';
import Products from '../views/Products';
import Cart from '../components/Cart';
import Profile from '../views/Profile';
import NotFound from '../views/NotFound';
import ProductDetails from '../views/ProductDetails';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Products /> },
            { path: '/product/:productId', element: <ProductDetails /> },
            { path: '/cart', element: <Cart /> },
            { path: '/login', element: <Profile />},
            { path: '/*', element: <NotFound />}
        ]
    },
    
]);
