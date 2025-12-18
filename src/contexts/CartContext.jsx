import React, { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToCart = (dish, { mealType }) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === dish.id && i.mealType === mealType);
      if (existing) {
        return prev.map(i => (i.id === dish.id && i.mealType === mealType ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...dish, quantity: 1, mealType }];
    });
  };

  const removeFromCart = id => setItems(prev => prev.filter(i => i.id !== id));

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, clearCart, total }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);


