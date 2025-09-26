import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import CategoryPage from '@/pages/CategoryPage';
import ArticlePage from '@/pages/ArticlePage';
import SearchPage from '@/pages/SearchPage';
import NotFoundPage from '@/pages/NotFoundPage';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ManageArticles from '@/pages/admin/ManageArticles';
import ManageCategories from '@/pages/admin/ManageCategories';
import ManageWebStories from '@/pages/admin/ManageWebStories';
import ManageEpaper from '@/pages/admin/ManageEpaper';
import ManageUsers from '@/pages/admin/ManageUsers';
import ManageYouTube from '@/pages/admin/ManageYouTube';
import ManagePushNotifications from '@/pages/admin/ManagePushNotifications';
import ImageLibrary from '@/pages/admin/ImageLibrary';
import { Toaster } from '@/components/ui/toaster';
import AboutUs from '@/pages/AboutUs';
import ContactUs from '@/pages/ContactUs';
import AdvertiseWithUs from '@/pages/AdvertiseWithUs';
import TermsOfUse from '@/pages/TermsOfUse';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Epaper from '@/pages/Epaper';
import WebStories from '@/pages/WebStories';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';
import { ArticleProvider } from '@/contexts/ArticleContext';
import { CategoryProvider } from '@/contexts/CategoryContext';
import { WebStoryProvider } from '@/contexts/WebStoryContext';
import { EpaperProvider } from '@/contexts/EpaperContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { YouTubeProvider } from '@/contexts/YouTubeContext';
import { ImageProvider } from '@/contexts/ImageContext';
import MobileNav from '@/components/MobileNav';
import PushNotificationPrompt from '@/components/PushNotificationPrompt';

function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <ImageProvider>
          <YouTubeProvider>
            <ArticleProvider>
              <WebStoryProvider>
                <EpaperProvider>
                  <div className="min-h-screen bg-background text-foreground">
                    <Routes>
                      <Route path="/admin" element={<AdminLogin />} />
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                      <Route path="/admin/articles" element={<ManageArticles />} />
                      <Route path="/admin/categories" element={<ManageCategories />} />
                      <Route path="/admin/web-stories" element={<ManageWebStories />} />
                      <Route path="/admin/epaper" element={<ManageEpaper />} />
                      <Route path="/admin/users" element={<ManageUsers />} />
                      <Route path="/admin/youtube" element={<ManageYouTube />} />
                      <Route path="/admin/notifications" element={<ManagePushNotifications />} />
                      <Route path="/admin/images" element={<ImageLibrary />} />
                      <Route path="/*" element={<MainLayout />} />
                    </Routes>
                    <Toaster />
                  </div>
                </EpaperProvider>
              </WebStoryProvider>
            </ArticleProvider>
          </YouTubeProvider>
        </ImageProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}

const MainLayout = () => (
  <>
    <Header />
    <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/article/:articleId" element={<ArticlePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/advertise-with-us" element={<AdvertiseWithUs />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/epaper" element={<Epaper />} />
        <Route path="/web-stories" element={<WebStories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
    <Footer />
    <MobileNav />
    <PushNotificationPrompt />
  </>
);

export default App;