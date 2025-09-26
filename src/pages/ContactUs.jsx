import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Form submission isn't implemented yet!",
      description: "This is a demo form. We'll connect it to a backend soon. 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - RISE XP</title>
        <meta name="description" content="Get in touch with the RISE XP team. We'd love to hear from you." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-4xl font-serif font-bold text-gray-900 border-b-4 border-red-600 pb-4 mb-8">
          Contact Us
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="prose max-w-none lg:prose-lg text-gray-700">
            <h2 className="text-2xl font-serif font-bold mt-0">Get in Touch</h2>
            <p>We value your feedback, questions, and suggestions. Whether you have a news tip, a story to share, or need assistance, our team is here to help. Please use the form or contact us through the details below.</p>
            
            <div className="space-y-4 mt-8">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-red-600 mr-4" />
                <span>123 News Avenue, Media City, Mumbai, India 400001</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-red-600 mr-4" />
                <span>+91 22 1234 5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-red-600 mr-4" />
                <span>contact@risexp.com</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="name" name="name" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" name="email" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <input type="text" id="subject" name="subject" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" rows="5" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"></textarea>
            </div>
            <div>
              <Button type="submit" variant="destructive" size="lg" className="w-full">Send Message</Button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default ContactUs;