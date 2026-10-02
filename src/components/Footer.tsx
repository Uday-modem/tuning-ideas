import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { team, sides } from '../content';
import type { Side } from '../content';
import { CONTACT_EMAIL, EMAIL_LINK, WHATSAPP_LINK } from '../utils/contactLinks';
import Link from './Link';

interface Props {
  side: Side | null;
}

const Footer: React.FC<Props> = ({ side }) => {
  const s = side ? sides[side] : null;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="rule" role="presentation" />
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <img src="/logo-icon.png" alt="" width={34} height={34} style={{ objectFit: 'contain' }} />
              <strong style={{ fontSize: '1.05rem', letterSpacing: '-0.02em' }}>Tuning Ideas</strong>
            </div>
            <p style={{ color: 'var(--text-dim)', maxWidth: 320, lineHeight: 1.65, fontSize: '0.95rem' }}>
              {s ? s.footerLine : 'A technology and product company, with two ways to work together.'}
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.2rem' }}>
              <a className="round-btn" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a>
              <a className="round-btn" href={EMAIL_LINK} aria-label={`Email ${CONTACT_EMAIL}`}><Mail size={17} /></a>
            </div>
          </div>

          {s ? (
            s.footerLinks.map((col) => (
              <div key={col.title}>
                <h5>{col.title}</h5>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}><Link to={l.to} className="fl">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div>
              <h5>Pillars</h5>
              <ul>
                <li><Link to="/digital" className="fl">Digital Solutions</Link></li>
                <li><Link to="/lab" className="fl">Student Lab</Link></li>
              </ul>
            </div>
          )}

          <div>
            <h5>{s ? 'Other pillar' : 'Team'}</h5>
            <ul>
              {s ? (
                <li>
                  <Link to={side === 'digital' ? '/lab' : '/digital'} className="fl">
                    {side === 'digital' ? 'Student Lab' : 'Digital Solutions'}
                  </Link>
                </li>
              ) : (
                team.map((f) => (
                  <li key={f.name} style={{ color: 'var(--text-dim)', fontSize: '0.88rem' }}>{f.name}</li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem', color: 'var(--text-faint)', fontSize: '0.8rem' }}>
          <span>© 2026 Tuning Ideas. All rights reserved.</span>
          <span>Technology &amp; Product Company</span>
        </div>
        <div className="footer-word" aria-hidden="true">Tuning Ideas</div>
      </div>
    </footer>
  );
};

export default Footer;
