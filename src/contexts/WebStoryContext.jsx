import React, { createContext, useState, useEffect } from 'react';

export const WebStoryContext = createContext();

const initialStories = [
  {
    id: 1,
    title: "India's EV Revolution",
    coverImage: "A fleet of modern electric cars charging in a futuristic station",
    pages: [
      { image: "A fleet of modern electric cars charging in a futuristic station", text: "India is on the brink of an Electric Vehicle revolution." },
      { image: "Close-up of an electric scooter's digital dashboard", text: "Two-wheelers are leading the charge in urban areas." },
    ]
  },
  {
    id: 2,
    title: "IPL 2025 Highlights",
    coverImage: "A cricket stadium packed with cheering fans at night",
    pages: [
      { image: "A cricket stadium packed with cheering fans at night", text: "IPL 2025: A season of thrilling finishes and new records." },
      { image: "A batsman hitting a spectacular six under stadium lights", text: "Unbelievable power-hitting was on display all season." },
    ]
  },
];

export const WebStoryProvider = ({ children }) => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    try {
      const storedStories = localStorage.getItem('webStories');
      if (storedStories) {
        setStories(JSON.parse(storedStories));
      } else {
        setStories(initialStories);
        localStorage.setItem('webStories', JSON.stringify(initialStories));
      }
    } catch (error) {
      console.error("Failed to parse web stories from localStorage", error);
      setStories(initialStories);
    }
  }, []);

  const updateLocalStorage = (updatedStories) => {
    localStorage.setItem('webStories', JSON.stringify(updatedStories));
  };

  const addStory = (story) => {
    const newStory = { ...story, id: `story-${Date.now()}`, pages: story.pages || [] };
    const updatedStories = [newStory, ...stories];
    setStories(updatedStories);
    updateLocalStorage(updatedStories);
  };

  const updateStory = (updatedStory) => {
    const updatedStories = stories.map(s =>
      s.id === updatedStory.id ? updatedStory : s
    );
    setStories(updatedStories);
    updateLocalStorage(updatedStories);
  };

  const deleteStory = (storyId) => {
    const updatedStories = stories.filter(s => s.id !== storyId);
    setStories(updatedStories);
    updateLocalStorage(updatedStories);
  };

  return (
    <WebStoryContext.Provider value={{ stories, addStory, updateStory, deleteStory }}>
      {children}
    </WebStoryContext.Provider>
  );
};