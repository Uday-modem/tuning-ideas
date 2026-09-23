import { useEffect, useState } from 'react';

export type Route = 'home' | 'projects';

const PROJECTS_HASH = '#/projects';

export const getRouteFromHash = (): Route =>
  window.location.hash.startsWith(PROJECTS_HASH) ? 'projects' : 'home';

/**
 * Minimal hash-based route so we can have a dedicated Academic Projects
 * page without adding a router dependency. `#/projects` = projects page,
 * anything else = the single-page home with in-page anchor sections.
 */
export const useHashRoute = () => {
  const [route, setRoute] = useState<Route>(getRouteFromHash());

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const goToProjects = () => {
    window.location.hash = '/projects';
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  /** Navigate to a home-page anchor (e.g. '#about'), switching off the projects page first if needed. */
  const goToHomeAnchor = (href: string) => {
    const wasOnProjects = getRouteFromHash() === 'projects';
    window.location.hash = href.replace(/^#/, '');
    if (wasOnProjects) {
      // Wait a tick for the home page to mount before scrolling to the section.
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { route, goToProjects, goToHomeAnchor };
};
