import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, RotateCcw, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  // Verify user is logged in as customer
  useEffect(() => {
    if (!user || user.role === 'guest') {
      navigate('/login');
    }
  }, [user, navigate]);

  // Show loading spinner while user state is being determined
  if (!user || user.role === 'guest') {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  const recentOrders = [
    {
      id: 1,
      dish: 'Paneer Tikka Masala',
      chef: 'Aisha Sharma',
      date: 'Dec 15, 2025',
      amount: '₹320',
      status: 'Delivered'
    },
    {
      id: 2,
      dish: 'Gujarati Thali',
      chef: 'Rohan Patel',
      date: 'Dec 13, 2025',
      amount: '₹280',
      status: 'Delivered'
    },
    {
      id: 3,
      dish: 'Quinoa Buddha Bowl',
      chef: 'Sara Ali',
      date: 'Dec 10, 2025',
      amount: '₹350',
      status: 'Delivered'
    }
  ];

  const savedAddresses = [
    { id: 1, label: 'Home', address: '123 Main St, Bandra, Mumbai' },
    { id: 2, label: 'Office', address: '456 Business Park, Fort, Mumbai' }
  ];

  const favorites = [
    { id: 1, dish: 'Paneer Tikka Masala', chef: 'Aisha Sharma', price: '₹320' },
    { id: 2, dish: 'Healthy Salad Bowl', chef: 'Sara Ali', price: '₹280' },
    { id: 3, dish: 'Kerala Biryani', chef: 'Meera Nair', price: '₹300' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div>
        <p className="text-sm text-primary font-semibold">Welcome back</p>
        <h1 className="text-3xl font-bold text-slate-900">{user.name}'s Dashboard</h1>
        <p className="text-slate-600 mt-1">Manage your orders, addresses, and favorites</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-card p-5">
          <p className="text-sm text-slate-500">Total Orders</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">12</p>
          <p className="text-xs text-slate-500 mt-2">All time purchases</p>
        </div>
        <div className="bg-white rounded-2xl shadow-card p-5">
          <p className="text-sm text-slate-500">Favorite Chefs</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">5</p>
          <p className="text-xs text-slate-500 mt-2">Bookmarked creators</p>
        </div>
        <div className="bg-white rounded-2xl shadow-card p-5">
          <p className="text-sm text-slate-500">Total Spent</p>
          <p className="text-3xl font-bold text-primary mt-2">₹3,840</p>
          <p className="text-xs text-slate-500 mt-2">On pre-orders</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="flex border-b border-orange-100">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-4 px-6 font-semibold transition ${
              activeTab === 'orders'
                ? 'text-primary border-b-2 border-primary'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="inline mr-2" size={18} />
            Order History
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex-1 py-4 px-6 font-semibold transition ${
              activeTab === 'addresses'
                ? 'text-primary border-b-2 border-primary'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="inline mr-2" size={18} />
            Saved Addresses
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-4 px-6 font-semibold transition ${
              activeTab === 'favorites'
                ? 'text-primary border-b-2 border-primary'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="inline mr-2" size={18} />
            Favorites
          </button>
        </div>

        <div className="p-6">
          {/* Order History Tab */}
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {recentOrders.length > 0 ? (
                recentOrders.map(order => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border border-orange-100 rounded-xl hover:bg-orange-50 transition"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{order.dish}</p>
                      <p className="text-sm text-slate-600">by {order.chef} • {order.date}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">{order.amount}</p>
                        <p className="text-xs text-green-600 font-medium">{order.status}</p>
                      </div>
                      <button className="px-4 py-2 rounded-full border border-primary text-primary text-sm font-semibold hover:bg-orange-50 transition">
                        <RotateCcw size={16} className="inline mr-1" />
                        Reorder
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-8">No orders yet. Start exploring!</p>
              )}
            </motion.div>
          )}

          {/* Saved Addresses Tab */}
          {activeTab === 'addresses' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {savedAddresses.map(addr => (
                <div
                  key={addr.id}
                  className="p-4 border border-orange-100 rounded-xl hover:bg-orange-50 transition cursor-pointer"
                >
                  <p className="font-semibold text-slate-900">{addr.label}</p>
                  <p className="text-sm text-slate-600 mt-1">{addr.address}</p>
                  <div className="flex gap-2 mt-3">
                    <button className="text-sm text-primary font-semibold hover:underline">Edit</button>
                    <span className="text-slate-400">•</span>
                    <button className="text-sm text-red-600 font-semibold hover:underline">Delete</button>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 rounded-xl border-2 border-dashed border-orange-200 text-primary font-semibold hover:bg-orange-50 transition">
                + Add New Address
              </button>
            </motion.div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-3 gap-4"
            >
              {favorites.map(fav => (
                <div
                  key={fav.id}
                  className="p-4 border border-orange-100 rounded-xl hover:bg-orange-50 transition"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold text-slate-900">{fav.dish}</p>
                    <Heart className="text-red-500 fill-red-500" size={18} />
                  </div>
                  <p className="text-sm text-slate-600">{fav.chef}</p>
                  <p className="font-bold text-primary mt-2">{fav.price}</p>
                  <button className="w-full mt-3 py-2 rounded-full bg-primary text-white font-semibold text-sm hover:shadow-lg transition">
                    Pre-order
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to explore more?</h2>
        <p className="mb-4">Discover new chefs and dishes in your area</p>
        <Link
          to="/menu"
          className="inline-block px-6 py-3 bg-white text-primary font-semibold rounded-full hover:shadow-lg transition"
        >
          Browse Menu
        </Link>
      </div>
    </div>
  );
};

export default CustomerDashboard;
