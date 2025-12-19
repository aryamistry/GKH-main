import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const navLinkClass =
  'text-sm font-medium px-3 py-2 rounded-full hover:bg-orange-50 transition-colors';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();

  // Default to guest if user role is undefined or null
  const userRole = user?.role || 'guest';

  // Determine navbar items based on user role
  const getNavItems = () => {
    if (userRole === 'guest') {
      return (
        <>
          <NavLink to="/" className={navData => `${navLinkClass} ${navData.isActive ? 'text-primary' : 'text-slate-700'}`}>
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={navData => `${navLinkClass} ${navData.isActive ? 'text-primary' : 'text-slate-700'}`}
          >
            Explore Menu
          </NavLink>
        </>
      );
    } else if (userRole === 'customer') {
      // Hide 'Become a Chef' for customers
      return (
        <>
          <NavLink to="/" className={navData => `${navLinkClass} ${navData.isActive ? 'text-primary' : 'text-slate-700'}`}>
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={navData => `${navLinkClass} ${navData.isActive ? 'text-primary' : 'text-slate-700'}`}
          >
            Menu
          </NavLink>
        </>
      );
    } else if (userRole === 'chef') {
      // Hide 'Home' and 'Menu' for chefs, show dashboard-focused items
      return (
        <>
          <NavLink
            to="/chef-dashboard"
            className={navData => `${navLinkClass} ${navData.isActive ? 'text-primary' : 'text-slate-700'}`}
          >
            My Kitchen
          </NavLink>
          <NavLink
            to="/help"
            className={navData => `${navLinkClass} ${navData.isActive ? 'text-primary' : 'text-slate-700'}`}
          >
            Help
          </NavLink>
        </>
      );
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-orange-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          Ghar Ka Khana
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {getNavItems()}
        </nav>
        <div className="flex items-center gap-3">
          {userRole === 'guest' ? (
            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:shadow-lg transition"
            >
              Login / Signup
            </Link>
          ) : (
            <>
              <Link
                to="/cart"
                className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-orange-50 text-primary"
              >
                <ShoppingBag size={18} />
                <span className="text-sm font-semibold">Cart</span>
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full px-1.5">
                    {items.length}
                  </span>
                )}
              </Link>
              <Link
                to={userRole === 'chef' ? '/chef-dashboard' : '/customer-dashboard'}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-accent text-white text-sm font-semibold"
              >
                <User size={18} />
                <span>{user.name}</span>
              </Link>
              <button
                className="p-2 rounded-full hover:bg-orange-50 text-slate-700"
                onClick={logout}
              >
                <LogOut size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;


