import React, { useMemo, useState } from 'react';
import MealCard from '../components/MealCard';
import ProductModal from '../components/ProductModal';
import { dishes } from '../mockData';

const Explore = () => {
  const [filter, setFilter] = useState({ type: 'all' });
  const [selectedDish, setSelectedDish] = useState(null);

  const filteredDishes = useMemo(
    () =>
      dishes.filter(d => {
        if (filter.type === 'all') return true;
        if (filter.type === 'veg') return d.isVeg;
        return !d.isVeg;
      }),
    [filter]
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Explore Menu</h2>
          <p className="text-slate-600">
            Pre-order homemade meals from local chefs.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {['all', 'veg', 'nonveg'].map(type => (
            <button
              key={type}
              onClick={() => setFilter({ type })}
              className={`px-4 py-2 rounded-full border text-sm font-semibold ${
                filter.type === type
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white'
              }`}
            >
              {type === 'all' ? 'All' : type === 'veg' ? 'Veg' : 'Non-Veg'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {filteredDishes.map(dish => (
          <MealCard
            key={dish.id}
            dish={dish}
            onSelect={setSelectedDish}
          />
        ))}

        {filteredDishes.length === 0 && (
          <p className="text-slate-500">No meals match your selection.</p>
        )}
      </div>

      <ProductModal
        open={!!selectedDish}
        onClose={() => setSelectedDish(null)}
        dish={selectedDish}
      />
    </div>
  );
};

export default Explore;