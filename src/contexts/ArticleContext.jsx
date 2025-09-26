import React, { createContext, useState, useEffect, useContext } from 'react';
import { CategoryContext } from '@/contexts/CategoryContext';

export const ArticleContext = createContext();

const initialArticles = [
  { id: 'govt-announces-new-budget', title: "Govt Announces New Budget Focusing on Rural Development", category: "India", author: "Priya Sharma", time: "1 hour ago", image: "Indian Parliament building in New Delhi during a sunny day", content: "The Finance Minister today unveiled a landmark Union Budget..." },
  { id: 'digital-revolution-upi', title: "India's Digital Revolution: The Rise of UPI and Fintech", category: "Business", author: "Rohan Mehta", time: "2 hours ago", image: "Person making a UPI payment with a smartphone in a local Indian shop", content: "A deep dive into how India's Unified Payments Interface (UPI) has transformed the digital payment landscape." },
  { id: 'ipl-auction-splash', title: "IPL Auction: Teams Splash Cash on Star Players", category: "Cricket", author: "Sports Desk", time: "2h ago", image: "Cricket player hitting a six during an IPL match", content: "The annual IPL auction saw record-breaking bids..." },
];

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const categoryContext = useContext(CategoryContext);

  useEffect(() => {
    try {
      const storedArticles = localStorage.getItem('articles');
      if (storedArticles) {
        setArticles(JSON.parse(storedArticles));
      } else {
        setArticles(initialArticles);
        localStorage.setItem('articles', JSON.stringify(initialArticles));
      }
    } catch (error) {
      console.error("Failed to parse articles from localStorage", error);
      setArticles(initialArticles);
    }
  }, []);

  const updateLocalStorage = (updatedArticles) => {
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
  };

  const addArticle = (article) => {
    const newArticle = { ...article, id: `article-${Date.now()}`, time: 'Just now' };
    const updatedArticles = [newArticle, ...articles];
    setArticles(updatedArticles);
    updateLocalStorage(updatedArticles);
  };

  const updateArticle = (updatedArticle) => {
    const updatedArticles = articles.map(article =>
      article.id === updatedArticle.id ? updatedArticle : article
    );
    setArticles(updatedArticles);
    updateLocalStorage(updatedArticles);
  };

  const deleteArticle = (articleId) => {
    const updatedArticles = articles.filter(article => article.id !== articleId);
    setArticles(updatedArticles);
    updateLocalStorage(updatedArticles);
  };

  const getArticlesByCategory = (categoryName) => {
    return articles.filter(article => article.category.toLowerCase() === categoryName.toLowerCase());
  };

  const getArticleById = (articleId) => {
    return articles.find(article => article.id === articleId);
  };

  return (
    <ArticleContext.Provider value={{ articles, addArticle, updateArticle, deleteArticle, getArticlesByCategory, getArticleById, categories: categoryContext?.categories || [] }}>
      {children}
    </ArticleContext.Provider>
  );
};