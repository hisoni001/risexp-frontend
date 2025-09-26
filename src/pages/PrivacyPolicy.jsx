import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - RISE XP</title>
        <meta name="description" content="Read the Privacy Policy for the RISE XP website and services." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-4xl font-serif font-bold text-gray-900 border-b-4 border-red-600 pb-4 mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose max-w-none lg:prose-lg text-gray-700 leading-relaxed">
          <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
          
          <p>RISE XP ("us", "we", or "our") operates the risexp.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

          <h2 className="text-2xl font-serif font-bold">1. Information Collection and Use</h2>
          <p>We collect several different types of information for various purposes to provide and improve our Service to you. This may include, but is not limited to, email address, cookies, and usage data.</p>

          <h2 className="text-2xl font-serif font-bold">2. Log Data</h2>
          <p>We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</p>

          <h2 className="text-2xl font-serif font-bold">3. Use of Data</h2>
          <p>RISE XP uses the collected data for various purposes:
            <ul>
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </p>

          <h2 className="text-2xl font-serif font-bold">4. Cookies Policy</h2>
          <p>We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>

          <h2 className="text-2xl font-serif font-bold">5. Security of Data</h2>
          <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

          <h2 className="text-2xl font-serif font-bold">6. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
        </div>
      </motion.div>
    </>
  );
};

export default PrivacyPolicy;