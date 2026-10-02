import React from 'react';
import { Check } from 'lucide-react';
import type { SideContent } from '../../content';
import Icon from '../Icon';
import { Fade } from '../Reveal';

interface Props {
  side: SideContent;
}

/** Academic-integrity statement (Student Lab): mentorship and prototyping, the student does the work. */
const IntegrityNote: React.FC<Props> = ({ side }) => {
  const n = side.integrity;
  if (!n) return null;
  return (
    <section className="section-tight">
      <div className="wrap">
        <Fade>
          <div className="card" style={{ padding: 'clamp(1.4rem, 3vw, 2.2rem)', display: 'flex', gap: '1.6rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <Icon name="shield" large />
            <div style={{ flex: '1 1 280px', minWidth: 0 }}>
              <h3 style={{ fontSize: 'clamp(1.35rem, 2.6vw, 1.8rem)', marginBottom: '0.7rem' }}>{n.title}</h3>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.75, maxWidth: 760 }}>{n.body}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '1.2rem 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '0.6rem 1.5rem' }}>
                {n.points.map((p) => (
                  <li key={p} style={{ display: 'flex', gap: '0.55rem', alignItems: 'flex-start', color: 'var(--text)', fontSize: '0.92rem' }}>
                    <Check size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 3 }} /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default IntegrityNote;
