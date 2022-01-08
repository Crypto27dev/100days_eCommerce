import './App.css';
import { useEffect } from 'react';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import Home from './components/home/Home';
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/Products';
import Search from './components/product/Search';

function App() {

  useEffect(() => {

    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans']
      }
    })

    return () => { }
  }, [])

  return (
    <Router>

      <Header />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/search" element={<Search />} />

      </Routes>

      <Footer />

    </Router>
  );
}

export default App;
