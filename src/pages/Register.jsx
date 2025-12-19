import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleFromUrl = searchParams.get('role') === 'chef' ? 'chef' : 'customer';
  const [form, setForm] = useState({ name: '', email: '', password: '', role: roleFromUrl });
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    register({ name: form.name, role: form.role });
    // If registering as chef, go to chef onboarding form, not dashboard
    navigate(form.role === 'chef' ? '/chef-onboard' : '/explore');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-slate-900">Join Ghar Ka Khana</h2>
        <p className="text-slate-600">
          Whether you love cooking or savoring, sign up to pre-order or share your homemade dishes.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-6 space-y-4">
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
          <label className="text-sm font-semibold text-slate-700">Full name</label>
          <input
            type="text"
            className="w-full mt-1 border rounded-xl px-3 py-2 focus:outline-primary"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
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
          Create Account
        </button>
        <p className="text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;


