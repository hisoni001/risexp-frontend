import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | RISE XP</title>
        <meta name="description" content="The page you are looking for could not be found." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center bg-white p-12 rounded-lg shadow-md min-h-[60vh]"
      >
        <AlertTriangle className="h-24 w-24 text-red-500 mb-6" />
        <h1 className="text-6xl font-serif font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-6">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Oops! The page you are looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link to="/">
          <Button size="lg" variant="destructive">
            Go Back to Homepage
          </Button>
        </Link>
      </motion.div>
    </>
  );
};

export default NotFoundPage;