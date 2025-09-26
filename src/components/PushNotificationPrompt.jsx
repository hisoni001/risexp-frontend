import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const PushNotificationPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasBeenPrompted = localStorage.getItem('pushNotificationPrompted');
    if (!hasBeenPrompted) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000); // Show after 3 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAllow = () => {
    localStorage.setItem('pushNotificationPrompted', 'true');
    setIsVisible(false);
    toast({
      title: "Notifications Enabled!",
      description: "You'll now receive the latest news updates. (This is a demo)",
    });
  };

  const handleBlock = () => {
    localStorage.setItem('pushNotificationPrompted', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 w-full max-w-sm z-[100]"
        >
          <div className="bg-card border shadow-lg rounded-lg p-6">
            <div className="flex items-start">
              <div className="bg-destructive/10 p-3 rounded-full mr-4">
                <Bell className="h-6 w-6 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Stay Updated!</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Allow notifications to receive breaking news and important updates from RISE XP.
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 -mt-2 -mr-2" onClick={handleBlock}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="ghost" onClick={handleBlock}>
                Not now
              </Button>
              <Button onClick={handleAllow}>
                Allow
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PushNotificationPrompt;