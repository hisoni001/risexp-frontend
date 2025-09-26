import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { LayoutDashboard, Newspaper, Tags, Image, Youtube, LogOut, FileText, Bell, Users, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
    navigate('/admin');
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, action: () => navigate('/admin/dashboard') },
    { name: 'Manage Articles', icon: Newspaper, action: () => navigate('/admin/articles') },
    { name: 'Manage Categories', icon: Tags, action: () => navigate('/admin/categories') },
    { name: 'Manage Web Stories', icon: Film, action: () => navigate('/admin/web-stories') },
    { name: 'Manage E-Paper', icon: FileText, action: () => navigate('/admin/epaper') },
    { name: 'Push Notifications', icon: Bell, action: () => navigate('/admin/notifications') },
    { name: 'Manage Users', icon: Users, action: () => navigate('/admin/users') },
    { name: 'Image Library', icon: Image, action: () => navigate('/admin/images') },
    { name: 'YouTube Integration', icon: Youtube, action: () => navigate('/admin/youtube') },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - RISE XP</title>
        <meta name="description" content="Manage your RISE XP news website." />
      </Helmet>
      <div className="flex min-h-screen bg-gray-100">
        <motion.aside
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-64 bg-gray-900 text-white flex flex-col"
        >
          <div className="h-20 flex items-center justify-center border-b border-gray-800">
            <Link to="/">
              <img src="https://horizons-cdn.hostinger.com/6fc8a877-4e24-451e-9b63-cc8d5682d748/risexplogo-PE4Kh.png" alt="RISE XP Logo" className="h-12 bg-white p-1 rounded" />
            </Link>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start text-base hover:bg-gray-700"
                onClick={item.action}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-800">
            <Button onClick={handleLogout} variant="destructive" className="w-full">
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </motion.aside>

        <main className="flex-1 p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome, Admin!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Command Center is Fully Operational</h2>
                <p className="text-gray-600">
                  This is your complete CMS. You can now manage every aspect of your website, from articles and users to YouTube videos and push notifications. Use the sidebar to navigate your new powers.
                </p>
                <p className="text-gray-600 mt-2 font-semibold">
                  All data is currently saved in your browser's `localStorage`. For a real, multi-user application, we need to migrate to a database. I strongly recommend using **Supabase** for secure and scalable data management. Shall we set that up next?
                </p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;