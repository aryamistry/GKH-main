import React from 'react';
import { Star } from 'lucide-react';

const ChefCard = ({ chef }) => (
  <div className="min-w-[220px] bg-white glass rounded-2xl p-4 shadow-card">
    <div className="flex items-center gap-3">
      <img src={chef.avatar} alt={chef.name} className="w-14 h-14 rounded-full object-cover" />
      <div>
        <p className="font-semibold text-slate-900">{chef.name}</p>
        <p className="text-sm text-slate-500">{chef.specialty}</p>
      </div>
    </div>
    <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
      <span className="flex items-center gap-1">
        <Star size={16} className="text-amber-400" /> {chef.rating}
      </span>
      <span>{chef.dishesCount} dishes</span>
    </div>
  </div>
);

export default ChefCard;


