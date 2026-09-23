import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Cpu, GraduationCap, X, ArrowLeft, Cpu as CpuIcon, Code2 } from 'lucide-react';
import { eceProjects, cseProjects, projectCounts, departmentCategories } from '../data/allProjects';
import AcademicProjectCard from '../components/AcademicProjectCard';
import ProjectDetailModal from '../components/ProjectDetailModal';

const levels = ['Diploma', 'B.Tech', 'M.Tech'];
const PAGE_SIZE = 12;

type Department = 'ECE' | 'CSE';

interface Props {
  onBack: () => void;
}

const AcademicProjectsPage: React.FC<Props> = ({ onBack }) => {
  const [department, setDepartment] = useState<Department>('ECE');
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const dataset = department === 'ECE' ? eceProjects : cseProjects;
  const categories = ['All', ...departmentCategories[department]];
  const selectedProject = dataset.find((p) => p.code === selectedCode) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dataset.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [dataset, query, category]);

  const visible = filtered.slice(0, visibleCount);

  const switchDepartment = (dept: Department) => {
    setDepartment(dept);
    setCategory('All');
    setQuery('');
    setVisibleCount(PAGE_SIZE);
    setSelectedCode(null);
  };

  const handleFilterChange = (cat: string) => {
    setCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setVisibleCount(PAGE_SIZE);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div style={{ paddingTop: '6.5rem', background: 'var(--ivory)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem 6rem' }}>
        {/* Back link */}
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-mid)',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            padding: 0,
          }}
        >
          <ArrowLeft size={15} />
          Back to Home
        </button>

        <span className="section-label">For Diploma / B.Tech / M.Tech Students</span>
        <h2 className="section-title">Final Year Academic Projects</h2>
        <div className="divider" />
        <p style={{ color: 'var(--text-mid)', maxWidth: 640, lineHeight: 1.8, fontSize: '1rem' }}>
          {projectCounts.total}+ ready-to-build project titles across Electronics (ECE) and Computer
          Science (CSE) — complete with objectives, tools, and full academic support from idea to
          viva.
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
        </div>

        {/* Department tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginTop: '2.5rem',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '1.5rem',
          }}
        >
          <button
            onClick={() => switchDepartment('ECE')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.85rem 1.5rem',
              borderRadius: '1rem',
              border: `1.5px solid ${department === 'ECE' ? 'var(--charcoal)' : 'var(--border-color)'}`,
              background: department === 'ECE' ? 'var(--charcoal)' : 'white',
              color: department === 'ECE' ? 'var(--copper-light)' : 'var(--charcoal)',
              cursor: 'pointer',
              fontWeight: 700,
              transition: 'all 0.2s',
            }}
          >
            <CpuIcon size={18} />
            <span>
              ECE <span style={{ opacity: 0.75, fontWeight: 500 }}>({projectCounts.ECE})</span>
            </span>
          </button>
          <button
            onClick={() => switchDepartment('CSE')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.85rem 1.5rem',
              borderRadius: '1rem',
              border: `1.5px solid ${department === 'CSE' ? 'var(--charcoal)' : 'var(--border-color)'}`,
              background: department === 'CSE' ? 'var(--charcoal)' : 'white',
              color: department === 'CSE' ? 'var(--copper-light)' : 'var(--charcoal)',
              cursor: 'pointer',
              fontWeight: 700,
              transition: 'all 0.2s',
            }}
          >
            <Code2 size={18} />
            <span>
              CSE <span style={{ opacity: 0.75, fontWeight: 500 }}>({projectCounts.CSE})</span>
            </span>
          </button>
        </div>

        {/* Search + Category Filters */}
        <div style={{ marginTop: '2rem' }}>
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
          Showing {visible.length} of {filtered.length} matching titles in {department}
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
                <AcademicProjectCard
                  key={project.code}
                  project={project}
                  index={i % PAGE_SIZE}
                  isOpen={selectedCode === project.code}
                  onOpen={() => setSelectedCode(project.code)}
                />
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
            No project titles match your search yet. Try a different keyword or category — or ask us
            to build a custom one for you.
          </div>
        )}

        {/* Load more */}
        {visibleCount < filtered.length && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={() => setVisibleCount((c) => c + PAGE_SIZE)} className="btn-secondary">
              Load More Titles ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            marginTop: '3rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            background: 'var(--charcoal)',
            borderRadius: '1.25rem',
            padding: '2rem 2.25rem',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--ivory)',
                marginBottom: '0.4rem',
              }}
            >
              Don't see a title that fits?
            </div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.7)', maxWidth: 460 }}>
              We also build fully custom final-year projects based on your department and idea —
              tap a project's WhatsApp button or reach out directly and we'll scope it with you.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--copper-light)' }}>
            <Cpu size={16} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{projectCounts.total} Titles Live</span>
          </div>
        </motion.div>
      </div>

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedCode(null)} />
    </div>
  );
};

export default AcademicProjectsPage;
