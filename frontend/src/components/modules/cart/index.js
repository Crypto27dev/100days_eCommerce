import { lazy } from 'react';
import { TraverseRoutes, ProtectedRoute } from '../../route';

const Cart = lazy(() => import('./my-cart'));

const routes = [
    {
        path: '',
        element: <ProtectedRoute> <Cart /> </ProtectedRoute>
    }
]

const CartModule = () => <TraverseRoutes routes={routes} />;

export default CartModule;