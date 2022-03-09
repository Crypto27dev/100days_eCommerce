import { lazy } from 'react';
import { TraverseRoutes, ProtectedRoute } from '../../route';

const Shipping = lazy(() => import('./shipping'));
const OrderSummary = lazy(() => import('./order-summary'));
const Payment = lazy(() => import('./payment'));

const routes = [
    {
        path: 'shipping',
        element: <ProtectedRoute> <Shipping /> </ProtectedRoute>
    },

    {
        path: 'summary',
        element: <ProtectedRoute> <OrderSummary /> </ProtectedRoute>
    },

    {
        path: 'payment',
        element: <ProtectedRoute> <Payment /> </ProtectedRoute>
    }

]

const CheckoutModule = () => <TraverseRoutes routes={routes} />;

export default CheckoutModule;