import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/projects';

const Projects: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work" ref={ref} style={{ padding: '6rem 2rem', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Work</span>
          <h2 className="section-title">Project Showcase</h2>
          <div className="divider" />
          <p style={{ color: 'var(--text-mid)', maxWidth: 560, lineHeight: 1.8, fontSize: '1rem' }}>
            A look at the solutions we build — from delivered full stack systems to concept work
            that shows the range of what we can create for you.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
          }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(28,28,26,0.12)' }}
              style={{
                background: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'box-shadow 0.3s',
              }}
            >
              {/* Card Image Area */}
              <div
                style={{
                  height: 180,
                  background: project.bgColor,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '7rem',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.05)',
                    userSelect: 'none',
                    lineHeight: 1,
                  }}
                >
                  {project.bgLetter}
                </span>
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(28,28,26,0.75)',
                    color: 'var(--copper-light)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    padding: '0.3rem 0.75rem',
                    borderRadius: '100px',
                  }}
                >
                  {project.category}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: project.status === 'Completed' ? '#3F7A4F' : 'var(--copper)',
                    color: 'white',
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    padding: '0.3rem 0.7rem',
                    borderRadius: '100px',
                  }}
                >
                  {project.status ?? 'Concept / Demo'}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.5rem' }}>
                <h3
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--charcoal)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-mid)',
                    lineHeight: 1.75,
                    marginBottom: '1.1rem',
                  }}
                >
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.68rem',
                        background: 'var(--copper-pale)',
                        color: 'var(--bronze)',
                        padding: '0.25rem 0.7rem',
                        borderRadius: '100px',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          style={{
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            marginTop: '2.5rem',
            padding: '1rem 1.5rem',
            background: 'white',
            borderRadius: '10px',
            borderLeft: '3px solid var(--copper)',
          }}
        >
          More client and academic projects will be added as we grow. For now, these showcase the
          type of solutions we build.
        </motion.p>
      </div>
    </section>
  );
};

export default Projects;
