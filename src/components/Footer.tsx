import React from 'react';
import { WHATSAPP_LINK, EMAIL_LINK, CONTACT_EMAIL } from '../utils/contactLinks';

interface QuickLink {
  label: string;
  href: string;
  isProjectsRoute?: boolean;
}

const quickLinks: QuickLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Academic Projects', href: '#/projects', isProjectsRoute: true },
  { label: 'Our Work', href: '#work' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  'Website Development',
  'Web Applications',
  'Ecommerce',
  'UI/UX Design',
  'Maintenance',
  'Server Support',
];

const socialLinks = [
  { icon: '📷', label: 'Instagram', href: '#' },
  { icon: '💼', label: 'LinkedIn', href: '#' },
  { icon: '💬', label: 'WhatsApp', href: WHATSAPP_LINK },
  { icon: '✉️', label: 'Email', href: EMAIL_LINK },
];

interface Props {
  onNavigateProjects: () => void;
  onNavigateAnchor: (href: string) => void;
}

const Footer: React.FC<Props> = ({ onNavigateProjects, onNavigateAnchor }) => {
  const handleNav = (link: QuickLink) => {
    if (link.isProjectsRoute) {
      onNavigateProjects();
      return;
    }
    onNavigateAnchor(link.href);
  };

  return (
    <footer
      style={{
        background: 'var(--charcoal)',
        color: 'var(--ivory)',
        padding: '4rem 2rem 2rem',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '3rem',
            marginBottom: '3rem',
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img
                src="/logo-icon.png"
                alt="Tuning Ideas logo"
                width={36}
                height={36}
                style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }}
              />
              <div>
                <div
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--ivory)',
                    letterSpacing: '0.05em',
                    lineHeight: 1.1,
                  }}
                >
                  Tuning Ideas
                </div>
                <span
                  style={{
                    fontSize: '0.58rem',
                    color: 'var(--copper-light)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    display: 'block',
                  }}
                >
                  Full Stack Development & Digital Solutions
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: '0.87rem',
                color: 'rgba(237,232,220,0.55)',
                lineHeight: 1.8,
                marginTop: '1rem',
                maxWidth: 280,
              }}
            >
              Tuning Ideas builds websites, web applications, ecommerce systems,
              and digital tools for growing businesses.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.5rem' }}>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'rgba(237,232,220,0.07)',
                    border: '1px solid rgba(237,232,220,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = 'var(--copper)';
                    el.style.borderColor = 'var(--copper)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = 'rgba(237,232,220,0.07)';
                    el.style.borderColor = 'rgba(237,232,220,0.1)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '1.1rem',
                color: 'var(--copper-light)',
                marginBottom: '1.25rem',
                fontWeight: 600,
              }}
            >
              Quick Links
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => handleNav(l)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'rgba(237,232,220,0.55)',
                      fontSize: '0.85rem',
                      fontFamily: '"Manrope", sans-serif',
                      padding: 0,
                      transition: 'color 0.2s',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.color = 'var(--copper-light)')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(237,232,220,0.55)')
                    }
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '1.1rem',
                color: 'var(--copper-light)',
                marginBottom: '1.25rem',
                fontWeight: 600,
              }}
            >
              Services
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => onNavigateAnchor('#services')}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'rgba(237,232,220,0.55)',
                      fontSize: '0.85rem',
                      fontFamily: '"Manrope", sans-serif',
                      padding: 0,
                      transition: 'color 0.2s',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.color = 'var(--copper-light)')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(237,232,220,0.55)')
                    }
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '1.1rem',
                color: 'var(--copper-light)',
                marginBottom: '1.25rem',
                fontWeight: 600,
              }}
            >
              Contact
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { href: 'tel:+919949826052', label: '+91 99498 26052' },
                { href: EMAIL_LINK, label: CONTACT_EMAIL },
                { href: '#', label: 'India' },
              ].map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    style={{
                      color: 'rgba(237,232,220,0.55)',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--copper-light)')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(237,232,220,0.55)')
                    }
                  >
                    {c.label}
                  </a>
                </li>
              ))}
              <li style={{ marginTop: '0.5rem' }}>
                <a
                  href={WHATSAPP_LINK}
                  style={{
                    color: 'var(--copper-light)',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--copper)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--copper-light)')
                  }
                >
                  💬 WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Leadership */}
        <div
          style={{
            borderTop: '1px solid rgba(237,232,220,0.1)',
            paddingTop: '2rem',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.1rem',
              color: 'var(--copper-light)',
              marginBottom: '1.25rem',
              fontWeight: 600,
            }}
          >
            Leadership
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2.5rem',
            }}
          >
            {[
              { initials: 'MK', name: 'Modem Uday Kiran Kumar', role: 'Founder & CEO' },
              { initials: 'SS', name: 'Sure Silpa', role: 'Co-Founder' },
            ].map((founder) => (
              <div key={founder.name} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'rgba(237,232,220,0.08)',
                    border: '1px solid rgba(237,232,220,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--copper-light)',
                    flexShrink: 0,
                  }}
                >
                  {founder.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--ivory)' }}>
                    {founder.name}
                  </div>
                  <div
                    style={{
                      fontSize: '0.68rem',
                      color: 'var(--copper-light)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      marginTop: '0.1rem',
                    }}
                  >
                    {founder.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(237,232,220,0.1)',
            paddingTop: '1.5rem',
          }}
        >
          <p style={{ fontSize: '0.78rem', color: 'rgba(237,232,220,0.35)', margin: 0 }}>
            © 2026 Tuning Ideas. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
