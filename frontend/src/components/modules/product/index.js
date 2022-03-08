import { lazy } from 'react';
import { TraverseRoutes } from '../../route';

const ProductDetails = lazy(() => import('./product-details'));

const routes = [
    {
        path: ':id',
        element: <ProductDetails />
    }
]

const ProductModule = () => <TraverseRoutes routes={routes} />;

export default ProductModule;