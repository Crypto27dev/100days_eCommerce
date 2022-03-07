import { lazy } from "react";
import { TraverseRoutes, ProtectedRoute } from "../../route";

const Dashboard = lazy(() => import("./dashboard"));
const ProductList = lazy(() => import("./product-list"));
const NewProduct = lazy(() => import("./new-product"));
const UserList = lazy(() => import("./user-list"));
const OrderList = lazy(() => import("./order-list"));

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
    },

    {
        path: 'users',
        element: <ProtectedRoute isAdmin={true}> <UserList /> </ProtectedRoute>
    },

    {
        path: 'orders',
        element: <ProtectedRoute isAdmin={true}> <OrderList /> </ProtectedRoute>
    }
]

const AdminModule = () => <TraverseRoutes routes={routes} />;

export default AdminModule;