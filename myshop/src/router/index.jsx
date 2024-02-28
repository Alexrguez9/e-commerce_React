import { createBrowserRouter } from 'react-router-dom';
import Layout from '../views/Layout';
import ProductsSection from '../views/ProductsSection';
import Cart from '../components/Cart';
import Profile from '../views/Profile';
import NotFound from '../views/NotFound';
import ProductDetails from '../views/ProductDetails';
import ProtectedRoute from '../components/ProtectedRoute';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            { path: '/', element: <ProductsSection /> },
            { path: '/product/:productId', element: <ProtectedRoute><ProductDetails /> </ProtectedRoute>},
            { path: '/cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
            { path: '/login', element: <Profile />},
            //{ path: '/*', element: <NotFound />}
        ]
    },
    
]);
