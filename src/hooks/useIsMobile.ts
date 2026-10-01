import { useEffect, useState } from 'react';

/** true below the 860px breakpoint (same one used in index.css). Updates on resize / rotation. */
export const useIsMobile = (query = '(max-width: 860px)'): boolean => {
  const [match, setMatch] = useState<boolean>(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
};
