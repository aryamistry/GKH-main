import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AddDishModal = ({ open, onClose, onAdd }) => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    mealType: 'Lunch',
    available: true,
    isVeg: true, // Always veg for Ghar Ka Khana
    image: ''
  });

  if (!open) return null;

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    onAdd({ ...form, isVeg: true, price: Number(form.price), id: `new-${Date.now()}` });
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>
          <div className="relative p-5">
            <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow" onClick={onClose}>
              <X size={18} />
            </button>
            <h3 className="text-2xl font-semibold text-slate-900 mb-1">Add New Dish</h3>
            <p className="text-sm font-semibold text-green-700 bg-green-50 border border-green-100 px-3 py-1 rounded-full inline-flex items-center gap-2">
              100% Veg Only
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-slate-700">Dish name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full mt-1 border rounded-xl px-3 py-2" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Price (₹)</label>
                <input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} type="number" className="w-full mt-1 border rounded-xl px-3 py-2" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Meal type</label>
                <div className="flex gap-2 mt-2">
                  {['Lunch', 'Dinner'].map(mt => (
                    <button
                      type="button"
                      key={mt}
                      onClick={() => setForm({ ...form, mealType: mt })}
                      className={`px-3 py-2 rounded-full border text-sm font-semibold transition-colors ${
                        form.mealType === mt
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'bg-white border-orange-200 text-orange-700 hover:border-orange-400'
                      }`}
                    >
                      {mt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.available} onChange={e => setForm({ ...form, available: e.target.checked })} />
                  <span className="text-sm">Available</span>
                </label>
                <span className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                  Always Veg
                </span>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Image URL (optional)</label>
                <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full mt-1 border rounded-xl px-3 py-2" />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors"
                >
                  Add Dish
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddDishModal;
