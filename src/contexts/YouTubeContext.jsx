import React, { createContext, useState, useEffect } from 'react';

export const YouTubeContext = createContext();

const initialVideos = [
  { id: 'yt-1', videoId: 'dQw4w9WgXcQ', title: 'Official Music Video', description: 'A classic hit.' },
  { id: 'yt-2', videoId: 'rokGy0huYEA', title: 'Learn React in 15 Minutes', description: 'A quick tutorial for beginners.' },
];

export const YouTubeProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    try {
      const storedVideos = localStorage.getItem('youtubeVideos');
      if (storedVideos) {
        setVideos(JSON.parse(storedVideos));
      } else {
        setVideos(initialVideos);
        localStorage.setItem('youtubeVideos', JSON.stringify(initialVideos));
      }
    } catch (error) {
      console.error("Failed to parse YouTube videos from localStorage", error);
      setVideos(initialVideos);
    }
  }, []);

  const updateLocalStorage = (updatedVideos) => {
    localStorage.setItem('youtubeVideos', JSON.stringify(updatedVideos));
  };

  const addVideo = (video) => {
    const newVideo = { ...video, id: `yt-${Date.now()}` };
    const updatedVideos = [newVideo, ...videos];
    setVideos(updatedVideos);
    updateLocalStorage(updatedVideos);
  };

  const updateVideo = (updatedVideo) => {
    const updatedVideos = videos.map(v =>
      v.id === updatedVideo.id ? updatedVideo : v
    );
    setVideos(updatedVideos);
    updateLocalStorage(updatedVideos);
  };

  const deleteVideo = (videoId) => {
    const updatedVideos = videos.filter(v => v.id !== videoId);
    setVideos(updatedVideos);
    updateLocalStorage(updatedVideos);
  };

  return (
    <YouTubeContext.Provider value={{ videos, addVideo, updateVideo, deleteVideo }}>
      {children}
    </YouTubeContext.Provider>
  );
};