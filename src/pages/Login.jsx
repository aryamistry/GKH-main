import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const defaultRole = params.get('role') || 'customer';
  const [form, setForm] = useState({ email: '', password: '', role: defaultRole });
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    const userName = form.email.split('@')[0];
    login({ name: userName, role: form.role });
    // Persist separate tokens and partnerName per role
    if (form.role === 'chef') {
      localStorage.setItem('partnerToken', Date.now().toString());
      localStorage.setItem('partnerName', userName);
      navigate('/chef-dashboard');
    } else {
      localStorage.setItem('consumerToken', Date.now().toString());
      navigate('/explore');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Welcome back!</h2>
        <p className="text-slate-600">
          Continue your journey with fresh, homemade meals crafted by trusted home chefs.
        </p>
        <div className="mt-6 space-y-3 text-sm text-slate-600">
          <p>✔ Safe pre-orders for Lunch and Dinner</p>
          <p>✔ Verified chefs & hygienic kitchens</p>
          <p>✔ Easy reorders from your favorites</p>
        </div>
      </div>
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-card p-6 space-y-4"
      >
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setForm({ ...form, role: 'customer' })}
            className={`flex-1 py-2 rounded-xl font-semibold border ${
              form.role === 'customer' ? 'bg-primary text-white border-primary' : 'bg-white'
            }`}
          >
            I want to Eat
          </button>
          <button
            type="button"
            onClick={() => setForm({ ...form, role: 'chef' })}
            className={`flex-1 py-2 rounded-xl font-semibold border ${
              form.role === 'chef' ? 'bg-primary text-white border-primary' : 'bg-white'
            }`}
          >
            I want to Cook
          </button>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">Email</label>
          <input
            type="email"
            className="w-full mt-1 border rounded-xl px-3 py-2 focus:outline-primary"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">Password</label>
          <input
            type="password"
            className="w-full mt-1 border rounded-xl px-3 py-2 focus:outline-primary"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-primary text-white font-semibold hover:shadow-lg transition"
        >
          Login
        </button>
        <p className="text-sm text-slate-600">
          New here?{' '}
          <Link to="/register" className="text-primary font-semibold">
            Create an account
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;


