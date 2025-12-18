import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChefHat,
  Power,
  TrendingUp,
  Clock,
  IndianRupee,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Download,
  Settings,
  UtensilsCrossed,
} from 'lucide-react';

const HomemakerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Strict protection - only verified chefs can access
  React.useEffect(() => {
    // If not logged in or wrong role, redirect to home
    if (!user || user.role !== 'chef') {
      console.log('HomemakerDashboard: User is not a chef, redirecting to home');
      navigate('/');
      return;
    }
    
    // If chef but not verified, redirect to pending verification
    if (user.role === 'chef' && !user.isVerified) {
      console.log('HomemakerDashboard: Chef not verified, redirecting to pending verification');
      navigate('/pending-verification');
      return;
    }
  }, [user, navigate]);

  // ============= STATE MANAGEMENT =============
  const [kitchenOpen, setKitchenOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const [successMessage, setSuccessMessage] = useState('');

  // Mock menu items
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Paneer Butter Masala', price: 280, description: 'Creamy paneer curry', available: true },
    { id: 2, name: 'Gujarati Thali', price: 320, description: 'Complete Gujarati meal', available: true },
    { id: 3, name: 'Dal Makhani', price: 220, description: 'Rich lentil curry', available: false },
    { id: 4, name: 'Biryani', price: 350, description: 'Fragrant basmati rice', available: true },
  ]);

  // Mock orders with workflow states
  const [orders, setOrders] = useState([
    { id: 101, customer: 'Raj Kumar', items: ['Paneer Butter Masala', 'Roti (4)'], amount: 280, status: 'new', time: '10:30 AM' },
    { id: 102, customer: 'Priya Sharma', items: ['Gujarati Thali'], amount: 320, status: 'new', time: '10:45 AM' },
    { id: 103, customer: 'Amit Patel', items: ['Dal Makhani', 'Rice'], amount: 320, status: 'cooking', time: '10:15 AM' },
    { id: 104, customer: 'Sneha Singh', items: ['Biryani (2 boxes)'], amount: 700, status: 'ready', time: '09:45 AM' },
  ]);

  // Earnings data
  const todaysEarnings = 2840;
  const weeklyEarnings = 18500;
  const totalOrders = orders.length;

  // ============= ORDER MANAGEMENT FUNCTIONS =============
  const handleAcceptOrder = (orderId) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: 'cooking' } : order
      )
    );
    showSuccessMessage('Order Accepted! Started cooking.');
  };

  const handleRejectOrder = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
    showSuccessMessage('Order Declined.');
  };

  const handleMarkReady = (orderId) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: 'ready' } : order
      )
    );
    showSuccessMessage('Order Ready! Customer notified.');
  };

  const handleHandover = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
    showSuccessMessage('Order Handed Over. Thank you!');
  };

  // ============= MENU MANAGEMENT FUNCTIONS =============
  const toggleMenuItemAvailability = (itemId) => {
    setMenuItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, available: !item.available } : item
      )
    );
    showSuccessMessage('Menu Updated Successfully');
  };

  const deleteMenuItem = (itemId) => {
    setMenuItems(prev => prev.filter(item => item.id !== itemId));
    showSuccessMessage('Item Removed from Menu');
  };

  const handleAddMenuItem = () => {
    const newItem = {
      id: Math.max(...menuItems.map(m => m.id), 0) + 1,
      name: 'New Dish',
      price: 300,
      description: 'Add description',
      available: true,
    };
    setMenuItems(prev => [...prev, newItem]);
    showSuccessMessage('New Item Added! Edit details below.');
  };

  const handleRequestPayout = () => {
    showSuccessMessage('Payout Request Submitted! You\'ll receive funds within 2-3 business days.');
  };

  // ============= UI HELPER FUNCTIONS =============
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'border-blue-200 bg-blue-50';
      case 'cooking':
        return 'border-yellow-200 bg-yellow-50';
      case 'ready':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'new':
        return 'New Request';
      case 'cooking':
        return 'Cooking';
      case 'ready':
        return 'Ready for Pickup';
      default:
        return status;
    }
  };

  // Get orders by status
  const newOrders = orders.filter(o => o.status === 'new');
  const cookingOrders = orders.filter(o => o.status === 'cooking');
  const readyOrders = orders.filter(o => o.status === 'ready');

  // Redirect loading state
  if (!user || user.role !== 'chef' || (user.role === 'chef' && !user.isVerified)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-white">
        <div className="text-center">
          <div className="animate-spin inline-flex p-3 bg-primary/10 rounded-lg mb-4">
            <ChefHat className="text-primary animate-spin" size={32} />
          </div>
          <p className="text-slate-600 font-semibold">Redirecting you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* ============= HEADER SECTION ============= */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Greeting */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ChefHat className="text-primary" size={28} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Namaste, {user.name || 'Chef'}! 🙏
                </h1>
                <p className="text-sm text-slate-600">Welcome to your kitchen management hub</p>
              </div>
            </div>

            {/* Kitchen Status Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setKitchenOpen(!kitchenOpen);
                showSuccessMessage(kitchenOpen ? 'Kitchen Closed' : 'Kitchen Open');
              }}
              className={`px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all ${
                kitchenOpen
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-slate-300 text-slate-700 shadow-md'
              }`}
            >
              <Power size={20} />
              <span>{kitchenOpen ? 'Kitchen Open' : 'Kitchen Closed'}</span>
            </motion.button>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-200">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <p className="text-xs text-slate-600 font-semibold">Today's Orders</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{totalOrders}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <p className="text-xs text-slate-600 font-semibold">Today's Earnings</p>
              <p className="text-3xl font-bold text-green-600 mt-1">₹{todaysEarnings}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
              <p className="text-xs text-slate-600 font-semibold">Weekly Earnings</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">₹{weeklyEarnings}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
              <p className="text-xs text-slate-600 font-semibold">Kitchen Status</p>
              <p className={`text-lg font-bold mt-1 ${kitchenOpen ? 'text-green-600' : 'text-slate-600'}`}>
                {kitchenOpen ? '🟢 Open' : '🔴 Closed'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ============= SUCCESS MESSAGE TOAST ============= */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
        >
          <CheckCircle size={20} />
          {successMessage}
        </motion.div>
      )}

      {/* ============= MAIN CONTENT ============= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-lg p-2 shadow-sm">
          {[
            { id: 'orders', label: 'Active Orders', icon: UtensilsCrossed },
            { id: 'menu', label: 'My Menu', icon: ChefHat },
            { id: 'earnings', label: 'Earnings', icon: IndianRupee },
            { id: 'profile', label: 'Profile', icon: Settings },
          ].map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <IconComponent size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* ============= ORDERS TAB ============= */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {!kitchenOpen && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded flex items-start gap-3">
                <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-semibold text-yellow-800">Kitchen is Currently Closed</p>
                  <p className="text-sm text-yellow-700">Turn on the toggle above to accept new orders.</p>
                </div>
              </div>
            )}

            {/* NEW REQUESTS SECTION */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
                <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                  <AlertCircle size={20} />
                  New Requests ({newOrders.length})
                </h2>
                <p className="text-sm text-blue-700 mt-1">Accept or decline new orders</p>
              </div>
              <div className="p-6">
                {newOrders.length === 0 ? (
                  <p className="text-center text-slate-500 py-8">No new orders at the moment</p>
                ) : (
                  <div className="space-y-4">
                    {newOrders.map(order => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="border border-blue-200 rounded-lg p-4 bg-blue-50"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-slate-600 font-semibold">CUSTOMER</p>
                            <p className="text-lg font-bold text-slate-900 mt-1">{order.customer}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 font-semibold">ITEMS</p>
                            <p className="text-sm text-slate-700 mt-1">
                              {order.items.join(', ')}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 font-semibold">AMOUNT & TIME</p>
                            <p className="text-lg font-bold text-green-600 mt-1">₹{order.amount}</p>
                            <p className="text-xs text-slate-600">{order.time}</p>
                          </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={() => handleAcceptOrder(order.id)}
                            disabled={!kitchenOpen}
                            className="flex-1 py-2 px-4 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                          >
                            ✓ Accept & Start Cooking
                          </button>
                          <button
                            onClick={() => handleRejectOrder(order.id)}
                            className="flex-1 py-2 px-4 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
                          >
                            ✕ Decline
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* COOKING SECTION */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-200">
                <h2 className="text-lg font-bold text-yellow-900 flex items-center gap-2">
                  <Clock size={20} />
                  Cooking/Preparing ({cookingOrders.length})
                </h2>
                <p className="text-sm text-yellow-700 mt-1">Mark as ready when done</p>
              </div>
              <div className="p-6">
                {cookingOrders.length === 0 ? (
                  <p className="text-center text-slate-500 py-8">No orders being prepared</p>
                ) : (
                  <div className="space-y-4">
                    {cookingOrders.map(order => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="border border-yellow-200 rounded-lg p-4 bg-yellow-50"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-slate-600 font-semibold">CUSTOMER</p>
                            <p className="text-lg font-bold text-slate-900 mt-1">{order.customer}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 font-semibold">ITEMS</p>
                            <p className="text-sm text-slate-700 mt-1">
                              {order.items.join(', ')}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 font-semibold">AMOUNT & TIME</p>
                            <p className="text-lg font-bold text-green-600 mt-1">₹{order.amount}</p>
                            <p className="text-xs text-slate-600">{order.time}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleMarkReady(order.id)}
                          className="w-full mt-4 py-2 px-4 rounded-lg font-semibold bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                        >
                          ✓ Mark as Ready for Pickup
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* READY FOR PICKUP SECTION */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-green-50 px-6 py-4 border-b border-green-200">
                <h2 className="text-lg font-bold text-green-900 flex items-center gap-2">
                  <CheckCircle size={20} />
                  Ready for Pickup ({readyOrders.length})
                </h2>
                <p className="text-sm text-green-700 mt-1">Mark as handed over</p>
              </div>
              <div className="p-6">
                {readyOrders.length === 0 ? (
                  <p className="text-center text-slate-500 py-8">No ready orders</p>
                ) : (
                  <div className="space-y-4">
                    {readyOrders.map(order => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="border border-green-200 rounded-lg p-4 bg-green-50"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-slate-600 font-semibold">CUSTOMER</p>
                            <p className="text-lg font-bold text-slate-900 mt-1">{order.customer}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 font-semibold">ITEMS</p>
                            <p className="text-sm text-slate-700 mt-1">
                              {order.items.join(', ')}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 font-semibold">AMOUNT & TIME</p>
                            <p className="text-lg font-bold text-green-600 mt-1">₹{order.amount}</p>
                            <p className="text-xs text-slate-600">{order.time}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleHandover(order.id)}
                          className="w-full mt-4 py-2 px-4 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600 transition-colors"
                        >
                          ✓ Order Handed Over
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ============= MENU TAB ============= */}
        {activeTab === 'menu' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">My Menu Items</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddMenuItem}
                disabled={!kitchenOpen}
                className="px-6 py-3 rounded-lg font-semibold bg-primary text-white hover:bg-orange-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Add New Item
              </motion.button>
            </div>

            {!kitchenOpen && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded flex items-start gap-3">
                <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-semibold text-yellow-800">Menu Editing Disabled</p>
                  <p className="text-sm text-yellow-700">Turn on the kitchen status toggle to edit menu items.</p>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {menuItems.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                      <p className="text-slate-600 mt-1">{item.description}</p>
                      <p className="text-2xl font-bold text-green-600 mt-2">₹{item.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleMenuItemAvailability(item.id)}
                        disabled={!kitchenOpen}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                          item.available
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {item.available ? (
                          <>
                            <Eye size={18} />
                            Available
                          </>
                        ) : (
                          <>
                            <EyeOff size={18} />
                            Unavailable
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => deleteMenuItem(item.id)}
                        disabled={!kitchenOpen}
                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ============= EARNINGS TAB ============= */}
        {activeTab === 'earnings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-slate-900">Your Earnings</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Today's Earnings */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 font-semibold">Today's Earnings</p>
                    <p className="text-5xl font-bold mt-2">₹{todaysEarnings}</p>
                    <p className="text-blue-100 text-sm mt-2">{totalOrders} orders completed</p>
                  </div>
                  <TrendingUp size={48} className="opacity-30" />
                </div>
              </div>

              {/* Weekly Earnings */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 font-semibold">This Week's Earnings</p>
                    <p className="text-5xl font-bold mt-2">₹{weeklyEarnings}</p>
                    <p className="text-green-100 text-sm mt-2">7 days of service</p>
                  </div>
                  <IndianRupee size={48} className="opacity-30" />
                </div>
              </div>
            </div>

            {/* Earnings Breakdown */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Earning Breakdown</h3>
              <div className="space-y-3">
                {[
                  { label: 'Monday', amount: 2200 },
                  { label: 'Tuesday', amount: 2800 },
                  { label: 'Wednesday', amount: 2100 },
                  { label: 'Thursday', amount: 3200 },
                  { label: 'Friday', amount: 3600 },
                  { label: 'Saturday', amount: 2400 },
                  { label: 'Sunday', amount: 1200 },
                ].map((day, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <p className="font-semibold text-slate-700">{day.label}</p>
                    <div className="flex items-center gap-3">
                      <div className="h-2 bg-slate-200 rounded-full" style={{ width: `${(day.amount / 3600) * 100}px` }} />
                      <p className="font-bold text-slate-900 w-20 text-right">₹{day.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payout Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-md p-8 text-center">
              <p className="text-slate-700 font-semibold">Current Balance Available for Payout</p>
              <p className="text-5xl font-bold text-purple-600 mt-2">₹{weeklyEarnings}</p>
              <p className="text-slate-600 text-sm mt-2">Minimum payout: ₹500</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRequestPayout}
                className="mt-6 px-8 py-3 rounded-lg font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <Download size={20} />
                Request Payout
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ============= PROFILE TAB ============= */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-slate-900">Your Profile</h2>

            <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                  <p className="text-lg text-slate-900 p-3 bg-slate-50 rounded-lg">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
                  <p className="text-lg text-slate-900 p-3 bg-slate-50 rounded-lg">Homemaker Chef</p>
                </div>
              </div>

              {user.chefProfile && (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Specialty</label>
                      <p className="text-lg text-slate-900 p-3 bg-slate-50 rounded-lg">
                        {user.chefProfile.specialty || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Kitchen Location</label>
                      <p className="text-lg text-slate-900 p-3 bg-slate-50 rounded-lg">
                        {user.chefProfile.kitchenLocation || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Details</label>
                    <p className="text-lg text-slate-900 p-3 bg-slate-50 rounded-lg">
                      {user.chefProfile.contactDetails || 'Not specified'}
                    </p>
                  </div>
                </>
              )}

              <div className="pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-4">
                  <span className="font-semibold">Verification Status:</span>
                </p>
                <div className="flex items-center gap-2">
                  {user.isVerified ? (
                    <>
                      <CheckCircle className="text-green-600" size={24} />
                      <span className="font-semibold text-green-600">Verified Homemaker Chef</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="text-yellow-600" size={24} />
                      <span className="font-semibold text-yellow-600">Under Verification</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default HomemakerDashboard;
