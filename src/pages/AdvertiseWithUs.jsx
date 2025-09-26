import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Megaphone, BarChart2, Users, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdvertiseWithUs = () => {
  return (
    <>
      <Helmet>
        <title>Advertise With Us - RISE XP</title>
        <meta name="description" content="Reach a vast and engaged audience by advertising with RISE XP. Explore our advertising solutions." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-4xl font-serif font-bold text-gray-900 border-b-4 border-red-600 pb-4 mb-8">
          Advertise With Us
        </h1>
        
        <div className="prose max-w-none lg:prose-lg text-gray-700 leading-relaxed">
          <p className="text-xl">
            Connect with millions of engaged readers across India and the world. RISE XP offers a unique platform to showcase your brand to a discerning audience that values quality and credibility.
          </p>

          <div className="bg-gray-100 rounded-lg p-8 my-12 text-center">
            <h2 className="text-3xl font-serif font-bold mt-0">Why Advertise on RISE XP?</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center">
                <Users className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="font-bold text-xl m-0">Massive Reach</h3>
                <p className="text-sm">Reach millions of monthly active users who are educated, affluent, and influential.</p>
              </div>
              <div className="flex flex-col items-center">
                <BarChart2 className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="font-bold text-xl m-0">High Engagement</h3>
                <p className="text-sm">Our readers spend significant time on our platform, consuming diverse content formats.</p>
              </div>
              <div className="flex flex-col items-center">
                <Megaphone className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="font-bold text-xl m-0">Brand Safety</h3>
                <p className="text-sm">Associate your brand with credible, high-quality journalism in a premium environment.</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-serif font-bold">Our Advertising Solutions</h2>
          <p>
            We offer a wide range of advertising solutions to meet your marketing objectives, including:
          </p>
          <ul>
            <li>Display Advertising (Banners, Interstitials)</li>
            <li>Native Advertising & Branded Content</li>
            <li>Video Advertising (Pre-roll, Mid-roll)</li>
            <li>Event Sponsorships & Custom Activations</li>
            <li>Newsletter & Email Marketing</li>
          </ul>

          <div className="text-center mt-12">
            <h3 className="text-2xl font-serif font-bold">Ready to reach your audience?</h3>
            <p className="my-4">Contact our advertising team to get a custom quote and media kit.</p>
            <Link to="/contact-us">
              <Button variant="destructive" size="lg">
                <Mail className="mr-2 h-5 w-5" />
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdvertiseWithUs;