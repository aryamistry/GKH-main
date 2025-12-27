import React, { createContext, useContext, useMemo, useState } from 'react';

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

  const login = ({ name, role }) => {
    if (!role || !roles.includes(role)) {
      console.error('Invalid role provided to login:', role);
      role = 'customer';
    }
    setUser({ 
      name: name || 'Foodie', 
      role: role,
      isVerified: role === 'chef' ? false : true,
      verificationStatus: role === 'chef' ? 'none' : 'none'
    });
  };

  const register = ({ name, role }) => {
    const finalRole = roles.includes(role) ? role : 'customer';
    setUser({ 
      name: name || 'New Chef', 
      role: finalRole,
      isVerified: false,
      verificationStatus: finalRole === 'chef' ? 'pending_verification' : 'verified'
    });
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

<<<<<<< HEAD
  const logout = () => {
    localStorage.removeItem('consumerToken');
    setUser(defaultUser);
  };
=======
  const logout = () => setUser(defaultUser);
>>>>>>> origin/main

  const value = useMemo(() => ({ user, login, logout, register, applyAsChef, verifyChef }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);


