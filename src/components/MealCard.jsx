import React, { useState } from 'react';
import { Leaf, Flame, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { chefs } from '../mockData';

const MealCard = ({ dish, onSelect }) => {
  const chef = chefs.find(c => c.id === dish.chefId);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [addedNotification, setAddedNotification] = useState(false);

  const handlePreOrder = () => {
    // If not logged in, redirect to login
    if (user.role === 'guest') {
      navigate('/login', { state: { from: 'preorder', dish } });
      return;
    }

    // If logged in, add to cart and show notification
    addToCart(dish, { mealType: 'Lunch' });
    setAddedNotification(true);
    setTimeout(() => setAddedNotification(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden hover:-translate-y-1 transition transform relative">
      {addedNotification && (
        <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center z-10 backdrop-blur-sm">
          <div className="bg-white rounded-xl px-6 py-4 flex items-center gap-3 shadow-lg">
            <CheckCircle className="text-green-600" size={24} />
            <p className="font-semibold text-slate-900">Added to cart!</p>
          </div>
        </div>
      )}
      <img src={dish.image} alt={dish.name} className="h-48 w-full object-cover" />
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">{chef?.name}</p>
          <span
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
              dish.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {dish.isVeg ? <Leaf size={14} /> : <Flame size={14} />} {dish.isVeg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{dish.name}</h3>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs bg-amber-50 text-amber-700 rounded-full">Pre-Order Available</span>
            {dish.mealTypes && (
              <span className="text-xs text-slate-600">{dish.mealTypes.join(' / ')}</span>
            )}
          </div>
          <p className="text-lg font-bold text-primary">₹{dish.price}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onSelect(dish)}
            className="flex-1 py-2 rounded-full border border-primary text-primary font-semibold hover:bg-orange-50 transition"
          >
            View Details
          </button>
          <button
            onClick={handlePreOrder}
            className="flex-1 py-2 rounded-full bg-primary text-white font-semibold hover:shadow-lg transition"
          >
            Pre-order
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;


