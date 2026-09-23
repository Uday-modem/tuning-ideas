import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import type { AcademicProject } from '../types';
import { getProjectWhatsAppLink, getProjectEmailLink } from '../utils/contactLinks';

interface Props {
  project: AcademicProject;
}

const ProjectContactButtons: React.FC<Props> = ({ project }) => (
  <div style={{ display: 'flex', gap: '0.6rem' }}>
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
        padding: '0.65rem 0.6rem',
        background: '#25D366',
        color: 'white',
        borderRadius: 8,
        textDecoration: 'none',
        fontSize: '0.8rem',
        fontWeight: 700,
      }}
    >
      <MessageCircle size={15} />
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
        padding: '0.65rem 0.6rem',
        background: 'transparent',
        color: 'var(--charcoal)',
        border: '1.5px solid var(--charcoal)',
        borderRadius: 8,
        textDecoration: 'none',
        fontSize: '0.8rem',
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
      <Mail size={15} />
      Email
    </a>
  </div>
);

export default ProjectContactButtons;
