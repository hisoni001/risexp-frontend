import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Footer = () => {
  const handleSocialClick = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const footerSections = [
    {
      title: "Popular Categories",
      links: [
        { name: "India", path: "/category/india" },
        { name: "World", path: "/category/world" },
        { name: "Business", path: "/category/business" },
        { name: "Tech", path: "/category/tech" },
        { name: "Cricket", path: "/category/cricket" },
        { name: "Entertainment", path: "/category/entertainment" }
      ]
    },
    {
      title: "Trending Topics",
      links: [
        { name: "IPL 2025", path: "/search?q=ipl+2025" },
        { name: "Union Budget", path: "/search?q=union+budget" },
        { name: "Global Economy", path: "/search?q=global+economy" },
        { name: "Movie Reviews", path: "/search?q=movie+reviews" },
        { name: "Gadget Launches", path: "/search?q=gadget+launches" }
      ]
    },
    {
      title: "RISE XP",
      links: [
        { name: "About Us", path: "/about-us" },
        { name: "Contact Us", path: "/contact-us" },
        { name: "Advertise with Us", path: "/advertise-with-us" },
        { name: "Terms of Use", path: "/terms-of-use" },
        { name: "Privacy Policy", path: "/privacy-policy" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook" },
    { icon: Twitter, name: "Twitter" },
    { icon: Instagram, name: "Instagram" },
    { icon: Linkedin, name: "LinkedIn" },
    { icon: Youtube, name: "YouTube" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src="https://horizons-cdn.hostinger.com/6fc8a877-4e24-451e-9b63-cc8d5682d748/risexplogo-PE4Kh.png" alt="RISE XP NEWS Logo" className="h-12 bg-white p-2 rounded-md" />
              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                Your trusted source for breaking news, in-depth analysis, and comprehensive coverage of events in India and around the world.
              </p>
            </motion.div>
          </div>

          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
            >
              <span className="text-sm font-bold text-white uppercase tracking-wider mb-4 block">{section.title}</span>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-500 text-xs mb-4 md:mb-0"
            >
              © {new Date().getFullYear()} RISE XP. All rights reserved.
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex space-x-5"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  onClick={handleSocialClick}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;