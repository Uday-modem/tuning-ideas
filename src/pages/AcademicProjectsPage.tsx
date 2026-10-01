import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code2, Cpu, Search, X } from 'lucide-react';
import { cseProjects, departmentCategories, eceProjects, projectCounts } from '../data/allProjects';
import AcademicProjectCard from '../components/AcademicProjectCard';
import ProjectDetailModal from '../components/ProjectDetailModal';
import PageHero from '../components/PageHero';

const PAGE_SIZE = 12;
type Department = 'ECE' | 'CSE';

/** Student Lab catalogue: department tabs, search, category chips, load more, detail modal. */
const AcademicProjectsPage: React.FC = () => {
  const [department, setDepartment] = useState<Department>('ECE');
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const dataset = department === 'ECE' ? eceProjects : cseProjects;
  const categories = ['All', ...departmentCategories[department]];
  const selected = dataset.find((p) => p.code === selectedCode) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dataset.filter((p) => (category === 'All' || p.category === category) &&
      (!q || p.title.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.domain.toLowerCase().includes(q)));
  }, [dataset, query, category]);

  const visible = filtered.slice(0, visibleCount);
  const switchDept = (d: Department) => { setDepartment(d); setCategory('All'); setQuery(''); setVisibleCount(PAGE_SIZE); setSelectedCode(null); };

  const tab = (d: Department, icon: React.ReactNode, count: number) => (
    <button key={d} onClick={() => switchDept(d)} className={`filter-chip${department === d ? ' on' : ''}`} style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center', padding: '0.7rem 1.3rem', fontSize: '0.9rem' }}>
      {icon} {d} ({count})
    </button>
  );

  return (
    <>
      <PageHero label="Student Lab · Catalogue" title={`${projectCounts.total}+ final year project titles.`} sub="Across Electronics (ECE) and Computer Science (CSE), each with objectives, tools, and full academic support from idea to viva." />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="filter-row" style={{ marginTop: 0 }}>
            {tab('ECE', <Cpu size={16} />, projectCounts.ECE)}
            {tab('CSE', <Code2 size={16} />, projectCounts.CSE)}
          </div>
          <div style={{ position: 'relative', maxWidth: 460, margin: '2rem auto 1.2rem' }}>
            <Search size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
            <input className="input" style={{ paddingLeft: '2.5rem' }} value={query} onChange={(e) => { setQuery(e.target.value); setVisibleCount(PAGE_SIZE); }} placeholder="Search by title, code or domain…" aria-label="Search projects" />
            {query && <button onClick={() => setQuery('')} aria-label="Clear search" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-faint)', cursor: 'pointer', display: 'flex' }}><X size={16} /></button>}
          </div>
          <div className="filter-row" style={{ marginTop: 0 }}>
            {categories.map((c) => (
              <button key={c} className={`filter-chip${category === c ? ' on' : ''}`} onClick={() => { setCategory(c); setVisibleCount(PAGE_SIZE); }}>{c}</button>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-faint)', margin: '1.6rem 0 1.2rem' }}>Showing {visible.length} of {filtered.length} matching titles in {department}</p>
          {visible.length > 0 ? (
            <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.2rem' }}>
              <AnimatePresence>
                {visible.map((p, i) => (
                  <AcademicProjectCard key={p.code} project={p} index={i % PAGE_SIZE} isOpen={selectedCode === p.code} onOpen={() => setSelectedCode(p.code)} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-dim)' }}>No titles match yet. Try a different keyword or category, or ask us to build a custom one.</div>
          )}
          {visibleCount < filtered.length && (
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <button className="btn btn-ghost" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>Load more titles ({filtered.length - visibleCount} remaining)</button>
            </div>
          )}
        </div>
      </section>
      <ProjectDetailModal project={selected} onClose={() => setSelectedCode(null)} />
    </>
  );
};

export default AcademicProjectsPage;
