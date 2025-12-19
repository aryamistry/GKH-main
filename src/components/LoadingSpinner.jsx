import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-12 h-12 border-4 border-orange-200 border-t-primary rounded-full"
    />
    <p className="text-slate-600 font-medium">{message}</p>
  </div>
);

export default LoadingSpinner;
