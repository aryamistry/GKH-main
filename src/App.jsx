import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Explore from './pages/Explore';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import HomemakerDashboard from './pages/HomemakerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import ChefOnboard from './pages/ChefOnboard';
import PendingVerification from './pages/PendingVerification';
import OrderSuccess from './pages/OrderSuccess';
import HelpCenter from './pages/HelpCenter';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import NotFound from './pages/NotFound';

const App = () => (
  <ErrorBoundary>
    <div className="min-h-screen bg-warm flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Explore />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/chef-onboard" element={<ChefOnboard />} />
        <Route path="/pending-verification" element={<PendingVerification />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/chef-dashboard" element={<HomemakerDashboard />} />
        <Route path="/homemaker-dashboard" element={<HomemakerDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQs />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </ErrorBoundary>
);

export default App;


