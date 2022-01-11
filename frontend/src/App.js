import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import WebFont from 'webfontloader';
import Home from './components/home/Home';
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/Products';
import Search from './components/product/Search';
import LoginSignup from './components/user/LoginSignup';
import { loadUser } from './redux/actions/userAction';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyOrders from './components/order/MyOrders';
import OrderDetails from './components/order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import NotFound from './components/layout/error/NotFound';

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
        families: ['Roboto', 'Droid Sans']
      }
    })

    dispatch(loadUser());

    getStripeApiKey();

    return () => { }

  }, [
    dispatch
  ])

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>

      <Header />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<LoginSignup />} />

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
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />

      </Routes>

      <Footer />

    </Router>
  );
}

export default App;
