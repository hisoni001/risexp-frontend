import React from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Sections from './components/Sections.jsx'
import Footer from './components/Footer.jsx'

export default function App(){
  return (
    <div className="min-h-full">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <Sections />
      </main>
      <Footer />
    </div>
  )
}
