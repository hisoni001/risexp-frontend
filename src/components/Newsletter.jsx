import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // In a real app, you'd send this to your backend/mailing list service.
      // For now, we'll use localStorage to simulate subscription.
      const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions')) || [];
      if (subscriptions.includes(email)) {
        toast({
          title: 'Already Subscribed!',
          description: 'This email address is already on our list.',
          variant: 'destructive',
        });
      } else {
        subscriptions.push(email);
        localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
        toast({
          title: 'Subscription Successful!',
          description: 'Thank you for subscribing to our newsletter.',
        });
        setEmail('');
      }
    }
  };

  return (
    <section className="py-16 bg-gray-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Mail className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-serif font-bold mb-2">
            Get top news & analysis in your inbox
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest updates.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <Button
                type="submit"
                variant="destructive"
                size="lg"
              >
                Subscribe
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;