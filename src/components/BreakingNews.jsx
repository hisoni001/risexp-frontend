import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const BreakingNews = () => {
  const breakingNews = [
    "Sensex surges over 500 points in early trade",
    "ISRO announces new dates for Chandrayaan-4 mission",
    "Heavy rainfall expected in Mumbai over the next 48 hours",
    "Team India wins the final match of the cricket series",
    "Bollywood superstar announces next big project"
  ];

  return (
    <section className="bg-gray-900 text-white py-3 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="flex items-center space-x-2 mr-4 flex-shrink-0 bg-red-600 px-3 py-1 rounded">
            <Zap className="h-4 w-4" />
            <span className="font-bold text-sm uppercase tracking-wide">Breaking</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <motion.div
              className="flex space-x-12"
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {breakingNews.map((news, index) => (
                <span key={index} className="whitespace-nowrap text-sm font-medium">
                  {news}
                </span>
              ))}
               {breakingNews.map((news, index) => (
                <span key={`clone-${index}`} className="whitespace-nowrap text-sm font-medium">
                  {news}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreakingNews;