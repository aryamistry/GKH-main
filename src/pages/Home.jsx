import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ChefCard from '../components/ChefCard';
import MealCard from '../components/MealCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { chefs, dishes } from '../mockData';

const steps = [
  { title: 'Browse', desc: 'Discover curated menus from verified home chefs.' },
  { title: 'Pre-order', desc: 'Reserve your meal in advance from trusted home chefs.' },
  { title: 'Enjoy', desc: 'Get warm, hygienic food made with care.' }
];

const Home = () => {
  const featuredMeals = dishes.slice(0, 3);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBecomeChefClick = () => {
    if (!user || user.role === 'guest') {
      // Not logged in - go directly to homemaker application form
      navigate('/chef-onboard');
    } else if (user.role === 'customer') {
      // Already a customer - ask if they want to switch roles
      alert('You\'ll need to apply as a homemaker. Your account will be converted.');
      navigate('/chef-onboard');
    } else if (user.role === 'chef') {
      // Already a chef - go to dashboard
      navigate('/chef-dashboard');
    }
  };

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold text-primary">Homemade • Hygienic • Heartfelt</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Warmth of Fresh, Hygienic, Homemade Meals.
          </h1>
          <p className="text-lg text-slate-600">
            Connect with talented home chefs around you and pre-order wholesome food made with love.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/explore"
              className="px-6 py-3 rounded-full bg-primary text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:scale-105 transition transform"
            >
              Explore Menu <ArrowRight size={18} />
            </Link>
            <button
              onClick={handleBecomeChefClick}
              className="px-6 py-3 rounded-full bg-white text-primary font-semibold border border-primary hover:bg-orange-50 hover:scale-105 transition transform"
            >
              Apply to Join as a Homemaker
            </button>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <CheckCircle className="text-accent" size={18} />
            5k+ happy customers enjoying ghar ka khana every week.
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute -z-10 inset-6 bg-secondary/30 blur-3xl rounded-full" />
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80"
            alt="Homemade food"
            className="rounded-[32px] shadow-2xl object-cover w-full h-[360px]"
          />
        </motion.div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(step => (
              <div key={step.title} className="bg-orange-50 rounded-2xl p-6 space-y-2">
                <p className="text-primary font-semibold">{step.title}</p>
                <p className="text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Featured Homemakers</h2>
            <button 
              onClick={handleBecomeChefClick}
              className="text-primary font-semibold text-sm hover:underline"
            >
              Apply to Join as Homemaker
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {chefs.map(chef => (
              <ChefCard key={chef.id} chef={chef} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Popular Pre-orders</h2>
            <Link to="/explore" className="text-primary font-semibold text-sm">
              View all
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredMeals.map(dish => (
              <MealCard key={dish.id} dish={dish} onSelect={() => navigate('/explore')} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


