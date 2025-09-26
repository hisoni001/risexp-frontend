import React, { createContext, useState, useEffect } from 'react';

export const CategoryContext = createContext();

const initialCategories = [
  { id: 'cat-1', name: 'India' },
  { id: 'cat-2', name: 'World' },
  { id: 'cat-3', name: 'Cities' },
  { id: 'cat-4', name: 'Business' },
  { id: 'cat-5', name: 'Cricket' },
  { id: 'cat-6', name: 'Tech' },
  { id: 'cat-7', name: 'Entertainment' },
  { id: 'cat-8', name: 'Sports' },
];

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      const storedCategories = localStorage.getItem('categories');
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      } else {
        setCategories(initialCategories);
        localStorage.setItem('categories', JSON.stringify(initialCategories));
      }
    } catch (error) {
      console.error("Failed to parse categories from localStorage", error);
      setCategories(initialCategories);
    }
  }, []);

  const updateLocalStorage = (updatedCategories) => {
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const addCategory = (categoryName) => {
    const newCategory = { id: `cat-${Date.now()}`, name: categoryName };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    updateLocalStorage(updatedCategories);
  };

  const updateCategory = (updatedCategory) => {
    const updatedCategories = categories.map(cat =>
      cat.id === updatedCategory.id ? updatedCategory : cat
    );
    setCategories(updatedCategories);
    updateLocalStorage(updatedCategories);
  };

  const deleteCategory = (categoryId) => {
    const updatedCategories = categories.filter(cat => cat.id !== categoryId);
    setCategories(updatedCategories);
    updateLocalStorage(updatedCategories);
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};