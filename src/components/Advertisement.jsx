import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Advertisement = () => {
  return (
    <motion.section 
      className="bg-secondary rounded-lg p-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="border-2 border-dashed border-muted-foreground/50 rounded-md p-8 flex flex-col items-center justify-center h-full">
        <Megaphone className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground">Your Advertisement Here</h3>
        <p className="text-sm text-muted-foreground mt-2 mb-4 max-w-md">
          Reach millions of engaged readers. Our platform offers a premium space to showcase your brand.
        </p>
        <Link to="/advertise-with-us">
          <Button variant="outline" size="sm">Advertise With Us</Button>
        </Link>
      </div>
    </motion.section>
  );
};

export default Advertisement;