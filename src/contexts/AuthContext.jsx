import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Load users from localStorage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    // Check for a logged-in user session
    const sessionUser = localStorage.getItem('sessionUser');
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
  }, []);

  const updateUsersInStorage = (updatedUsers) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('sessionUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = (name, email, password) => {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return { success: false, message: 'An account with this email already exists.' };
    }
    const newUser = { id: `user-${Date.now()}`, name, email, password, subscribed: false, createdAt: new Date().toISOString() };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    updateUsersInStorage(updatedUsers);
    // Automatically log in the new user
    setUser(newUser);
    localStorage.setItem('sessionUser', JSON.stringify(newUser));
    return { success: true, message: 'Registration successful!' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sessionUser');
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    updateUsersInStorage(updatedUsers);
    if (user && user.id === userId) {
      logout();
    }
  };
  
  const updateUserSubscription = (userId, isSubscribed) => {
    const updatedUsers = users.map(u => u.id === userId ? { ...u, subscribed: isSubscribed } : u);
    setUsers(updatedUsers);
    updateUsersInStorage(updatedUsers);
    if (user && user.id === userId) {
      const updatedCurrentUser = { ...user, subscribed: isSubscribed };
      setUser(updatedCurrentUser);
      localStorage.setItem('sessionUser', JSON.stringify(updatedCurrentUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, users, login, register, logout, deleteUser, updateUserSubscription }}>
      {children}
    </AuthContext.Provider>
  );
};