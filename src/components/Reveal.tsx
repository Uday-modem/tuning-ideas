import React from 'react';
import { motion } from 'framer-motion';

interface WordProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  delay?: number;
  /** true = animate on mount (hero), false = when scrolled into view */
  immediate?: boolean;
  /** for immediate headings: hold the animation until true (e.g. after the intro loader) */
  play?: boolean;
  style?: React.CSSProperties;
}

/** Niva-style heading reveal: words blur-in one by one. */
export const WordReveal: React.FC<WordProps> = ({ text, as = 'h2', className, delay = 0, immediate = false, play = true, style }) => {
  const Tag = motion[as];
  const words = text.split(' ');
  const viewProps = immediate
    ? { animate: (play ? 'show' : 'hidden') as 'show' | 'hidden' }
    : { whileInView: 'show' as const, viewport: { once: true, margin: '-12% 0px' } };
  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      {...viewProps}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          aria-hidden="true"
          style={{ display: 'inline-block', marginRight: '0.28em' }}
          variants={{
            hidden: { opacity: 0, y: 14, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {w}
        </motion.span>
      ))}
    </Tag>
  );
};

interface FadeProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** Single fade-up used sparingly for supporting copy. */
export const Fade: React.FC<FadeProps> = ({ children, delay = 0, y = 16, className, style }) => (
  <motion.div
    className={className}
    style={style}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-8% 0px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

interface HeadProps {
  label: string;
  title: string;
  sub?: string;
  align?: 'center' | 'left';
}

/** Pill label + blur-in title + sub copy. */
export const SectionHead: React.FC<HeadProps> = ({ label, title, sub, align = 'center' }) => (
  <div style={{ textAlign: align, display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', gap: '1.1rem' }}>
    <span className="pill"><span className="pill-dot" />{label}</span>
    <WordReveal text={title} className="h-section" style={{ maxWidth: 780 }} />
    {sub && (
      <Fade delay={0.15}>
        <p className="lede" style={{ margin: align === 'center' ? '0 auto' : 0 }}>{sub}</p>
      </Fade>
    )}
  </div>
);

export const Rule: React.FC = () => <div className="rule" role="presentation" />;
