'use client';

import Hero from '../components/Hero';
import Themes from '../components/Themes';
import Stories from '../components/Stories';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Themes />
      <Stories />
    </div>
  );
}
