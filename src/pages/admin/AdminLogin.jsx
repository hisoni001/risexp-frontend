import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you'd use a secure auth provider like Supabase.
    // For now, we'll use a simple hardcoded password.
    if (password === 'admin') {
      toast({
        title: 'Login Successful!',
        description: 'Redirecting to your dashboard...',
      });
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Incorrect password. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - RISE XP</title>
        <meta name="description" content="Secure login for RISE XP administrators." />
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl"
        >
          <div className="text-center">
            <img src="https://horizons-cdn.hostinger.com/6fc8a877-4e24-451e-9b63-cc8d5682d748/risexplogo-PE4Kh.png" alt="RISE XP NEWS Logo" className="h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
            <p className="text-gray-500">Please enter your password to continue</p>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Password"
              />
            </div>
            <Button type="submit" variant="destructive" size="lg" className="w-full">
              <LogIn className="mr-2 h-5 w-5" />
              Secure Login
            </Button>
          </form>
           <div className="text-center text-xs text-gray-400">
            <p>For demo purposes, the password is 'admin'.</p>
            <p className="font-semibold mt-2">For a production-ready solution, I recommend integrating Supabase for secure authentication and data management. Would you like to proceed with that?</p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLogin;