import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Services } from '../components/Services';
import { Experience } from '../components/Experience';
import { Education } from '../components/Education';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { scrollToSection } from '../utils/navigation';

export const Home: React.FC = () => {
  useEffect(() => {
    if (window.location.hash) {
      // Small timeout to allow all sections to mount and render dimensions
      const timer = setTimeout(() => {
        scrollToSection(window.location.hash);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#05070A] text-[#F5F7FA] flex flex-col selection:bg-[#1683FF]/30 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
