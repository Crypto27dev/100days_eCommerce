import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import WebFont from 'webfontloader';
import axios from 'axios';
import { loadUser } from './redux/actions/userAction';
import { TraverseRoutes } from './components/route';
import Loader from './components/layout/loader/Loader';

import NotFound from './components/layout/error/NotFound';
const AuthModule = lazy(() => import('./components/modules/auth'));
const HomeModule = lazy(() => import('./components/modules/home'));
const UserModule = lazy(() => import('./components/modules/user'));
const AdminModule = lazy(() => import('./components/modules/admin'));
const ProductModule = lazy(() => import('./components/modules/product'));

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
    path: '*',
    element: <NotFound />
  }
]

function App() {

  const dispatch = useDispatch();

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {

    const { data } = await axios.get("/api/v1/stripe/key");

    setStripeApiKey(data.key);

  }

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

    getStripeApiKey();

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

        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<LoginSignup />} />

        <Route path="/register" element={<Register />} />

        <Route path="/account" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/me/update" element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        } />

        <Route path="/password/update" element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        } />

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/shipping" element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        } />

        {
          stripeApiKey &&
          <Route path="/process/payment" element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            </Elements>
          } />
        }

        <Route path="/success" element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        } />

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
