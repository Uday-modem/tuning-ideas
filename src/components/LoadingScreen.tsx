import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// The reveal file (public/logo-reveal.html) draws the brain-thread mark, slides it
// left, then settles on the "Tuning Ideas / From Ideas to Reality" wordmark by
// ~10.3s into its own 13s loop. We hold just past that settle point, then let this
// wrapper fade away before the animation's internal loop would restart it.
const REVEAL_HOLD_MS = 11200;
const FADE_OUT_MS = 600;

const LoadingScreen: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), REVEAL_HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_MS / 1000, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#f4f0e8',
          }}
        >
          <iframe
            src="/logo-reveal.html"
            title="Tuning Ideas logo reveal"
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
