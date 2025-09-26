import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { AuthContext } from '@/contexts/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const result = register(name, email, password);
    if (result.success) {
      toast({ title: 'Registration Successful!', description: 'Welcome to RISE XP!' });
      navigate('/profile');
    } else {
      toast({ title: 'Registration Failed', description: result.message, variant: 'destructive' });
    }
  };

  return (
    <>
      <Helmet><title>Register - RISE XP</title></Helmet>
      <div className="flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-sm border"
        >
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold">Create an Account</h1>
            <p className="text-muted-foreground">Join RISE XP to get personalized news and subscribe.</p>
          </div>
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="name" type="text" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} className="pl-10" />
              </div>
            </div>
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
              <UserPlus className="mr-2 h-5 w-5" /> Create Account
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Register;