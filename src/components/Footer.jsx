import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-slate-900 text-white py-8 mt-16">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6">
      <div>
        <h3 className="text-lg font-semibold">Ghar Ka Khana</h3>
        <p className="text-sm text-slate-300 mt-2">
          Fresh, hygienic, homemade meals crafted by talented home chefs.
        </p>
      </div>
      <div className="flex gap-6">
        <div>
          <p className="font-semibold mb-2">Explore</p>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-white transition">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/chef-onboard" className="hover:text-white transition">
                Become a Chef
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Support</p>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>
              <Link to="/help" className="hover:text-white transition">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-4 mt-6 pt-6 border-t border-slate-700 text-center text-sm text-slate-400">
      <p>&copy; 2025 Ghar Ka Khana. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;


