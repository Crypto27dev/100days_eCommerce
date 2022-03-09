import { lazy } from 'react';
import { TraverseRoutes, ProtectedRoute } from '../../route';

const Shipping = lazy(() => import('./shipping'));

const routes = [
    {
        path: 'shipping',
        element: <ProtectedRoute> <Shipping /> </ProtectedRoute>
    }

]

const CheckoutModule = () => <TraverseRoutes routes={routes} />;

export default CheckoutModule;