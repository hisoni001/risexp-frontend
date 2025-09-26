import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Building, Users, Target } from 'lucide-react';

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us - RISE XP</title>
        <meta name="description" content="Learn about RISE XP, our mission, vision, and the team behind the news." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-4xl font-serif font-bold text-gray-900 border-b-4 border-red-600 pb-4 mb-8">
          About RISE XP
        </h1>
        
        <div className="prose max-w-none lg:prose-lg text-gray-700 leading-relaxed">
          <p className="text-xl">
            Welcome to RISE XP, your most trusted source for credible, unbiased, and timely news. In a world inundated with information, we strive to bring you clarity and truth.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 my-12">
            <div className="flex items-start space-x-4">
              <Target className="h-12 w-12 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-serif font-bold mt-0">Our Mission</h2>
                <p>To empower our readers with accurate, in-depth, and insightful news coverage that helps them understand the world and make informed decisions. We are committed to journalistic integrity and excellence.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Building className="h-12 w-12 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-serif font-bold mt-0">Our Vision</h2>
                <p>To be the leading digital news platform in India, recognized for our quality journalism, innovative storytelling, and deep connection with our audience. We aim to build a more informed and engaged society.</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-serif font-bold">Meet the Team</h2>
          <p>
            RISE XP is powered by a dedicated team of experienced journalists, editors, designers, and technologists who are passionate about news and storytelling. Our diverse team works around the clock to bring you stories from every corner of the globe.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center my-12">
            <div>
              <img class="w-32 h-32 rounded-full mx-auto mb-4 object-cover bg-gray-200" alt="Team member portrait" src="https://images.unsplash.com/photo-1684262855344-b9da453a7934" />
              <h3 className="font-bold text-lg m-0">Priya Sharma</h3>
              <p className="text-sm text-gray-500 m-0">Editor-in-Chief</p>
            </div>
            <div>
              <img class="w-32 h-32 rounded-full mx-auto mb-4 object-cover bg-gray-200" alt="Team member portrait" src="https://images.unsplash.com/photo-1642257859842-c95f9fa8121d" />
              <h3 className="font-bold text-lg m-0">Rohan Mehta</h3>
              <p className="text-sm text-gray-500 m-0">Head of Business News</p>
            </div>
            <div>
              <img class="w-32 h-32 rounded-full mx-auto mb-4 object-cover bg-gray-200" alt="Team member portrait" src="https://images.unsplash.com/photo-1669720229052-89cda125fc3f" />
              <h3 className="font-bold text-lg m-0">Anjali Singh</h3>
              <p className="text-sm text-gray-500 m-0">Lead Political Correspondent</p>
            </div>
            <div>
              <img class="w-32 h-32 rounded-full mx-auto mb-4 object-cover bg-gray-200" alt="Team member portrait" src="https://images.unsplash.com/photo-1621791471103-41f050bdcd68" />
              <h3 className="font-bold text-lg m-0">Vikram Patel</h3>
              <p className="text-sm text-gray-500 m-0">Chief Sports Editor</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AboutUs;