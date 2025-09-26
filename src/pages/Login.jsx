import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { AuthContext } from '@/contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      toast({ title: 'Login Successful!', description: 'Welcome back!' });
      navigate('/profile');
    } else {
      toast({ title: 'Login Failed', description: 'Invalid email or password.', variant: 'destructive' });
    }
  };

  return (
    <>
      <Helmet><title>Login - RISE XP</title></Helmet>
      <div className="flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-sm border"
        >
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to access your account and subscriptions.</p>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" />
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg">
              <LogIn className="mr-2 h-5 w-5" /> Secure Login
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Login;