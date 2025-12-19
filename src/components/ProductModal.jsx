import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductModal = ({ open, onClose, dish }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedMeal, setSelectedMeal] = useState(() => (dish?.mealTypes ? dish.mealTypes[0] : 'Lunch'));
  const [showNotification, setShowNotification] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  if (!open || !dish) return null;

  const handleAdd = () => {
    // If not logged in, redirect to login
    if (user.role === 'guest') {
      navigate('/login', { state: { from: 'modal_preorder', dish } });
      onClose();
      return;
    }

    // If logged in, add to cart
    setIsAdding(true);
    addToCart(dish, { mealType: selectedMeal });
    setShowNotification(true);
    
    setTimeout(() => {
      setIsAdding(false);
      setShowNotification(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <div className="relative">
            <img src={dish.image} alt={dish.name} className="w-full h-60 object-cover" />
            <button
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">{dish.name}</h3>
                <p className="text-slate-500 mt-1">{dish.description}</p>
              </div>
              <p className="text-2xl font-bold text-primary">₹{dish.price}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map(ing => (
                <span key={ing} className="px-3 py-1 rounded-full bg-orange-50 text-sm text-slate-700">
                  {ing}
                </span>
              ))}
            </div>
            <p className="text-sm text-slate-600">Approx calories: {dish.calories} kcal</p>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-700">Meal type</span>
                <div className="flex items-center gap-3">
                  {['Lunch', 'Dinner'].map(mt => (
                    <label key={mt} className={`px-3 py-2 rounded-full border cursor-pointer ${selectedMeal === mt ? 'bg-primary text-white' : 'bg-white'}`}>
                      <input
                        type="radio"
                        name="mealType"
                        value={mt}
                        checked={selectedMeal === mt}
                        onChange={() => setSelectedMeal(mt)}
                        className="hidden"
                      />
                      {mt}
                    </label>
                  ))}
                </div>
                <p className="text-sm text-slate-500">This is a pre-order item. Select Lunch or Dinner.</p>
              </label>
            </div>
            <button
              onClick={handleAdd}
              disabled={isAdding}
              className="w-full py-3 rounded-full bg-primary text-white font-semibold hover:shadow-lg transition disabled:opacity-70"
            >
              {isAdding ? 'Adding...' : user.role === 'guest' ? 'Login to Pre-order' : 'Add to Cart'}
            </button>
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 py-2 bg-green-50 rounded-full text-green-700 font-semibold"
              >
                <CheckCircle size={18} />
                Item added to cart!
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;


