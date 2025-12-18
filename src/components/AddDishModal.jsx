import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AddDishModal = ({ open, onClose, onAdd }) => {
  const [form, setForm] = useState({ name: '', price: '', mealType: 'Lunch', available: true, isVeg: true, image: '' });

  if (!open) return null;

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    onAdd({ ...form, price: Number(form.price), id: `new-${Date.now()}` });
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>
          <div className="relative p-5">
            <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow" onClick={onClose}>
              <X size={18} />
            </button>
            <h3 className="text-2xl font-semibold text-slate-900 mb-3">Add New Dish</h3>
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
                    <button type="button" key={mt} onClick={() => setForm({ ...form, mealType: mt })} className={`px-3 py-2 rounded-full border ${form.mealType === mt ? 'bg-primary text-white' : 'bg-white'}`}>
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
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.isVeg} onChange={e => setForm({ ...form, isVeg: e.target.checked })} />
                  <span className="text-sm">Veg</span>
                </label>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Image URL (optional)</label>
                <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full mt-1 border rounded-xl px-3 py-2" />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-6 py-2 rounded-full bg-primary text-white font-semibold">Add Dish</button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddDishModal;
