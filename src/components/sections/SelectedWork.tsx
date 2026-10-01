import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { SideContent, WorkItem } from '../../content';
import Art from '../Art';
import Link from '../Link';
import { SectionHead } from '../Reveal';

interface CardProps {
  item: WorkItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  base: string;
}

const StackCard: React.FC<CardProps> = ({ item, index, total, progress, base }) => {
  const last = index === total - 1;
  // earlier cards shrink slightly as the next card slides over them
  const scale = useTransform(progress, [(index + 0.35) / total, (index + 1) / total], [1, last ? 1 : 0.94]);
  const filter = useTransform(progress, [(index + 0.35) / total, (index + 1) / total], [1, last ? 1 : 0.6]);
  const filterCss = useTransform(filter, (v) => `brightness(${v})`);
  return (
    <motion.div
      className="sw-card"
      style={{ top: `calc(var(--nav-h) + 1.6rem + ${index * 1.1}rem)`, scale, filter: filterCss }}
    >
      <div className="sw-inner">
        <div className="sw-info">
          <div>
            <div className="sw-meta" style={{ marginBottom: '1rem' }}>
              <span className="tag accent">{item.status}</span>
              <span>{item.tag}</span>
            </div>
            <h3>{item.headline}</h3>
            <p style={{ marginTop: '0.9rem' }}>{item.summary}</p>
          </div>
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
              {item.tech.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
            <Link to={`${base}/work/${item.id}`} className="btn btn-ghost btn-sm">
              Read details <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <div className="sw-art">
          <Art seed={item.seed} />
        </div>
      </div>
    </motion.div>
  );
};

interface Props {
  side: SideContent;
  initial?: number;
  /** digital: reveal the remaining projects inline with a "Load more" button */
  expandable?: boolean;
}

/**
 * Selected work: cards are pinned (position: sticky) so each new card slides up and overlaps
 * the previous one while the earlier ones scale back.
 */
const SelectedWork: React.FC<Props> = ({ side, initial = 3, expandable = false }) => {
  const [all, setAll] = useState(false);
  const items = expandable && all ? side.work.items : side.work.items.slice(0, initial);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const hasMore = expandable && side.work.items.length > initial;

  return (
    <section className="section" id="work" style={{ paddingBottom: '2rem' }}>
      <div className="wrap">
        <SectionHead label={side.work.label} title={side.work.title} sub={side.work.sub} />
        <div className="sw-list" ref={ref}>
          {items.map((it, i) => (
            <StackCard key={it.id} item={it} index={i} total={items.length} progress={scrollYProgress} base={side.path} />
          ))}
        </div>
        <div style={{ textAlign: 'center', display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {hasMore && !all && (
            <button className="btn btn-ghost" onClick={() => setAll(true)}>
              Load more <ChevronDown size={16} />
            </button>
          )}
          <Link to={side.key === 'lab' ? '/lab/projects' : '/digital/work'} className="btn btn-accent">
            {side.key === 'lab' ? `View all ${side.about.stats[0].value} titles` : 'View all work'} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
