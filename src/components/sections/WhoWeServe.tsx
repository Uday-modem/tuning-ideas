import React from 'react';
import { motion } from 'framer-motion';
import type { SideContent } from '../../content';
import Icon from '../Icon';
import { SectionHead } from '../Reveal';

interface Props {
  side: SideContent;
}

/** Who we serve: every row slides in from the left towards the right. */
const WhoWeServe: React.FC<Props> = ({ side }) => (
  <section className="section" id="serve" style={{ paddingTop: '3rem' }}>
    <div className="wrap">
      <SectionHead label={side.audience.label} title={side.audience.title} sub={side.audience.sub} align="left" />
      <div className="aud-list">
        {side.audience.rows.map((r, i) => (
          <motion.div
            key={r.title}
            className="aud-row"
            initial={{ opacity: 0, x: -160 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="aud-no">{String(i + 1).padStart(3, '0')}</span>
            <div>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </div>
            <Icon name={r.icon} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoWeServe;
