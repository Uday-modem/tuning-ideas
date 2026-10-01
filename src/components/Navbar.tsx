import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { sides } from '../content';
import type { Route } from '../hooks/useRoute';
import Link from './Link';

interface Props {
  route: Route;
}

const Navbar: React.FC<Props> = ({ route }) => {
  const [open, setOpen] = useState(false);
  const side = route.side ? sides[route.side] : null;

  // close the mobile panel whenever the route changes
  useEffect(() => setOpen(false), [route.key]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = side
    ? side.nav
    : [
        { label: 'Digital Solutions', to: '/digital' },
        { label: 'Student Lab', to: '/lab' },
      ];

  const isActive = (to: string): boolean => {
    if (!side) return false;
    return to === side.path ? route.page === 'home' : route.key.startsWith(to);
  };

  const cta = side
    ? { label: side.key === 'digital' ? 'Start a project' : 'Get guidance', to: `${side.path}/contact` }
    : null;

  return (
    <>
      <div className="nav-shell">
        <motion.nav
          className="nav"
          aria-label="Main"
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <Link to={side ? side.path : '/'} className="nav-logo" aria-label="Tuning Ideas home">
            <img src="/favicon.png" alt="" />
            <span>Tuning Ideas</span>
          </Link>

          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={`nav-link${isActive(l.to) ? ' active' : ''}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            {side && (
              <div className="side-switch" role="group" aria-label="Switch section">
                <Link to="/digital" className={side.key === 'digital' ? 'on' : ''}>Digital</Link>
                <Link to="/lab" className={side.key === 'lab' ? 'on' : ''}>Student Lab</Link>
              </div>
            )}
            {cta && (
              <Link to={cta.to} className="btn btn-accent btn-sm nav-cta">
                {cta.label}
              </Link>
            )}
            <button
              className="nav-burger"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-panel"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={isActive(l.to) ? 'active' : ''}>
                {l.label}
              </Link>
            ))}
            {side && (
              <>
                <div style={{ height: 1, background: 'var(--line)', margin: '0.5rem 0.4rem' }} />
                <Link to={side.key === 'digital' ? '/lab' : '/digital'}>
                  Switch to {side.key === 'digital' ? 'Student Lab' : 'Digital Solutions'}
                </Link>
              </>
            )}
            {cta && (
              <Link to={cta.to} className="btn btn-accent" style={{ marginTop: '0.5rem', justifyContent: 'center', color: 'var(--accent-ink)' }}>
                {cta.label} <ArrowRight size={15} />
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
