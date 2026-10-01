import { createContext, useContext } from 'react';

/** false while the intro loader is covering the page, true afterwards. Hero animations wait for it. */
export const ReadyContext = createContext<boolean>(true);
export const useReady = (): boolean => useContext(ReadyContext);
