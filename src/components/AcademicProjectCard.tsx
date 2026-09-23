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

const AcademicProjectCard: React.FC<Props> = ({ project, index, isOpen, onOpen }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.35) }}
      whileHover={{ boxShadow: '0 16px 44px rgba(28,28,26,0.12)', y: -3 }}
      style={{
        background: 'white',
        border: `1px solid ${isOpen ? 'var(--copper)' : 'var(--border-color)'}`,
        borderRadius: '1.25rem',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.25s, box-shadow 0.3s',
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
          fontSize: '1.1rem',
          fontWeight: 700,
          color: 'var(--charcoal)',
          lineHeight: 1.3,
          marginBottom: '0.65rem',
          minHeight: '2.6em',
        }}
      >
        {project.title}
      </h3>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          marginBottom: '1.1rem',
        }}
      >
        <Wrench size={13} />
        <span>{project.tools}</span>
      </div>

      <button
        onClick={onOpen}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          fontSize: '0.78rem',
          fontWeight: 700,
          color: 'var(--copper)',
          letterSpacing: '0.03em',
          marginTop: 'auto',
        }}
      >
        View Objective
        <ChevronRight size={15} />
      </button>
    </motion.div>
  );
};

export default AcademicProjectCard;
