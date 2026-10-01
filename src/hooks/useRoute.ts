import { useEffect, useState } from 'react';
import type { Side } from '../content';

export type Page = 'home' | 'about' | 'services' | 'work' | 'reviews' | 'contact' | 'projects';

export interface Route {
  side: Side | null; // null = brand landing page
  page: Page;
  detail: string | null; // e.g. a work item id: #/digital/work/university
  key: string;
}

const PAGES: Page[] = ['about', 'services', 'work', 'reviews', 'contact', 'projects'];

export const parseHash = (hash: string): Route => {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const side: Side | null = parts[0] === 'digital' || parts[0] === 'lab' ? parts[0] : null;
  if (!side) return { side: null, page: 'home', detail: null, key: '/' };
  const maybePage = parts[1] as Page | undefined;
  const page: Page = maybePage && PAGES.includes(maybePage) ? maybePage : 'home';
  const detail = page === 'work' && parts[2] ? parts[2] : null;
  return { side, page, detail, key: `/${side}/${page}${detail ? `/${detail}` : ''}` };
};

/** Tiny hash router: #/ (landing) · #/digital · #/digital/about · #/lab/projects · #/digital/work/<id> */
export const useRoute = (): Route => {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
};
