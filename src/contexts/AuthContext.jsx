import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

const AuthContext = createContext();

const roles = ['guest', 'customer', 'chef'];

const defaultUser = { 
  name: 'Guest', 
  role: 'guest', 
  isVerified: false, 
  verificationStatus: 'none'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  // Initialize user from localStorage tokens (consumerToken / partnerToken)
  useEffect(() => {
    const partnerToken = localStorage.getItem('partnerToken');
    const consumerToken = localStorage.getItem('consumerToken');

    if (partnerToken) {
      const name = localStorage.getItem('partnerUser') || 'Homemaker';
      setUser({ ...defaultUser, name, role: 'chef', isVerified: true, verificationStatus: 'verified' });
    } else if (consumerToken) {
      const name = localStorage.getItem('consumerUser') || 'Foodie';
      setUser({ ...defaultUser, name, role: 'customer', isVerified: true, verificationStatus: 'verified' });
    } else {
      setUser(defaultUser);
    }
  }, []);

  const login = ({ name, role }) => {
    if (!role || !roles.includes(role)) {
      console.error('Invalid role provided to login:', role);
      role = 'customer';
    }
    const finalName = name || (role === 'chef' ? 'Homemaker' : 'Foodie');
    if (role === 'chef') {
      const token = `partner-token-${Date.now()}`;
      localStorage.setItem('partnerToken', token);
      localStorage.setItem('partnerUser', finalName);
      // store partnerName for UI display
      localStorage.setItem('partnerName', finalName);
      setUser({ name: finalName, role: 'chef', isVerified: false, verificationStatus: 'none' });
    } else {
      const token = `consumer-token-${Date.now()}`;
      localStorage.setItem('consumerToken', token);
      localStorage.setItem('consumerUser', finalName);
      setUser({ name: finalName, role: 'customer', isVerified: true, verificationStatus: 'none' });
    }
  };

  const register = ({ name, role }) => {
    const finalRole = roles.includes(role) ? role : 'customer';
    const finalName = name || (finalRole === 'chef' ? 'New Chef' : 'Foodie');
    if (finalRole === 'chef') {
      const token = `partner-token-${Date.now()}`;
      localStorage.setItem('partnerToken', token);
      localStorage.setItem('partnerUser', finalName);
      // store partnerName for UI display
      localStorage.setItem('partnerName', finalName);
      setUser({ name: finalName, role: 'chef', isVerified: false, verificationStatus: 'pending_verification' });
    } else {
      const token = `consumer-token-${Date.now()}`;
      localStorage.setItem('consumerToken', token);
      localStorage.setItem('consumerUser', finalName);
      setUser({ name: finalName, role: 'customer', isVerified: true, verificationStatus: 'verified' });
    }
  };

  const applyAsChef = ({ name, specialty, kitchenLocation, contactDetails }) => {
    setUser(prev => ({
      ...prev,
      name,
      role: 'chef',
      isVerified: false,
      verificationStatus: 'pending_verification',
      chefProfile: { specialty, kitchenLocation, contactDetails }
    }));
  };

  const verifyChef = () => {
    setUser(prev => ({
      ...prev,
      isVerified: true,
      verificationStatus: 'verified'
    }));
  };

  // Logout for consumer (called from consumer Navbar)
  const logout = () => {
    localStorage.removeItem('consumerToken');
    localStorage.removeItem('consumerUser');
    setUser(defaultUser);
  };

  const value = useMemo(() => ({ user, login, logout, register, applyAsChef, verifyChef }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);


