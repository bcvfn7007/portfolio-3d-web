import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import ServicesSection from './components/ServicesSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import FloatingChatWidget from './components/FloatingChatWidget';
import LiveLeadsTicker from './components/LiveLeadsTicker';
import ProjectModal from './components/ProjectModal';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [prefilledSummary, setPrefilledSummary] = useState('');
  const [currentLang, setCurrentLang] = useState('RU');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const revealElements = document.querySelectorAll('#about, #portfolio, #testimonials, #services, #faq, #contact');
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenContactWithSummary = (summary) => {
    setPrefilledSummary(summary);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    handleOpenContactWithSummary('');
  };

  return (
    <div className="relative min-h-screen bg-[#090714] text-slate-100 overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Glass Navigation Header */}
      <Navbar
        onOpenContact={handleOpenContact}
        currentLang={currentLang}
        onChangeLang={(lang) => setCurrentLang(lang)}
      />

      {/* Main Page Content */}
      <main>
        {/* Hero Section */}
        <HeroSection onOpenContact={handleOpenContact} currentLang={currentLang} />

        {/* About Section */}
        <AboutSection currentLang={currentLang} />

        {/* Portfolio Section */}
        <PortfolioSection onSelectProject={(proj) => setSelectedProject(proj)} currentLang={currentLang} />

        {/* Testimonials Section */}
        <TestimonialsSection currentLang={currentLang} />

        {/* Services & Bento Grid Section */}
        <ServicesSection onOpenContactWithSummary={handleOpenContactWithSummary} currentLang={currentLang} />

        {/* FAQ Accordion Section */}
        <FaqSection currentLang={currentLang} />

        {/* Contact Section */}
        <ContactSection prefilledSummary={prefilledSummary} currentLang={currentLang} />
      </main>

      {/* Floating Quick Chat Launcher */}
      <FloatingChatWidget />

      {/* Live Social Proof Leads Ticker */}
      <LiveLeadsTicker />

      {/* Detailed Case Project Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
