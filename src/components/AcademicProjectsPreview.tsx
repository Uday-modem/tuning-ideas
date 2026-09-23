import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Cpu, Code2, GraduationCap } from 'lucide-react';
import { eceProjects, cseProjects, projectCounts } from '../data/allProjects';

interface Props {
  onViewAll: () => void;
}

const levels = ['Diploma', 'B.Tech', 'M.Tech'];

// A handful of highlight titles pulled from each department for the teaser grid.
const highlights = [...eceProjects.slice(0, 3), ...cseProjects.slice(0, 3)];

const AcademicProjectsPreview: React.FC<Props> = ({ onViewAll }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="academic-projects" ref={ref} style={{ padding: '6rem 2rem', background: 'var(--ivory)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">For Diploma / B.Tech / M.Tech Students</span>
          <h2 className="section-title">Final Year Academic Projects</h2>
          <div className="divider" />
          <p style={{ color: 'var(--text-mid)', maxWidth: 620, lineHeight: 1.8, fontSize: '1rem' }}>
            {projectCounts.total}+ ready-to-build project titles across Electronics (ECE) and
            Computer Science (CSE) — complete with objectives, tools, and full academic support
            from idea to viva.
          </p>

          {/* Level + department chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1.75rem' }}>
            {levels.map((lvl) => (
              <span
                key={lvl}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'var(--charcoal)',
                  color: 'var(--copper-light)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.45rem 1rem',
                  borderRadius: '100px',
                }}
              >
                <GraduationCap size={13} />
                {lvl}
              </span>
            ))}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'white',
                border: '1px solid var(--border-color)',
                color: 'var(--text-mid)',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.45rem 1rem',
                borderRadius: '100px',
              }}
            >
              <Cpu size={13} />
              ECE · {projectCounts.ECE}
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'white',
                border: '1px solid var(--border-color)',
                color: 'var(--text-mid)',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.45rem 1rem',
                borderRadius: '100px',
              }}
            >
              <Code2 size={13} />
              CSE · {projectCounts.CSE}
            </span>
          </div>
        </motion.div>

        {/* Preview grid — simple, non-interactive teaser cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.1rem',
            marginTop: '2.75rem',
          }}
        >
          {highlights.map((project, i) => (
            <motion.div
              key={project.code}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{
                background: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: '1.1rem',
                padding: '1.3rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.7rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.66rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  {project.code}
                </span>
                <span
                  style={{
                    fontSize: '0.58rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    color: 'var(--bronze)',
                    background: 'var(--copper-pale)',
                    padding: '0.24rem 0.6rem',
                    borderRadius: '100px',
                  }}
                >
                  {project.category}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--charcoal)',
                  lineHeight: 1.3,
                }}
              >
                {project.title}
              </h3>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <button onClick={onViewAll} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Show More Projects ({projectCounts.total}) <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AcademicProjectsPreview;
