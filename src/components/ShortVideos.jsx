import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, Maximize } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const videos = [
  { id: 1, title: "Mumbai's Monsoon Magic", thumbnail: "A dramatic shot of Mumbai's sea link bridge during monsoon", duration: "0:45" },
  { id: 2, title: "Street Food Tour in Delhi", thumbnail: "A vibrant collage of various Indian street foods", duration: "1:15" },
  { id: 3, title: "Unbelievable Catch in IPL", thumbnail: "A cricketer diving to catch a ball mid-air", duration: "0:25" },
  { id: 4, title: "Inside the New Parliament", thumbnail: "A grand interior view of the new Indian Parliament building", duration: "2:05" },
  { id: 5, title: "Tech Review: The Latest Gadget", thumbnail: "A sleek new smartphone being unboxed", duration: "1:30" },
];

const ShortVideos = () => {
  const [hoveredVideo, setHoveredVideo] = useState(null);

  const handlePlay = (e) => {
    e.stopPropagation();
    toast({
      title: "🚧 Video player coming soon!",
      description: "This feature is under construction. 🚀",
    });
  };

  return (
    <aside className="bg-card p-6 rounded-lg shadow-sm border">
      <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Short Videos</h2>
      <div className="space-y-4">
        {videos.map(video => (
          <motion.div
            key={video.id}
            className="relative rounded-lg overflow-hidden cursor-pointer group"
            onHoverStart={() => setHoveredVideo(video.id)}
            onHoverEnd={() => setHoveredVideo(null)}
            onClick={handlePlay}
          >
            <img class="w-full h-28 object-cover" alt={video.thumbnail} src="https://images.unsplash.com/photo-1567443024551-f3e3cc2be870" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-2 left-2 right-2 text-white">
              <h4 className="font-semibold text-sm leading-tight line-clamp-2">{video.title}</h4>
            </div>
            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
              {video.duration}
            </div>
            <AnimatePresence>
              {hoveredVideo === video.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center"
                >
                  <Play className="h-10 w-10 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </aside>
  );
};

export default ShortVideos;