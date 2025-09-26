import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Clock, User } from 'lucide-react';

const mockArticles = {
  india: [
    { id: 'india-gdp-growth', title: 'India\'s GDP Growth Surpasses Expectations', excerpt: 'The national economy shows strong signs of recovery post-pandemic.', author: 'Economic Times', time: '2h ago', image: 'Indian flag with a rising graph overlay' },
    { id: 'monsoon-update-2025', title: 'Monsoon Covers Entire Country, Boosts Agriculture', excerpt: 'The annual monsoon season has been beneficial for crop yields this year.', author: 'Weather Desk', time: '5h ago', image: 'Lush green farm fields during monsoon' },
  ],
  world: [
    { id: 'global-climate-summit', title: 'Global Leaders Convene for Climate Summit', excerpt: 'Nations pledge new commitments to combat climate change.', author: 'Reuters', time: '1h ago', image: 'World leaders sitting at a round table discussion' },
    { id: 'tech-breakthrough-ai', title: 'New AI Breakthrough Could Revolutionize Medicine', excerpt: 'Researchers announce a new model for disease prediction.', author: 'Tech Chronicle', time: '8h ago', image: 'Abstract digital art representing artificial intelligence' },
  ],
  cities: [
    { id: 'mumbai-metro-expansion', title: 'Mumbai Metro Expands to New Suburbs', excerpt: 'The new line is expected to ease traffic congestion significantly.', author: 'City News Network', time: '3h ago', image: 'A modern metro train at a station in Mumbai' },
  ],
  business: [
    { id: 'digital-revolution-upi', title: "India's Digital Revolution: The Rise of UPI and Fintech", excerpt: "A deep dive into how India's Unified Payments Interface (UPI) has transformed the digital payment landscape.", author: "Rohan Mehta", time: "2 hours ago", image: "Person making a UPI payment with a smartphone" },
  ],
  cricket: [
    { id: 'ipl-auction-splash', title: "IPL Auction: Teams Splash Cash on Star Players", author: "Sports Desk", time: "2h ago", image: "Cricket player hitting a six during an IPL match" },
    { id: 'bcci-world-cup-squad', title: "BCCI Announces Squad for Upcoming World Cup", author: "Cricket Correspondent", time: "4h ago", image: "Indian cricket team posing for a group photo" },
  ],
  default: [
    { id: 'default-article-1', title: 'No Specific Articles Found for this Category', excerpt: 'Please check back later for more updates or explore other categories.', author: 'RISE XP Bot', time: 'Just now', image: 'A magnifying glass over a newspaper' },
  ]
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const articles = mockArticles[categoryName] || mockArticles.default;
  const formattedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <>
      <Helmet>
        <title>{formattedCategoryName} News - RISE XP</title>
        <meta name="description" content={`Latest news and updates from the ${formattedCategoryName} category.`} />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-serif font-bold text-gray-900 border-b-4 border-red-600 pb-4 mb-8">
          {formattedCategoryName}
        </h1>
        <div className="space-y-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/article/${article.id}`}>
                <article className="grid grid-cols-1 md:grid-cols-3 gap-6 group cursor-pointer border-b border-gray-200 pb-8 last:border-b-0 last:pb-0">
                  <div className="md:col-span-1">
                    <img class="w-full h-48 object-cover rounded-lg" alt={article.image} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  </div>
                  <div className="md:col-span-2">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2 group-hover:underline">{article.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      <span>{article.author}</span>
                      <span className="mx-2">|</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{article.time}</span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default CategoryPage;