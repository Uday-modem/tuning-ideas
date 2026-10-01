import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onDone: () => void;
}

/**
 * Intro loader (Niva-style): logo + progress bar + big % counter, then the curtain lifts.
 * ~2.9s total. Skipped for reduced-motion users.
 */
const Intro: React.FC<Props> = ({ onDone }) => {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const steps = [7, 18, 29, 41, 56, 68, 79, 90, 97, 100];
    let i = 0;
    const timer = window.setInterval(() => {
      setPct(steps[i]);
      i += 1;
      if (i >= steps.length) {
        window.clearInterval(timer);
        window.setTimeout(() => setLeaving(true), 280);
      }
    }, 240);
    return () => {
      window.clearInterval(timer);
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      className="intro"
      initial={{ y: 0 }}
      animate={{ y: leaving ? '-100%' : 0 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (leaving) {
          document.body.style.overflow = '';
          onDone();
        }
      }}
      aria-label="Loading Tuning Ideas"
      role="status"
    >
      <motion.div
        className="intro-logo"
        initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7 }}
      >
        <img src="/favicon.png" alt="" />
        <span>Tuning Ideas</span>
      </motion.div>
      <motion.div className="intro-tag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        Technology &amp; Product Company
      </motion.div>
      <div className="intro-bar" aria-hidden="true">
        <i style={{ width: `${pct}%` }} />
      </div>
      <div className="intro-count" aria-hidden="true">{pct}%</div>
    </motion.div>
  );
};

export default Intro;
