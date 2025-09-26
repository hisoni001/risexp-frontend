import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const TermsOfUse = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Use - RISE XP</title>
        <meta name="description" content="Read the Terms of Use for the RISE XP website and services." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-4xl font-serif font-bold text-gray-900 border-b-4 border-red-600 pb-4 mb-8">
          Terms of Use
        </h1>
        
        <div className="prose max-w-none lg:prose-lg text-gray-700 leading-relaxed">
          <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
          
          <p>Welcome to RISE XP. By accessing or using our website and services, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree with these terms, please do not use our services.</p>

          <h2 className="text-2xl font-serif font-bold">1. Use of Our Service</h2>
          <p>RISE XP grants you a limited, non-exclusive, non-transferable, and revocable license to use our service for your personal, non-commercial use. You agree not to use the service for any other purpose.</p>

          <h2 className="text-2xl font-serif font-bold">2. Intellectual Property</h2>
          <p>All content on RISE XP, including text, graphics, logos, images, and software, is the property of RISE XP or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission.</p>

          <h2 className="text-2xl font-serif font-bold">3. User Conduct</h2>
          <p>You agree not to engage in any of the following prohibited activities: (i) copying, distributing, or disclosing any part of the service in any medium; (ii) using any automated system, including "robots," "spiders," "offline readers," etc., to access the service; (iii) transmitting spam, chain letters, or other unsolicited email.</p>

          <h2 className="text-2xl font-serif font-bold">4. Disclaimer of Warranties</h2>
          <p>The service is provided on an "as is" and "as available" basis. Use of the service is at your own risk. To the maximum extent permitted by applicable law, the service is provided without warranties of any kind, whether express or implied.</p>

          <h2 className="text-2xl font-serif font-bold">5. Limitation of Liability</h2>
          <p>To the maximum extent permitted by applicable law, in no event shall RISE XP, its affiliates, agents, directors, employees, or suppliers be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses.</p>

          <h2 className="text-2xl font-serif font-bold">6. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms of Use on this page. You are advised to review these Terms of Use periodically for any changes.</p>
        </div>
      </motion.div>
    </>
  );
};

export default TermsOfUse;