import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';

const Hero = () => {
  const mainStory = {
    id: 'govt-announces-new-budget',
    title: "Govt Announces New Budget Focusing on Rural Development",
    excerpt: "The Union Budget aims to boost the rural economy with significant investments in agriculture, infrastructure, and social welfare schemes across India.",
    author: "Priya Sharma",
    time: "1 hour ago",
    image: "Indian Parliament building in New Delhi during a sunny day"
  };

  const topStories = [
    { id: 'sensex-hits-record-high', title: "Sensex hits record high amid global cues", image: "Stock market screen showing bullish trends" },
    { id: 'isro-prepares-lunar-mission', title: "ISRO prepares for next lunar mission", image: "ISRO rocket on a launchpad" },
    { id: 'startup-ecosystem-funding-boom', title: "India's startup ecosystem sees funding boom", image: "Modern office with young professionals collaborating" },
    { id: 'delhi-mumbai-highway', title: "New highway to connect Delhi and Mumbai in record time", image: "A long, modern expressway stretching into the distance" }
  ];

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Story */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link to={`/article/${mainStory.id}`}>
            <article className="relative group cursor-pointer">
              <img class="w-full h-[450px] object-cover rounded-lg" alt={mainStory.image} src="https://images.unsplash.com/photo-1694972341406-4b6ff58053c9" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg"></div>
              <div className="absolute bottom-0 p-6 text-white">
                <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-3 group-hover:underline">
                  {mainStory.title}
                </h1>
                <p className="hidden md:block text-lg text-gray-200 mb-4">
                  {mainStory.excerpt}
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{mainStory.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{mainStory.time}</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </motion.div>

        {/* Top Stories */}
        <motion.div
          className="flex flex-col space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-xl font-serif font-bold text-gray-900 border-b-4 border-red-600 pb-2">
            Top Stories
          </h2>
          <div className="space-y-4">
            {topStories.map((story) => (
              <Link to={`/article/${story.id}`} key={story.id}>
                <article className="flex items-center space-x-4 group cursor-pointer">
                  <img class="w-24 h-20 object-cover rounded-md flex-shrink-0" alt={story.image} src="https://images.unsplash.com/photo-1626447857058-2ba6a8868cb5" />
                  <h3 className="font-semibold text-gray-800 leading-snug group-hover:underline">
                    {story.title}
                  </h3>
                </article>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;