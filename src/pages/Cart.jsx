import React, { useState } from 'react';
import { CheckCircle2, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) {
      setShowWarning(true);
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Your Cart</h2>
          <p className="text-slate-600">Summary of your pre-ordered meals</p>
        </div>
        <button onClick={clearCart} className="text-sm text-red-600 hover:underline">
          Clear all
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-card">
        {items.length === 0 ? (
          <p className="p-6 text-slate-500">Your cart is empty.</p>
        ) : (
          <div className="divide-y">
            {items.map(item => (
              <div key={item.id + (item.mealType || '')} className="p-4 flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.mealType || 'Pre-order'}</p>
                  <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-slate-900">₹{item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 rounded-full hover:bg-orange-50 text-slate-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-card p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">Total</p>
          <p className="text-2xl font-bold text-slate-900">₹{total}</p>
        </div>
        <button onClick={handleCheckout} className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:shadow-lg transition">
          Proceed to Checkout
        </button>
      </div>

      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 bg-white shadow-2xl rounded-2xl p-4 flex items-center gap-3 border border-yellow-100"
          >
            <p className="font-semibold text-slate-900">Your cart is empty</p>
            <button onClick={() => setShowWarning(false)} className="text-sm text-primary">
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;


