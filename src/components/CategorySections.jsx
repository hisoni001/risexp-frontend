import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, User, Landmark, Dribbble, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CategorySections = () => {
  const categories = [
    {
      name: "Politics",
      icon: Landmark,
      articles: [
        { id: 'state-assembly-elections', title: "State Assembly Elections: Key Battles to Watch", author: "Political Desk", time: "1h ago", image: "Indian voters standing in line at a polling booth" },
        { id: 'new-foreign-policy', title: "New Foreign Policy Initiative Launched", author: "Global Affairs", time: "3h ago", image: "Indian and foreign diplomats shaking hands" },
        { id: 'parliament-infra-bill', title: "Parliament passes new infrastructure bill", author: "Govt Desk", time: "5h ago", image: "Exterior of the Indian Parliament building" }
      ]
    },
    {
      name: "Cricket",
      icon: Dribbble,
      articles: [
        { id: 'ipl-auction-splash', title: "IPL Auction: Teams Splash Cash on Star Players", author: "Sports Desk", time: "2h ago", image: "Cricket player hitting a six during an IPL match" },
        { id: 'bcci-world-cup-squad', title: "BCCI Announces Squad for Upcoming World Cup", author: "Cricket Correspondent", time: "4h ago", image: "Indian cricket team posing for a group photo" },
        { id: 'domestic-cricket-season', title: "Domestic season to start next month", author: "Sports Desk", time: "6h ago", image: "A domestic cricket match in progress" }
      ]
    },
    {
      name: "Entertainment",
      icon: Film,
      articles: [
        { id: 'bollywood-blockbuster', title: "Bollywood's Next Big Blockbuster Hits Theaters", author: "Film Critic", time: "5h ago", image: "Movie poster of a new Bollywood film" },
        { id: 'goa-music-festival', title: "Music Festival Lineup Announced for Goa", author: "Entertainment News", time: "7h ago", image: "Crowd at a vibrant music festival in Goa" },
        { id: 'web-series-record', title: "New web series breaks streaming records", author: "OTT Critic", time: "8h ago", image: "Person watching a show on a tablet" }
      ]
    }
  ];

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            className="border border-gray-200 rounded-lg"
          >
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-xl font-serif font-bold text-gray-900 border-b-4 border-red-600 pb-2 inline-block">{category.name}</h3>
            </div>

            <div className="p-4 space-y-4">
              {category.articles.map((article) => (
                <Link to={`/article/${article.id}`} key={article.id}>
                  <article className="flex space-x-4 group cursor-pointer">
                    <img class="w-24 h-20 object-cover rounded-md flex-shrink-0" alt={article.image} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:underline">
                        {article.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500">
                        <User className="h-3 w-3 mr-1" />
                        <span>{article.author}</span>
                        <span className="mx-2">|</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{article.time}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}

              <Link to={`/category/${category.name.toLowerCase()}`}>
                <Button
                  variant="link"
                  className="w-full justify-end text-red-600 hover:text-red-700"
                >
                  More in {category.name}
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySections;