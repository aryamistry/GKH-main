import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
    <p className="text-sm font-semibold text-primary">404</p>
    <h1 className="text-4xl font-bold text-slate-900">Page not found</h1>
    <p className="text-slate-600">
      The page you are looking for does not exist. Please return to the homepage.
    </p>
    <Link to="/" className="inline-block px-6 py-3 rounded-full bg-primary text-white font-semibold">
      Go Home
    </Link>
  </div>
);

export default NotFound;


