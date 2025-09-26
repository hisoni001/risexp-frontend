import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Bell, Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const ManagePushNotifications = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');

  const handleSendNotification = (e) => {
    e.preventDefault();
    if (!title || !message) {
      toast({ title: "Error", description: "Title and message are required.", variant: "destructive" });
      return;
    }
    // This is a simulation. In a real app, this would call a service worker or backend service.
    console.log('Sending notification:', { title, message, link });
    toast({
      title: "Notification Sent! (Simulation)",
      description: `Title: ${title}`,
    });
    setTitle('');
    setMessage('');
    setLink('');
  };

  return (
    <>
      <Helmet><title>Push Notifications - RISE XP Admin</title></Helmet>
      <div className="min-h-screen bg-gray-100 p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-4 mb-8">
            <Link to="/admin/dashboard"><Button variant="outline" size="icon"><ArrowLeft /></Button></Link>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center"><Bell className="mr-4 text-destructive" /> Push Notifications</h1>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Compose Notification</h2>
            <p className="text-gray-500 mb-6">Send a breaking news alert to your subscribers.</p>
            <form onSubmit={handleSendNotification} className="space-y-6">
              <div>
                <Label htmlFor="title">Notification Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Breaking News!" required />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="e.g., PM announces new economic policy." required />
              </div>
              <div>
                <Label htmlFor="link">Link (Optional)</Label>
                <Input id="link" type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://risexp.com/article/..." />
              </div>
              <Button type="submit" className="w-full" size="lg">
                <Send className="mr-2 h-4 w-4" /> Send Notification
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ManagePushNotifications;