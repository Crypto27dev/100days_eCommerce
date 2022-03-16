import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import WebFont from 'webfontloader';
import { loadUser } from './redux/actions/userAction';
import { TraverseRoutes } from './components/route';
import Loader from './components/layout/loader/Loader';

import NotFound from './components/layout/error/NotFound';
const AuthModule = lazy(() => import('./components/modules/auth'));
const HomeModule = lazy(() => import('./components/modules/home'));
const UserModule = lazy(() => import('./components/modules/user'));
const AdminModule = lazy(() => import('./components/modules/admin'));
const ProductModule = lazy(() => import('./components/modules/product'));
const CartModule = lazy(() => import('./components/modules/cart'));
const CheckoutModule = lazy(() => import('./components/modules/checkout'));
const OrderModule = lazy(() => import('./components/modules/order'));
const About = lazy(() => import('./components/modules/about'));
const Contact = lazy(() => import('./components/modules/contact'));

const routes = [
  {
    path: "/",
    element: <Navigate to='/home' />
  },

  {
    path: 'auth/*',
    element: <AuthModule />
  },

  {
    path: 'home/*',
    element: <HomeModule />
  },

  {
    path: 'user/*',
    element: <UserModule />
  },

  {
    path: 'admin/*',
    element: <AdminModule />
  },

  {
    path: 'products/*',
    element: <ProductModule />
  },

  {
    path: 'cart/*',
    element: <CartModule />
  },

  {
    path: 'checkout/*',
    element: <CheckoutModule />
  },

  {
    path: 'orders/*',
    element: <OrderModule />
  },

  {
    path: 'about',
    element: <About />
  },

  {
    path: 'contact',
    element: <Contact />
  },

  {
    path: '*',
    element: <NotFound />
  }
]

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    WebFont.load({
      google: {
        families: ['Jost', 'Roboto', 'Droid Sans']
      }
    });

    const token = localStorage.getItem("token");

    if (token) {
      dispatch(loadUser(token));
    }

    return () => { }

  }, [
    dispatch
  ])

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>

      <Suspense fallback={<Loader fullScreen />} >

        <TraverseRoutes routes={routes} />

      </Suspense>

      {/* <Routes>

        
        <Route path="/orders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        } />

        <Route path="/order/confirm" element={
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        } />

        <Route path="/order/:id" element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        } />

        <Route path="/admin/dashboard" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/products" element={
          <ProtectedRoute isAdmin={true}>
            <ProductList />
          </ProtectedRoute>
        } />

        <Route path="/admin/product/new" element={
          <ProtectedRoute isAdmin={true}>
            <NewProduct />
          </ProtectedRoute>
        } />

        <Route path="/admin/product/:id" element={
          <ProtectedRoute isAdmin={true}>
            <UpdateProduct />
          </ProtectedRoute>
        } />

        <Route path="/admin/orders" element={
          <ProtectedRoute isAdmin={true}>
            <OrderList />
          </ProtectedRoute>
        } />

        <Route path="/admin/order/:id" element={
          <ProtectedRoute isAdmin={true}>
            <ProcessOrder />
          </ProtectedRoute>
        } />

        <Route path="/admin/users" element={
          <ProtectedRoute isAdmin={true}>
            <UserList />
          </ProtectedRoute>
        } />

        <Route path="/admin/user/:id" element={
          <ProtectedRoute isAdmin={true}>
            <UpdateUser />
          </ProtectedRoute>
        } />

        <Route path="/admin/reviews" element={
          <ProtectedRoute isAdmin={true}>
            <ProductReviewList />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />

      </Routes> */}

    </Router>
  );
}

export default App;
