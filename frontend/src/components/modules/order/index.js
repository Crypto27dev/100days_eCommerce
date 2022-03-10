import { lazy } from 'react';
import { TraverseRoutes, ProtectedRoute } from '../../route';

const MyOrders = lazy(() => import('./my-orders'));

const routes = [
    {
        path: '',
        element: <ProtectedRoute> <MyOrders /> </ProtectedRoute>
    },

]

const OrderModule = () => <TraverseRoutes routes={routes} />;

export default OrderModule;