import React, { useMemo, useState } from 'react';
import MealCard from '../components/MealCard';
import ProductModal from '../components/ProductModal';
import { dishes } from '../mockData';

const Explore = () => {
  const [filter, setFilter] = useState({ type: 'all', price: 500 });
  const [selectedDish, setSelectedDish] = useState(null);

  const filteredDishes = useMemo(
    () =>
      dishes.filter(d => {
        const typeMatch = filter.type === 'all' ? true : filter.type === 'veg' ? d.isVeg : !d.isVeg;
        return typeMatch && d.price <= filter.price;
      }),
    [filter]
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Explore Menu</h2>
          <p className="text-slate-600">Pre-order homemade meals from local chefs.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {['all', 'veg', 'nonveg'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(prev => ({ ...prev, type }))}
              className={`px-4 py-2 rounded-full border text-sm font-semibold ${
                filter.type === type ? 'bg-primary text-white border-primary' : 'bg-white'
              }`}
            >
              {type === 'all' ? 'All' : type === 'veg' ? 'Veg' : 'Non-Veg'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-1 bg-white rounded-2xl shadow-card p-4 h-fit">
          <h3 className="font-semibold text-slate-900 mb-4">Filters</h3>
          <label className="block mb-4">
            <span className="text-sm text-slate-600">Max price: ₹{filter.price}</span>
            <input
              type="range"
              min="200"
              max="600"
              value={filter.price}
              onChange={e => setFilter(prev => ({ ...prev, price: Number(e.target.value) }))}
              className="w-full"
            />
          </label>
          {/* Delivery time removed - pre-orders only */}
        </div>
        <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
          {filteredDishes.map(dish => (
            <MealCard key={dish.id} dish={dish} onSelect={setSelectedDish} />
          ))}
          {filteredDishes.length === 0 && (
            <p className="text-slate-500">No meals match your filters.</p>
          )}
        </div>
      </div>

      <ProductModal open={!!selectedDish} onClose={() => setSelectedDish(null)} dish={selectedDish} />
    </div>
  );
};

export default Explore;


