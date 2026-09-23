import React from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import AcademicProjectsPreview from './components/AcademicProjectsPreview';
import AcademicSupport from './components/AcademicSupport';
import Process from './components/Process';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTop from './components/BackToTop';
import AcademicProjectsPage from './pages/AcademicProjectsPage';
import { useHashRoute } from './hooks/useHashRoute';

const App: React.FC = () => {
  const { route, goToProjects, goToHomeAnchor } = useHashRoute();

  return (
    <>
      {/* Loading screen — fades out after 1.8s */}
      <LoadingScreen />

      {/* Sticky Navbar */}
      <Navbar onNavigateProjects={goToProjects} onNavigateAnchor={goToHomeAnchor} route={route} />

      {/* Main content */}
      <main>
        {route === 'projects' ? (
          <AcademicProjectsPage onBack={() => goToHomeAnchor('#home')} />
        ) : (
          <>
            <Hero />
            <About />
            <Services />
            <AcademicProjectsPreview onViewAll={goToProjects} />
            <AcademicSupport />
            <Process />
            <Projects />
            <Testimonials />
            <Contact />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigateProjects={goToProjects} onNavigateAnchor={goToHomeAnchor} />

      {/* Floating utilities */}
      <FloatingWhatsApp />
      <BackToTop />
    </>
  );
};

export default App;
