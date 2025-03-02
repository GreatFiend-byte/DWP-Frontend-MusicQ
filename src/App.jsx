import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Header from './Layouts/Header.jsx';
import Footer from './Layouts/Footer.jsx';
import Home from './Pages/Home/Home.jsx';
import Login from './Pages/Login/Login.jsx';
import Register from './Pages/Register/Register.jsx';

const App = () => {
    return (
        <AuthProvider>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
        </Router>
        </AuthProvider>
    );
};

export default App;
