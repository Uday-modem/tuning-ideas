import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { SideContent } from '../../content';
import { useIsMobile } from '../../hooks/useIsMobile';
import Icon from '../Icon';
import Link from '../Link';
import ScrollCard from '../ScrollCard';
import { SectionHead } from '../Reveal';

interface Props {
  side: SideContent;
  limit?: number;
}

/**
 * Services: 2 cards per row on desktop, each tilting and rotating into place when it enters.
 * On mobile (1 column) each card rotates in from alternating sides, linked to scroll.
 * Home shows only 4 cards + "Learn more" (links to the full Services page).
 */
const ServicesGrid: React.FC<Props> = ({ side, limit = 4 }) => {
  const mobile = useIsMobile();
  const items = side.services.items.slice(0, limit);

  return (
    <section className="section" id="services">
      <div className="wrap">
        <SectionHead label={side.services.label} title={side.services.title} sub={side.services.sub} />
        <div className="svc-grid">
          {items.map((s, i) => {
            const fromLeft = i % 2 === 0;
            const body = (
              <>
                <Icon name={s.icon} />
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <span className="chip" style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>Outcome: {s.outcome}</span>
              </>
            );
            return mobile ? (
              <ScrollCard key={s.id} from={fromLeft ? 'left' : 'right'} tilt={10} className="card svc-card">
                {body}
              </ScrollCard>
            ) : (
              <motion.article
                key={s.id}
                className="card svc-card"
                initial={{ opacity: 0, rotate: fromLeft ? -9 : 9, rotateX: 22, x: fromLeft ? -70 : 70, y: 90, scale: 0.92 }}
                whileInView={{ opacity: 1, rotate: 0, rotateX: 0, x: 0, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ type: 'spring', stiffness: 70, damping: 15, delay: Math.floor(i / 2) * 0.12 }}
              >
                {body}
              </motion.article>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to={`${side.path}/services`} className="btn btn-accent">
            Learn more <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
