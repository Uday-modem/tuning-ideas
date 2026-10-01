import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Wrench } from 'lucide-react';
import type { AcademicProject } from '../types';

interface Props {
  project: AcademicProject;
  index: number;
  isOpen: boolean;
  onOpen: () => void;
}

const AcademicProjectCard: React.FC<Props> = ({ project, index, isOpen, onOpen }) => (
  <motion.div
    layout
    className="card"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.35) }}
    style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', borderColor: isOpen ? 'var(--accent)' : undefined }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
      <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: 'var(--text-faint)' }}>{project.code}</span>
      <span className="tag accent">{project.category}</span>
    </div>
    <h3 style={{ fontSize: '1.05rem', lineHeight: 1.3 }}>{project.title}</h3>
    <div style={{ display: 'flex', gap: '0.4rem', fontSize: '0.76rem', color: 'var(--text-faint)' }}>
      <Wrench size={13} style={{ flexShrink: 0, marginTop: 3 }} />
      <span>{project.tools}</span>
    </div>
    <button onClick={onOpen} style={{ marginTop: 'auto', background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: 0, alignSelf: 'flex-start' }}>
      View objective <ChevronRight size={15} />
    </button>
  </motion.div>
);

export default AcademicProjectCard;
