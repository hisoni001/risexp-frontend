import React, { createContext, useState, useEffect } from 'react';

export const ImageContext = createContext();

const initialImages = [
  { id: 'img-1', url: 'https://images.unsplash.com/photo-1595872018818-97555653a011', alt: 'Indian Parliament building in New Delhi' },
  { id: 'img-2', url: 'https://images.unsplash.com/photo-1567443024551-f3e3cc2be870', alt: 'A cricketer diving to catch a ball' },
  { id: 'img-3', url: 'https://images.unsplash.com/photo-1626447857058-2ba6a8868cb5', alt: 'A fleet of modern electric cars charging' },
];

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    try {
      const storedImages = localStorage.getItem('imageLibrary');
      if (storedImages) {
        setImages(JSON.parse(storedImages));
      } else {
        setImages(initialImages);
        localStorage.setItem('imageLibrary', JSON.stringify(initialImages));
      }
    } catch (error) {
      console.error("Failed to parse images from localStorage", error);
      setImages(initialImages);
    }
  }, []);

  const updateLocalStorage = (updatedImages) => {
    localStorage.setItem('imageLibrary', JSON.stringify(updatedImages));
  };

  const addImage = (image) => {
    const newImage = { ...image, id: `img-${Date.now()}` };
    const updatedImages = [newImage, ...images];
    setImages(updatedImages);
    updateLocalStorage(updatedImages);
  };

  const deleteImage = (imageId) => {
    const updatedImages = images.filter(img => img.id !== imageId);
    setImages(updatedImages);
    updateLocalStorage(updatedImages);
  };

  return (
    <ImageContext.Provider value={{ images, addImage, deleteImage }}>
      {children}
    </ImageContext.Provider>
  );
};