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
  const [finalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    // 🔐 Capture total BEFORE clearing cart
    setFinalTotal(total);

    if (items.length > 0) {
      clearCart();
    }

    setIsReady(true);
  }, []);

  if (!isReady) {
    return <LoadingSpinner message="Confirming order..." />;
  }

  const orderId = `GKK-${Date.now().toString().slice(-8)}`;
  const tax = Math.round(finalTotal * 0.18);
  const grandTotal = Math.round(finalTotal + tax);

  const deliveryTime = new Date(
    Date.now() + 2 * 60 * 60 * 1000
  ).toLocaleTimeString('en-US', {
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
        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-8 text-center">
          <CheckCircle className="text-white mx-auto mb-4" size={80} />
          <h1 className="text-3xl font-bold text-white">Order Confirmed!</h1>
          <p className="text-green-100 mt-2">Your delicious meal is on the way</p>
        </div>

        <div className="p-8 space-y-6">
          {/* Order ID */}
          <div className="bg-green-50 rounded-xl p-4 text-center border">
            <p className="text-sm text-green-700 font-semibold">Order ID</p>
            <p className="text-lg font-bold text-green-900">{orderId}</p>
          </div>

          {/* Order Amount */}
          <div className="border-t-2 pt-4">
            <div className="flex justify-between mb-2">
              <p className="text-slate-600">Order Total</p>
              <p className="font-semibold">₹{finalTotal}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-slate-600">Tax (18%)</p>
              <p className="font-semibold">₹{tax}</p>
            </div>
            <div className="flex justify-between text-lg">
              <p className="font-bold">Total Paid</p>
              <p className="font-bold text-green-600">₹{grandTotal}</p>
            </div>
          </div>

          {/* Actions */}
          <button
            onClick={() => navigate('/customer-dashboard')}
            className="w-full py-3 rounded-full bg-primary text-white font-semibold"
          >
            View Order Status
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;