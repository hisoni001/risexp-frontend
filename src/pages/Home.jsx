import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '@/components/Hero';
import BreakingNews from '@/components/BreakingNews';
import FeaturedArticles from '@/components/FeaturedArticles';
import CategorySections from '@/components/CategorySections';
import Newsletter from '@/components/Newsletter';
import TopCities from '@/components/TopCities';
import WebStoriesRibbon from '@/components/WebStoriesRibbon';
import ShortVideos from '@/components/ShortVideos';
import Advertisement from '@/components/Advertisement';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>RISE XP - India News, Latest News, Breaking News India</title>
        <meta name="description" content="RISE XP - Get latest news from India and around the world. Get breaking news alerts, and exclusive coverage from the world of politics, business, cricket, and more." />
      </Helmet>
      <div className="space-y-12">
        <Hero />
        <BreakingNews />
        <WebStoriesRibbon />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9 space-y-12">
            <FeaturedArticles />
            <Advertisement />
            <CategorySections />
          </div>
          <div className="lg:col-span-3 space-y-12">
            <ShortVideos />
            <TopCities />
          </div>
        </div>
        <Newsletter />
      </div>
    </>
  );
};

export default Home;