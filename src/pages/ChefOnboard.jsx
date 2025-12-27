import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp } from 'lucide-react';

const ChefOnboard = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState('intro');
  const [ordersPerDay, setOrdersPerDay] = useState(10);
  const [formData, setFormData] = useState({
    fullName: '',
    specialty: '',
    kitchenLocation: '',
    contactDetails: ''
  });
  const [errors, setErrors] = useState({});

  const monthlyEarnings = (ordersPerDay * 100 * 25 * 0.85).toFixed(0); // avg price * days * 85% (15% commission)

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.specialty.trim()) newErrors.specialty = 'Specialty is required';
    if (!formData.kitchenLocation.trim()) newErrors.kitchenLocation = 'Kitchen location is required';
    if (!formData.contactDetails.trim()) newErrors.contactDetails = 'Contact details are required';
    if (formData.contactDetails && !/^\d{10}$/.test(formData.contactDetails.replace(/\D/g, ''))) {
      newErrors.contactDetails = 'Please enter a valid 10-digit phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log('ChefOnboard: Submitting form with name:', formData.fullName);
    // Register (or convert) user to chef role with pending verification
    register({ name: formData.fullName, role: 'chef' });
    console.log('ChefOnboard: After register, navigating to /pending-verification');
    navigate('/pending-verification');
  };

  if (step === 'intro') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-primary mb-2">START EARNING TODAY</p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Turn Your Cooking Into Income
              </h1>
            </div>
            <p className="text-lg text-slate-600">
              Share your homemade meals with your neighborhood through Ghar Ka Khana. It's simple, flexible, and rewarding.
            </p>

            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <CheckCircle className="text-accent mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-slate-900">Set Your Menu</p>
                  <p className="text-sm text-slate-600">Add your signature dishes with prices</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle className="text-accent mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-slate-900">Accept Pre-Orders</p>
                  <p className="text-sm text-slate-600">Customers pre-order for Lunch or Dinner</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle className="text-accent mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-slate-900">Earn & Grow</p>
                  <p className="text-sm text-slate-600">Keep 85% of what you earn, we take 15%</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep('form')}
              className="px-8 py-3 rounded-full bg-primary text-white font-semibold hover:shadow-lg transition inline-block"
            >
              Get Started
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 space-y-6"
          >
            <div className="space-y-2">
              <p className="text-slate-600">Earnings Estimate</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-primary">₹{monthlyEarnings}</p>
                <p className="text-slate-600">per month</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 space-y-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-700">Orders per day</span>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={ordersPerDay}
                    onChange={e => setOrdersPerDay(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-lg font-bold text-primary w-12">{ordersPerDay}</span>
                </div>
              </label>
              <p className="text-xs text-slate-500">Adjust to see your earning potential</p>
            </div>

            <div className="bg-white rounded-2xl p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <TrendingUp className="text-accent" size={18} /> Based on ₹100 avg price per meal
              </p>
              <p className="text-xs text-slate-500">
                {ordersPerDay} orders/day × 25 working days × ₹100 × 85% after 15% commission
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Complete Your Profile</h1>
          <p className="text-slate-600">We need a few details to get you started selling your delicious food.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Your full name"
              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors.fullName ? 'border-red-500' : 'border-orange-100'
              }`}
            />
            {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Specialty</label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleInputChange}
              placeholder="e.g., North Indian, Gujarati Thali, Healthy Bowls"
              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors.specialty ? 'border-red-500' : 'border-orange-100'
              }`}
            />
            {errors.specialty && <p className="text-red-600 text-sm mt-1">{errors.specialty}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Kitchen Location</label>
            <input
              type="text"
              name="kitchenLocation"
              value={formData.kitchenLocation}
              onChange={handleInputChange}
              placeholder="e.g., Bandra, Mumbai"
              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors.kitchenLocation ? 'border-red-500' : 'border-orange-100'
              }`}
            />
            {errors.kitchenLocation && <p className="text-red-600 text-sm mt-1">{errors.kitchenLocation}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Details</label>
            <input
              type="tel"
              name="contactDetails"
              value={formData.contactDetails}
              onChange={handleInputChange}
              placeholder="10-digit mobile number"
              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors.contactDetails ? 'border-red-500' : 'border-orange-100'
              }`}
            />
            {errors.contactDetails && <p className="text-red-600 text-sm mt-1">{errors.contactDetails}</p>}
          </div>

          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Note:</span> You'll undergo verification for food safety and kitchen inspection. This typically takes 2-3 business days.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setStep('intro')}
              className="flex-1 py-3 rounded-full border border-primary text-primary font-semibold hover:bg-orange-50 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-full bg-primary text-white font-semibold hover:shadow-lg transition"
            >
              Apply to Join as Homemaker
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ChefOnboard;
