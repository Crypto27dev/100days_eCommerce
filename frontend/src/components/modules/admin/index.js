import { lazy } from "react";
import { TraverseRoutes, ProtectedRoute } from "../../route";

const Dashboard = lazy(() => import("./dashboard"));
const ProductList = lazy(() => import("./product-list"));
const NewProduct = lazy(() => import("./new-product"));

const routes = [
    {
        path: 'dashboard',
        element: <ProtectedRoute isAdmin={true}> <Dashboard /> </ProtectedRoute>
    },

    {
        path: 'products',
        element: <ProtectedRoute isAdmin={true}> <ProductList /> </ProtectedRoute>
    },

    {
        path: 'product/new',
        element: <ProtectedRoute isAdmin={true}> <NewProduct /> </ProtectedRoute>
    }
]

const AdminModule = () => <TraverseRoutes routes={routes} />;

export default AdminModule;