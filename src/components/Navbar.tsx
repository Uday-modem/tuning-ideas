import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Info, Wrench, GraduationCap, Briefcase, Star, ArrowRight } from 'lucide-react';
import type { Route } from '../hooks/useHashRoute';

interface NavLinkItem {
  label: string;
  href: string;
  isProjectsRoute?: boolean;
  icon: React.ReactNode;
}

const navLinks: NavLinkItem[] = [
  { label: 'Home', href: '#home', icon: <Home size={17} /> },
  { label: 'About', href: '#about', icon: <Info size={17} /> },
  { label: 'Services', href: '#services', icon: <Wrench size={17} /> },
  { label: 'Academic Projects', href: '#/projects', isProjectsRoute: true, icon: <GraduationCap size={17} /> },
  { label: 'Work', href: '#work', icon: <Briefcase size={17} /> },
  { label: 'Reviews', href: '#reviews', icon: <Star size={17} /> },
];

interface Props {
  onNavigateProjects: () => void;
  onNavigateAnchor: (href: string) => void;
  route: Route;
}

const Navbar: React.FC<Props> = ({ onNavigateProjects, onNavigateAnchor, route }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock page scroll while the mobile dropdown is open, close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const handleNavClick = (link: NavLinkItem) => {
    setMenuOpen(false);
    if (link.isProjectsRoute) {
      onNavigateProjects();
      return;
    }
    onNavigateAnchor(link.href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={scrolled ? 'glass-nav-scrolled' : 'glass-nav'}
        style={{
          position: 'fixed',
          top: 'max(0.85rem, calc(env(safe-area-inset-top, 0px) + 0.6rem))',
          left: '1rem',
          right: '1rem',
          maxWidth: 1360,
          margin: '0 auto',
          zIndex: 999,
          padding: scrolled ? '0.65rem 1.35rem' : '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '1.75rem',
          transition: 'padding 0.3s ease, border-radius 0.3s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavClick(navLinks[0])}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            flexShrink: 0,
          }}
        >
          <img
            src="/favicon.png"
            alt="Tuning Ideas logo"
            width={54}
            height={54}
            style={{ width: 54, height: 54, objectFit: 'contain', flexShrink: 0 }}
          />
          <div style={{ textAlign: 'left' }}>
            <div
              style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--charcoal)',
                letterSpacing: '0.01em',
                lineHeight: 1.15,
                whiteSpace: 'nowrap',
              }}
            >
              Tuning Ideas
            </div>
            <div
              style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: '0.62rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                marginTop: '0.1rem',
              }}
            >
              From Ideas to Reality
            </div>
          </div>
        </button>

        {/* Desktop Nav — visible from lg breakpoint up; display controlled purely by
            Tailwind classes (no inline `display` here, so it can't fight the `hidden` class) */}
        <ul
          className="hidden lg:flex"
          style={{
            alignItems: 'center',
            gap: '1.6rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {navLinks.map((link) => {
            const isActive = link.isProjectsRoute && route === 'projects';
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: isActive ? 'var(--copper)' : 'var(--text-mid)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontFamily: '"Manrope", sans-serif',
                    transition: 'color 0.2s',
                    padding: '0.25rem 0',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = 'var(--copper)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = isActive
                      ? 'var(--copper)'
                      : 'var(--text-mid)')
                  }
                >
                  {link.label}
                </button>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => onNavigateAnchor('#contact')}
              className="btn-primary"
              style={{ padding: '0.6rem 1.3rem', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
            >
              Start a Project
            </button>
          </li>
        </ul>

        {/* Mobile hamburger — visible below lg breakpoint */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex lg:hidden ${menuOpen ? 'glass-nav-scrolled' : ''}`}
          style={{
            background: menuOpen ? undefined : 'none',
            border: menuOpen ? undefined : 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            cursor: 'pointer',
            color: 'var(--charcoal)',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.2s',
          }}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile dropdown menu — a small anchored panel, not a full-screen takeover */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="lg:hidden"
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 996,
                background: 'rgba(28, 28, 26, 0.4)',
                backdropFilter: 'blur(3px)',
                WebkitBackdropFilter: 'blur(3px)',
              }}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="lg:hidden glass-nav-scrolled"
              style={{
                position: 'fixed',
                top: scrolled ? '5.5rem' : '6rem',
                right: '1rem',
                left: '1rem',
                maxWidth: 340,
                marginLeft: 'auto',
                zIndex: 997,
                borderRadius: '1.75rem',
                padding: '0.75rem',
                maxHeight: 'calc(100vh - 7rem)',
                overflowY: 'auto',
              }}
            >
              {navLinks.map((link) => {
                const isActive = link.isProjectsRoute && route === 'projects';
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link)}
                    className="active:bg-copper-pale active:text-copper hover:bg-copper-pale hover:text-copper"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      width: '100%',
                      textAlign: 'left',
                      background: isActive ? 'var(--copper-pale)' : 'transparent',
                      border: 'none',
                      borderRadius: '1.1rem',
                      padding: '0.85rem 0.9rem',
                      cursor: 'pointer',
                      fontFamily: '"Manrope", sans-serif',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      color: isActive ? 'var(--copper)' : 'var(--charcoal)',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isActive ? 'var(--copper)' : 'var(--text-muted)',
                        flexShrink: 0,
                      }}
                    >
                      {link.icon}
                    </span>
                    {link.label}
                  </button>
                );
              })}

              <div
                style={{
                  height: 1,
                  background: 'var(--border-color)',
                  margin: '0.6rem 0.4rem',
                }}
              />

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onNavigateAnchor('#contact');
                }}
                className="btn-primary"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                Start a Project <ArrowRight size={15} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
