import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';

const FeaturedArticles = () => {
  const articles = [
    {
      id: 'digital-revolution-upi',
      title: "India's Digital Revolution: The Rise of UPI and Fintech",
      excerpt: "A deep dive into how India's Unified Payments Interface (UPI) has transformed the digital payment landscape.",
      author: "Rohan Mehta",
      time: "2 hours ago",
      category: "Business",
      image: "Person making a UPI payment with a smartphone in a local Indian shop"
    },
    {
      id: 'great-indian-election',
      title: "The Great Indian Election: A Look at the World's Largest Democracy",
      excerpt: "Analyzing the complexities and scale of India's general elections, a monumental exercise in democratic participation.",
      author: "Anjali Singh",
      time: "5 hours ago",
      category: "Politics",
      image: "Large crowd at an Indian election rally with colorful flags"
    },
    {
      id: 'cricket-fever-passion',
      title: "Cricket Fever: Inside the Passion of India's Biggest Sport",
      excerpt: "Exploring the cultural significance of cricket in India, from street-side games to packed international stadiums.",
      author: "Vikram Patel",
      time: "8 hours ago",
      category: "Cricket",
      image: "Indian cricket fans cheering in a stadium with painted faces"
    },
    {
      id: 'bollywood-new-wave',
      title: "Bollywood's New Wave: Independent Cinema Gains Traction",
      excerpt: "Discover the independent filmmakers and actors who are changing the face of Indian cinema with compelling stories.",
      author: "Aisha Khan",
      time: "1 day ago",
      category: "Entertainment",
      image: "Vintage film camera with a reel of film"
    }
  ];

  return (
    <section className="bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-serif font-bold text-gray-900 border-b-4 border-red-600 pb-2 inline-block">Featured News</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link to={`/article/${article.id}`}>
              <article className="bg-white rounded-lg overflow-hidden group cursor-pointer border border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative">
                  <img class="w-full h-40 object-cover" alt={article.image} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 line-clamp-2 group-hover:underline">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mt-auto">
                    <User className="h-3 w-3 mr-1" />
                    <span>{article.author}</span>
                    <span className="mx-2">|</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{article.time}</span>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArticles;