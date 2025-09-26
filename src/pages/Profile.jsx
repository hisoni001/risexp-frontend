import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Mail, Bell, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, updateUserSubscription } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleSubscriptionToggle = () => {
    const newSubStatus = !user.subscribed;
    updateUserSubscription(user.id, newSubStatus);
    toast({
      title: newSubStatus ? 'Subscription Activated!' : 'Subscription Canceled',
      description: newSubStatus ? 'Thank you for subscribing to RISE XP Premium!' : 'Your premium subscription has been canceled.',
    });
  };

  return (
    <>
      <Helmet><title>My Profile - RISE XP</title></Helmet>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-sm border"
      >
        <h1 className="text-3xl font-serif font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground mb-8">Manage your account details and subscription.</p>
        
        <div className="space-y-6">
          <div className="flex items-center">
            <User className="h-5 w-5 mr-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Mail className="h-5 w-5 mr-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Bell className="h-5 w-5 mr-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Push Notifications</p>
              <p className="font-semibold">Subscribed (Demo)</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-serif font-bold mb-4">My Subscription</h2>
          {user.subscribed ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">RISE XP Premium Member</h3>
              <p className="mb-4">You have full access to all our premium content. Thank you for your support!</p>
              <Button variant="destructive" onClick={handleSubscriptionToggle}>Cancel Subscription</Button>
            </div>
          ) : (
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Upgrade to Premium</h3>
              <p className="text-secondary-foreground mb-4">Get unlimited access to exclusive articles, in-depth analysis, and an ad-free experience.</p>
              <Button onClick={handleSubscriptionToggle}>
                <CreditCard className="mr-2 h-4 w-4" /> Subscribe Now
              </Button>
            </div>
          )}
        </div>
        <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">For a real application, I recommend integrating Stripe for payments. Would you like to set that up?</p>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;