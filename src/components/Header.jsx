import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { AuthContext } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handlePushNotification = () => {
    toast({
      title: 'Subscribed!',
      description: 'You will now receive push notifications. (This is a demo)',
    });
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleLogout = () => {
    logout();
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
    navigate('/');
  };

  const navItems = ['India', 'World', 'Cities', 'Business', 'Cricket', 'Tech', 'Entertainment', 'Sports'];

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center h-10 border-b border-border">
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold">Date:</span> {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/epaper">
              <Button variant="link" className="text-xs h-auto p-0 text-muted-foreground">e-paper</Button>
            </Link>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={handlePushNotification}>
              <Bell className="h-4 w-4" />
            </Button>
            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="text-xs h-auto p-0 text-muted-foreground">Login/Subscribe</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between h-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/" className="flex items-center">
              <img src="https://horizons-cdn.hostinger.com/6fc8a877-4e24-451e-9b63-cc8d5682d748/risexplogo-PE4Kh.png" alt="RISE XP NEWS Logo" className="h-12" />
            </Link>
          </motion.div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={handleSearchClick} className="text-foreground/70 hover:text-primary">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="hidden lg:flex bg-primary text-primary-foreground">
        <div className="max-w-screen-2xl mx-auto flex justify-center">
          {navItems.map(item => <Link key={item} to={`/category/${item.toLowerCase()}`} className="px-4 py-3 text-sm font-medium uppercase tracking-wider hover:bg-destructive transition-colors">
              {item}
            </Link>)}
            <Link to="/web-stories" className="px-4 py-3 text-sm font-medium uppercase tracking-wider bg-destructive hover:bg-destructive/90 transition-colors">
              Web Stories
            </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden border-t border-border">
          <nav className="flex flex-col">
            {navItems.map(item => <Link key={item} to={`/category/${item.toLowerCase()}`} className="px-4 py-3 text-foreground hover:bg-secondary border-b border-border" onClick={() => setIsMenuOpen(false)}>
                {item}
              </Link>)}
            <Link to="/web-stories" className="px-4 py-3 text-destructive-foreground bg-destructive hover:bg-destructive/90 border-b border-border" onClick={() => setIsMenuOpen(false)}>
                Web Stories
            </Link>
          </nav>
        </motion.div>}
    </header>
  );
};
export default Header;