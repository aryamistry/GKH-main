import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const PendingVerification = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Add a small delay to allow state to update
    const timer = setTimeout(() => {
      // Redirect if not in pending verification state
      if (user && user.verificationStatus !== 'pending_verification') {
        console.log('PendingVerification: User status is not pending, redirecting', user.verificationStatus);
        navigate('/');
      } else if (user && user.verificationStatus === 'pending_verification') {
        console.log('PendingVerification: User status is pending, showing page');
        setIsVerifying(false);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  if (isVerifying) {
    return <LoadingSpinner message="Verifying your application..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 space-y-6 text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse" />
            <CheckCircle className="text-green-600 relative" size={80} />
          </div>
        </motion.div>

        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Application Received! 🎉</h1>
          <p className="text-slate-600">Thank you for choosing to join Ghar Ka Khana</p>
        </div>

        {/* Main Message */}
        <div className="bg-orange-50 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-3 text-left">
            <Clock className="text-orange-600 flex-shrink-0" size={24} />
            <div>
              <p className="font-semibold text-slate-900">Under Review</p>
              <p className="text-sm text-slate-600">We're verifying your kitchen details</p>
            </div>
          </div>
          <div className="pt-3 border-t border-orange-200">
            <p className="text-sm text-slate-700">
              Our team will verify your kitchen safety, hygiene standards, and documentation within <span className="font-bold">24-48 hours</span>.
            </p>
          </div>
        </div>

        {/* What We're Checking */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-2">
          <p className="font-semibold text-slate-900 text-sm">What we're checking:</p>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>✓ Kitchen hygiene and safety standards</li>
            <li>✓ Location and accessibility</li>
            <li>✓ Contact information verification</li>
            <li>✓ Cooking experience and specialties</li>
          </ul>
        </div>

        {/* Email Notification */}
        <div className="flex items-center justify-center gap-2 text-sm text-slate-600 p-3 bg-blue-50 rounded-lg">
          <Mail size={16} className="text-blue-600" />
          <span>We'll notify you at your registered email</span>
        </div>

        {/* Next Steps */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <p className="text-sm font-semibold text-slate-900">What happens next?</p>
          <ol className="text-sm text-slate-600 space-y-2 text-left">
            <li className="flex gap-3">
              <span className="font-bold text-orange-600">1.</span>
              <span>Our team will review your application</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-600">2.</span>
              <span>We'll contact you for any additional details if needed</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-600">3.</span>
              <span>Once verified, you'll get full access to your dashboard</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-600">4.</span>
              <span>Start adding dishes and accepting pre-orders!</span>
            </li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 rounded-full bg-primary text-white font-semibold hover:shadow-lg transition"
          >
            Return to Home
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="w-full py-3 rounded-full border border-primary text-primary font-semibold hover:bg-orange-50 transition"
          >
            Have Questions? Contact Us
          </button>
        </div>

        {/* Footer Message */}
        <p className="text-xs text-slate-500 pt-2">
          Reference ID: GKK-{Date.now().toString().slice(-6)}
        </p>
      </motion.div>
    </div>
  );
};

export default PendingVerification;
