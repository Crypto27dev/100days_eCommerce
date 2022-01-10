import './App.css';
import { useEffect } from 'react';
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

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans']
      }
    })

    dispatch(loadUser());

    return () => { }
  }, [
    dispatch
  ])

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

      </Routes>

      <Footer />

    </Router>
  );
}

export default App;
