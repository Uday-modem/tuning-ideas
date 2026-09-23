import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { Route } from '../hooks/useHashRoute';

interface NavLinkItem {
  label: string;
  href: string;
  isProjectsRoute?: boolean;
}

const navLinks: NavLinkItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Academic Projects', href: '#/projects', isProjectsRoute: true },
  { label: 'Work', href: '#work' },
  { label: 'Reviews', href: '#reviews' },
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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          padding: scrolled ? '0.75rem 1.5rem' : '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(245, 240, 232, 0.95)' : 'var(--ivory)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 2px 24px rgba(28,28,26,0.08)' : 'none',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavClick({ label: 'Home', href: '#home' })}
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
          className="flex lg:hidden"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--charcoal)',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'var(--ivory)',
              zIndex: 998,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              padding: '2rem',
              overflowY: 'auto',
            }}
          >
            {navLinks.map((link, i) => {
              const isActive = link.isProjectsRoute && route === 'projects';
              return (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => handleNavClick(link)}
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 'clamp(1.6rem, 6vw, 2.5rem)',
                    fontWeight: 600,
                    color: isActive ? 'var(--copper)' : 'var(--charcoal)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    letterSpacing: '0.05em',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = 'var(--copper)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = isActive
                      ? 'var(--copper)'
                      : 'var(--charcoal)')
                  }
                >
                  {link.label}
                </motion.button>
              );
            })}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.08 }}
              onClick={() => {
                setMenuOpen(false);
                onNavigateAnchor('#contact');
              }}
              className="btn-primary"
            >
              Start a Project →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
