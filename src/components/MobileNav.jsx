import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Dribbble, Clapperboard, Home, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/web-stories', icon: BookOpen, label: 'Stories' },
    { href: '/category/cricket', icon: Dribbble, label: 'Cricket' },
    { href: '/category/entertainment', icon: Clapperboard, label: 'Movies' },
    { href: '/search', icon: Search, label: 'Search' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border h-16 z-50">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center text-xs gap-1 w-full h-full",
                isActive ? "text-destructive" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;