import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { clearCart, items, total } = useCart();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Clear cart after order and mark as ready
    if (items.length > 0) {
      clearCart();
    }
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <LoadingSpinner message="Confirming order..." />;
  }

  const orderId = `GKK-${Date.now().toString().slice(-8)}`;
  const deliveryTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header with Success Icon */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-8 text-center relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="flex justify-center mb-4"
          >
            <CheckCircle className="text-white" size={80} />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">Order Confirmed!</h1>
          <p className="text-green-100 mt-2">Your delicious meal is on the way</p>
        </div>

        <div className="p-8 space-y-6">
          {/* Order ID */}
          <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
            <p className="text-sm text-green-700 font-semibold">Order ID</p>
            <p className="text-lg font-bold text-green-900 mt-1">{orderId}</p>
          </div>

          {/* Order Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="text-blue-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-xs text-blue-600 font-semibold">Estimated Delivery</p>
                <p className="text-sm font-bold text-blue-900">{deliveryTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <MapPin className="text-purple-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-xs text-purple-600 font-semibold">Delivery Address</p>
                <p className="text-sm font-bold text-purple-900">Your Saved Address</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <Phone className="text-orange-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-xs text-orange-600 font-semibold">Track Your Order</p>
                <p className="text-sm font-bold text-orange-900">Live Updates via SMS</p>
              </div>
            </div>
          </div>

          {/* Order Amount */}
          <div className="border-t-2 border-slate-200 pt-4">
            <div className="flex justify-between mb-2">
              <p className="text-slate-600">Order Total</p>
              <p className="font-semibold">₹{total}</p>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-slate-600">Tax (18%)</p>
              <p className="font-semibold">₹{Math.round(total * 0.18)}</p>
            </div>
            <div className="flex justify-between text-lg">
              <p className="font-bold">Total Paid</p>
              <p className="font-bold text-green-600">₹{Math.round(total * 1.18)}</p>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-slate-50 rounded-xl p-4 space-y-2">
            <p className="font-semibold text-slate-900 text-sm">What happens next:</p>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>✓ Order confirmed and chef notified</li>
              <li>✓ Meal preparation starts immediately</li>
              <li>✓ You'll receive tracking updates</li>
              <li>✓ Enjoy your fresh, homemade meal!</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/customer-dashboard')}
              className="w-full py-3 rounded-full bg-primary text-white font-semibold hover:shadow-lg transition"
            >
              View Order Status
            </button>
            <button
              onClick={() => navigate('/explore')}
              className="w-full py-3 rounded-full border border-primary text-primary font-semibold hover:bg-orange-50 transition"
            >
              Order More Meals
            </button>
          </div>

          {/* Thank You Message */}
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              Thank you for supporting <span className="font-bold">Ghar Ka Khana</span>! 🙏
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
