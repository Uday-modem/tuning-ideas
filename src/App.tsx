import React from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import AcademicProjects from './components/AcademicProjects';
import AcademicSupport from './components/AcademicSupport';
import Process from './components/Process';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTop from './components/BackToTop';

const App: React.FC = () => {
  return (
    <>
      {/* Loading screen — fades out after 1.8s */}
      <LoadingScreen />

      {/* Sticky Navbar */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Services />
        <AcademicProjects />
        <AcademicSupport />
        <Process />
        <Projects />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating utilities */}
      <FloatingWhatsApp />
      <BackToTop />
    </>
  );
};

export default App;
