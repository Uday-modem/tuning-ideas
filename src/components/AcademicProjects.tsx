import React, { useMemo, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, Cpu, GraduationCap, Wrench, X, MessageCircle, Mail } from 'lucide-react';
import { academicProjects } from '../data/academicProjects';
import type { AcademicProject } from '../types';
import { getProjectWhatsAppLink, getProjectEmailLink } from '../utils/contactLinks';

const levels = ['Diploma', 'B.Tech', 'M.Tech'];

const categories = [
  'All',
  'IoT',
  'AI',
  'Deep Learning',
  'Machine Learning',
  'Embedded',
  'Biomedical',
  'Robotics',
  'Electrical',
  'Renewable Energy',
  'Computer Vision',
];

const PAGE_SIZE = 9;

const ProjectCard: React.FC<{ project: AcademicProject; index: number }> = ({ project, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -4, boxShadow: '0 16px 44px rgba(28,28,26,0.12)' }}
      style={{
        background: 'white',
        border: '1px solid var(--border-color)',
        borderRadius: '1.25rem',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.3s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '0.68rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            letterSpacing: '0.04em',
          }}
        >
          {project.code}
        </span>
        <span
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'var(--bronze)',
            background: 'var(--copper-pale)',
            padding: '0.28rem 0.65rem',
            borderRadius: '100px',
            whiteSpace: 'nowrap',
          }}
        >
          {project.category}
        </span>
      </div>

      <h3
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: 'var(--charcoal)',
          lineHeight: 1.3,
          marginBottom: '0.65rem',
          minHeight: '2.6em',
        }}
      >
        {project.title}
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              fontSize: '0.83rem',
              color: 'var(--text-mid)',
              lineHeight: 1.75,
              marginBottom: '0.85rem',
              overflow: 'hidden',
            }}
          >
            {project.objective}
          </motion.p>
        )}
      </AnimatePresence>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          marginBottom: '1rem',
        }}
      >
        <Wrench size={13} />
        <span>{project.tools}</span>
      </div>

      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          fontSize: '0.78rem',
          fontWeight: 700,
          color: 'var(--copper)',
          letterSpacing: '0.03em',
          marginBottom: '1rem',
        }}
      >
        {open ? 'Hide Objective' : 'View Objective'}
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>

      <div
        style={{
          display: 'flex',
          gap: '0.6rem',
          marginTop: 'auto',
          paddingTop: '0.9rem',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        <a
          href={getProjectWhatsAppLink(project.title, project.code)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            padding: '0.55rem 0.6rem',
            background: '#25D366',
            color: 'white',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: '0.76rem',
            fontWeight: 700,
          }}
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>
        <a
          href={getProjectEmailLink(project.title, project.code)}
          style={{
            flex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            padding: '0.55rem 0.6rem',
            background: 'transparent',
            color: 'var(--charcoal)',
            border: '1.5px solid var(--charcoal)',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: '0.76rem',
            fontWeight: 700,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.borderColor = 'var(--copper)';
            el.style.color = 'var(--copper)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.borderColor = 'var(--charcoal)';
            el.style.color = 'var(--charcoal)';
          }}
        >
          <Mail size={14} />
          Email
        </a>
      </div>
    </motion.div>
  );
};

const AcademicProjects: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return academicProjects.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const visible = filtered.slice(0, visibleCount);

  const handleFilterChange = (cat: string) => {
    setCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section
      id="academic-projects"
      ref={ref}
      style={{ padding: '6rem 2rem', background: 'var(--ivory)' }}
    >
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
            110+ ready-to-build project titles across Embedded Systems, IoT, AI / ML, and Robotics —
            complete with objectives, tools, and full academic support from idea to viva.
          </p>

          {/* Level chips */}
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
                letterSpacing: '0.06em',
                padding: '0.45rem 1rem',
                borderRadius: '100px',
              }}
            >
              <Cpu size={13} />
              {academicProjects.length} Project Titles
            </span>
          </div>
        </motion.div>

        {/* Search + Filters */}
        <div style={{ marginTop: '2.75rem' }}>
          <div style={{ position: 'relative', maxWidth: 440, marginBottom: '1.25rem' }}>
            <Search
              size={17}
              style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search by title, code or domain…"
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
            />
            {query && (
              <button
                onClick={() => handleQueryChange('')}
                aria-label="Clear search"
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                style={{
                  background: category === cat ? 'var(--charcoal)' : 'white',
                  color: category === cat ? 'var(--copper-light)' : 'var(--text-mid)',
                  border: `1px solid ${category === cat ? 'var(--charcoal)' : 'var(--border-color)'}`,
                  padding: '0.5rem 1.1rem',
                  borderRadius: '100px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  letterSpacing: '0.03em',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '1.5rem 0 1rem' }}>
          Showing {visible.length} of {filtered.length} matching titles
        </p>

        {/* Grid */}
        {visible.length > 0 ? (
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.25rem',
            }}
          >
            <AnimatePresence>
              {visible.map((project, i) => (
                <ProjectCard key={project.code} project={project} index={i % PAGE_SIZE} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: 'var(--text-muted)',
              background: 'white',
              borderRadius: '1rem',
              border: '1px solid var(--border-color)',
            }}
          >
            No project titles match your search. Try a different keyword or category.
          </div>
        )}

        {/* Load more */}
        {visibleCount < filtered.length && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="btn-secondary"
            >
              Load More Titles ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
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
          Don't see a title that fits your interest? We also build fully custom final-year projects
          based on your department and idea — reach out and we'll scope it with you.
        </motion.p>
      </div>
    </section>
  );
};

export default AcademicProjects;
