import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import type { AcademicProject } from '../types';
import { getProjectWhatsAppLink, getProjectEmailLink } from '../utils/contactLinks';

interface Props { project: AcademicProject }

const base: React.CSSProperties = {
  flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
  padding: '0.85rem 0.6rem', borderRadius: 12, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700,
};

/** Buttons used inside the light liquid-glass project modal. */
const ProjectContactButtons: React.FC<Props> = ({ project }) => (
  <div style={{ display: 'flex', gap: '0.7rem' }}>
    <a href={getProjectWhatsAppLink(project.title, project.code)} target="_blank" rel="noopener noreferrer"
      style={{ ...base, background: '#25D366', color: '#fff', boxShadow: '0 6px 18px rgba(37,211,102,0.35)' }}>
      <MessageCircle size={16} /> WhatsApp
    </a>
    <a href={getProjectEmailLink(project.title, project.code)}
      style={{ ...base, background: 'rgba(255,255,255,0.25)', color: '#1c1c1a', border: '1.5px solid #1c1c1a' }}>
      <Mail size={16} /> Email
    </a>
  </div>
);

export default ProjectContactButtons;
