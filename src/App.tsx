import React, { useEffect, useState } from 'react';
import { sides } from './content';
import { useRoute } from './hooks/useRoute';
import { ReadyContext } from './hooks/useReady';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTop from './components/BackToTop';
import Landing from './pages/Landing';
import SideHome from './pages/SideHome';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import AcademicProjectsPage from './pages/AcademicProjectsPage';

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const App: React.FC = () => {
  const route = useRoute();
  const [ready, setReady] = useState<boolean>(prefersReducedMotion());
  const side = route.side ? sides[route.side] : null;

  // pillar accent colour (copper for Digital, green for Student Lab) is driven by <html data-side>
  useEffect(() => {
    document.documentElement.dataset.side = route.side ?? 'digital';
  }, [route.side]);

  // every route change starts at the top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [route.key]);

  const renderPage = () => {
    if (!side) return <Landing />;
    switch (route.page) {
      case 'about': return <AboutPage side={side} />;
      case 'services': return <ServicesPage side={side} />;
      case 'work': return <WorkPage side={side} detail={route.detail} />;
      case 'reviews': return <ReviewsPage side={side} />;
      case 'contact': return <ContactPage side={side} />;
      case 'projects': return side.key === 'lab' ? <AcademicProjectsPage /> : <SideHome side={side} />;
      default: return <SideHome side={side} />;
    }
  };

  return (
    <ReadyContext.Provider value={ready}>
      {!ready && <Intro onDone={() => setReady(true)} />}
      <Navbar route={route} />
      <main key={route.key}>{renderPage()}</main>
      <Footer side={route.side} />
      <FloatingWhatsApp />
      <BackToTop />
    </ReadyContext.Provider>
  );
};

export default App;
