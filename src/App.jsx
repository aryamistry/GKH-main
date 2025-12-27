import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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

const App = () => {
  const location = useLocation();

  // Partner / chef dashboard should not show the customer-facing Navbar/Footer
  const isPartnerRoute = ['/chef-dashboard', '/homemaker-dashboard', '/partner-login'].includes(
    location.pathname
  );

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-warm flex flex-col">
        {!isPartnerRoute && <Navbar />}
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
            <Route
              path="/chef-dashboard"
              element={
                localStorage.getItem('partnerToken') ? (
                  <HomemakerDashboard />
                ) : (
                  <Navigate to="/partner-login" replace />
                )
              }
            />
            <Route
              path="/homemaker-dashboard"
              element={
                localStorage.getItem('partnerToken') ? (
                  <HomemakerDashboard />
                ) : (
                  <Navigate to="/partner-login" replace />
                )
              }
            />
            <Route path="/partner-login" element={<Login defaultRole="chef" />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {!isPartnerRoute && <Footer />}
      </div>
    </ErrorBoundary>
  );
};

export default App;


