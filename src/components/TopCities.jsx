import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const TopCities = () => {
  const cities = [
    { name: "Mumbai", image: "Gateway of India in Mumbai at sunset" },
    { name: "Delhi", image: "India Gate in New Delhi with evening lights" },
    { name: "Bengaluru", image: "Vidhana Soudha in Bengaluru with gardens" },
    { name: "Kolkata", image: "Howrah Bridge in Kolkata over the Hooghly River" },
    { name: "Chennai", image: "Marina Beach in Chennai with a vibrant crowd" },
    { name: "Hyderabad", image: "Charminar in Hyderabad illuminated at night" }
  ];

  return (
    <section className="bg-gray-100 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-serif font-bold text-gray-900 border-b-4 border-red-600 pb-2 inline-block">News From Top Cities</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/category/${city.name.toLowerCase()}`}>
                <div className="relative rounded-lg overflow-hidden group cursor-pointer h-40">
                  <img class="w-full h-full object-cover" alt={city.image} src="https://images.unsplash.com/photo-1625314865991-4de8e9ec1bff" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-3">
                    <h3 className="text-white font-bold text-md group-hover:underline">{city.name}</h3>
                  </div>
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-8 w-8 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCities;