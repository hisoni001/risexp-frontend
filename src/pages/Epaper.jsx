import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EpaperContext } from '@/contexts/EpaperContext';

const Epaper = () => {
  const { epapers } = useContext(EpaperContext);

  const handleDownload = (e, epaper) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = epaper.fileUrl;
    link.download = `RISE-XP-Epaper-${epaper.date.replace(/, /g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Helmet>
        <title>E-Paper - RISE XP</title>
        <meta name="description" content="Read the digital edition of the RISE XP newspaper." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card p-8 rounded-lg shadow-sm"
      >
        <h1 className="text-4xl font-serif font-bold text-foreground border-b-4 border-destructive pb-4 mb-8 flex items-center">
          <Newspaper className="h-10 w-10 mr-4" />
          RISE XP E-Paper
        </h1>
        
        <div className="mb-8">
          <p className="text-lg text-muted-foreground">Access the digital replica of our daily newspaper. Select a date to read and download the e-paper.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {epapers.map((epaper, index) => (
            <motion.div
              key={epaper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border rounded-lg overflow-hidden group"
            >
              <div className="relative">
                <img class="w-full h-80 object-cover object-top" alt={epaper.image} src="https://images.unsplash.com/photo-1629226485825-eb652ab0db55" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
              </div>
              <div className="p-4 bg-secondary">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-secondary-foreground">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span className="font-semibold">{epaper.date}</span>
                  </div>
                  <Button onClick={(e) => handleDownload(e, epaper)} size="sm" variant="destructive">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-muted-foreground">More archives can be managed from the admin panel.</p>
        </div>
      </motion.div>
    </>
  );
};

export default Epaper;