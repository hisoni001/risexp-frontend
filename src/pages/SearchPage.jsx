import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast({
        title: "Please enter a search term.",
        variant: "destructive",
      });
      return;
    }
    // Mock search results
    setHasSearched(true);
    setResults([
      { id: 1, title: `Search result for "${searchTerm}" 1`, excerpt: 'This is a sample excerpt for the search result.' },
      { id: 2, title: `Search result for "${searchTerm}" 2`, excerpt: 'Another sample excerpt to demonstrate the search functionality.' },
    ]);
    toast({
      title: `🚧 This is a mock search. Full functionality can be requested! 🚀`
    });
  };

  return (
    <>
      <Helmet>
        <title>Search - RISE XP</title>
        <meta name="description" content="Search for news articles on RISE XP." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md min-h-[60vh]"
      >
        <h1 className="text-3xl font-serif font-bold text-gray-900 border-b-4 border-red-600 pb-4 mb-8">
          Search News
        </h1>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for news, topics, etc."
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <Button type="submit" variant="destructive" size="lg">Search</Button>
        </form>

        <div>
          {hasSearched && results.length > 0 && (
            <h2 className="text-xl font-bold mb-4">Results for "{searchTerm}"</h2>
          )}
          {hasSearched && results.length === 0 && (
            <p className="text-center text-gray-500 mt-12">No results found for "{searchTerm}". Try another search.</p>
          )}
          <div className="space-y-4">
            {results.map(result => (
              <div key={result.id} className="p-4 border rounded-md hover:bg-gray-50">
                <h3 className="font-bold text-lg text-red-700 hover:underline cursor-pointer">{result.title}</h3>
                <p className="text-gray-600">{result.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SearchPage;