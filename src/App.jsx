import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Header from './Layouts/Header.jsx';
import Footer from './Layouts/Footer.jsx';
import Home from './Pages/Home/Home.jsx';
import Login from './Pages/Login/Login.jsx';
import Register from './Pages/Register/Register.jsx';
import Category from './Pages/Category/Category.jsx';
import Users from './Pages/Admin/Users.jsx';
import Instruments from './Pages/Admin/Instruments.jsx';
import ProductDetails from './Pages/Category/ProductDetails';
import Car from './Pages/Car/Car.jsx';
import ProductBrand from './Pages/ProductBrand/ProductBrand.jsx';
import ContactUs from './Pages/Contact/Contact.jsx';
import AboutUs from './Pages/About/AboutUs.jsx';
import News from './Pages/News/News.jsx';
import PaymentMethod from './Pages/PaymentMethod/PaymentMethod.jsx';
import Catalog from './Pages/Category/Catalog.jsx';

const App = () => {
    return (
        <AuthProvider>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/car' element={<Car />} />
                <Route path="/category/:id" element={<Category />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/instruments" element={<Instruments />} />
                <Route path="/product" element={<ProductDetails />} />
                <Route path="/product/brand" element={<ProductBrand />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/news" element={<News />} />
                <Route path="/payment" element={<PaymentMethod />} />
                <Route path="/catalog" element={<Catalog />} />
            </Routes>
            <Footer />
        </Router>
        </AuthProvider>
    );
};

export default App;
