'use client';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Themes from '../components/Themes';
import Stories from '../components/Stories';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Themes />
      <Stories />
      <Footer />
    </div>
  );
}
