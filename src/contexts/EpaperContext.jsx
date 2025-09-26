import React, { createContext, useState, useEffect } from 'react';

export const EpaperContext = createContext();

const initialEpapers = [
  { id: 'epaper-1', date: 'September 25, 2025', image: 'A realistic front page of a newspaper with the RISE XP masthead', fileUrl: 'https://horizons-cdn.hostinger.com/6fc8a877-4e24-451e-9b63-cc8d5682d748/sample-epaper.pdf' },
  { id: 'epaper-2', date: 'September 24, 2025', image: 'A realistic front page of a newspaper with a different headline', fileUrl: 'https://horizons-cdn.hostinger.com/6fc8a877-4e24-451e-9b63-cc8d5682d748/sample-epaper.pdf' },
  { id: 'epaper-3', date: 'September 23, 2025', image: 'A realistic front page of a newspaper with sports news', fileUrl: 'https://horizons-cdn.hostinger.com/6fc8a877-4e24-451e-9b63-cc8d5682d748/sample-epaper.pdf' },
];

export const EpaperProvider = ({ children }) => {
  const [epapers, setEpapers] = useState([]);

  useEffect(() => {
    try {
      const storedEpapers = localStorage.getItem('epapers');
      if (storedEpapers) {
        setEpapers(JSON.parse(storedEpapers));
      } else {
        setEpapers(initialEpapers);
        localStorage.setItem('epapers', JSON.stringify(initialEpapers));
      }
    } catch (error) {
      console.error("Failed to parse epapers from localStorage", error);
      setEpapers(initialEpapers);
    }
  }, []);

  const updateLocalStorage = (updatedEpapers) => {
    localStorage.setItem('epapers', JSON.stringify(updatedEpapers));
  };

  const addEpaper = (epaper) => {
    const newEpaper = { ...epaper, id: `epaper-${Date.now()}` };
    const updatedEpapers = [newEpaper, ...epapers];
    setEpapers(updatedEpapers);
    updateLocalStorage(updatedEpapers);
  };

  const updateEpaper = (updatedEpaper) => {
    const updatedEpapers = epapers.map(ep =>
      ep.id === updatedEpaper.id ? updatedEpaper : ep
    );
    setEpapers(updatedEpapers);
    updateLocalStorage(updatedEpapers);
  };

  const deleteEpaper = (epaperId) => {
    const updatedEpapers = epapers.filter(ep => ep.id !== epaperId);
    setEpapers(updatedEpapers);
    updateLocalStorage(updatedEpapers);
  };

  return (
    <EpaperContext.Provider value={{ epapers, addEpaper, updateEpaper, deleteEpaper }}>
      {children}
    </EpaperContext.Provider>
  );
};