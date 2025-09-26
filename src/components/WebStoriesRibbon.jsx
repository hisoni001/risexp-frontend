import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Share2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const stories = [
  {
    id: 1,
    title: "India's EV Revolution",
    coverImage: "A fleet of modern electric cars charging in a futuristic station",
    pages: [
      { image: "A fleet of modern electric cars charging in a futuristic station", text: "India is on the brink of an Electric Vehicle revolution." },
      { image: "Close-up of an electric scooter's digital dashboard", text: "Two-wheelers are leading the charge in urban areas." },
      { image: "A massive solar farm powering an EV charging hub", text: "Government incentives and green energy are fueling the growth." },
      { image: "A family smiling in their new electric car", text: "Join the movement towards a cleaner, greener future." },
    ]
  },
  {
    id: 2,
    title: "IPL 2025 Highlights",
    coverImage: "A cricket stadium packed with cheering fans at night",
    pages: [
      { image: "A cricket stadium packed with cheering fans at night", text: "IPL 2025: A season of thrilling finishes and new records." },
      { image: "A batsman hitting a spectacular six under stadium lights", text: "Unbelievable power-hitting was on display all season." },
      { image: "A bowler celebrating wildly after taking a crucial wicket", text: "Game-changing moments that turned matches on their head." },
      { image: "The winning team lifting the IPL trophy amidst confetti", text: "Crowning the champions of an unforgettable tournament." },
    ]
  },
  {
    id: 3,
    title: "Himalayan Escapes",
    coverImage: "A breathtaking panoramic view of snow-capped Himalayan peaks",
    pages: [
      { image: "A breathtaking panoramic view of snow-capped Himalayan peaks", text: "Discover the serene beauty of the Himalayas." },
      { image: "A colorful prayer flag fluttering in the wind with mountains in the background", text: "Find peace and spirituality in the high-altitude monasteries." },
      { image: "A trekker standing on a ridge overlooking a deep valley", text: "Embark on an adventure of a lifetime." },
    ]
  },
  {
    id: 4,
    title: "Street Food of Delhi",
    coverImage: "A vibrant and colorful spread of Indian street food",
    pages: [
        { image: "A vibrant and colorful spread of Indian street food", text: "A culinary journey through the streets of Delhi." },
        { image: "Close-up of a vendor making spicy chaat", text: "Experience the explosion of flavors." },
    ]
  }
];

const StoryViewer = ({ story, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const controls = useAnimation();

  const nextPage = () => {
    setCurrentPage(prev => (prev < story.pages.length - 1 ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage(prev => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    controls.stop();
    controls.set({ width: "0%" });
    controls.start({
      width: "100%",
      transition: { duration: 5, ease: "linear" }
    }).then(nextPage);
  }, [currentPage, controls]);


  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link Copied!", description: "Web Story link copied to clipboard." });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative w-full max-w-[400px] h-[90vh] max-h-[800px] bg-gray-800 rounded-lg overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <img class="w-full h-full object-cover" alt={story.pages[currentPage].image}  src="https://images.unsplash.com/photo-1626447857058-2ba6a8868cb5" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <p className="absolute bottom-10 left-5 right-5 text-white text-2xl font-bold text-center">
              {story.pages[currentPage].text}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-2 left-2 right-2 flex gap-1">
          {story.pages.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white/30 rounded-full">
              {index === currentPage ? (
                <motion.div className="h-1 bg-white rounded-full" animate={controls} />
              ) : (
                <div className="h-1 rounded-full" style={{ width: index < currentPage ? '100%' : '0%', backgroundColor: 'white' }} />
              )}
            </div>
          ))}
        </div>

        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={handleShare}><Share2 /></Button>
          <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={onClose}><X /></Button>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1/2 z-0" onClick={prevPage}></div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0" onClick={nextPage}></div>
        <Button onClick={prevPage} variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"><ArrowLeft /></Button>
        <Button onClick={nextPage} variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"><ArrowRight /></Button>
      </div>
    </motion.div>
  );
};

const WebStoriesRibbon = () => {
  const [activeStory, setActiveStory] = useState(null);

  return (
    <>
      <section className="py-8 bg-white md:hidden">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 flex items-center">
            <BookOpen className="h-6 w-6 mr-3 text-red-600" />
            Web Stories
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
            {stories.map(story => (
              <motion.div
                key={story.id}
                className="relative rounded-lg overflow-hidden cursor-pointer h-64 w-40 flex-shrink-0 group"
                onClick={() => setActiveStory(story)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img class="w-full h-full object-cover" alt={story.coverImage} src="https://images.unsplash.com/photo-1626447857058-2ba6a8868cb5" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <h3 className="absolute bottom-3 left-3 right-3 text-white text-base font-bold leading-tight">{story.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <AnimatePresence>
        {activeStory && <StoryViewer story={activeStory} onClose={() => setActiveStory(null)} />}
      </AnimatePresence>
    </>
  );
};

export default WebStoriesRibbon;