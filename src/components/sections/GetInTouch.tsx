import React, { useState } from 'react';
import { Check, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import type { SideContent } from '../../content';
import { CONTACT_EMAIL, getEnquiryEmailLink, getEnquiryWhatsAppLink } from '../../utils/contactLinks';
import { Fade, SectionHead } from '../Reveal';

interface Props {
  side: SideContent;
  /** hide the section heading (contact page already has a hero) */
  bare?: boolean;
}

interface Form {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

const empty: Form = { name: '', email: '', phone: '', topic: '', message: '' };

const GetInTouch: React.FC<Props> = ({ side, bare = false }) => {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState<{ wa: string; mail: string } | null>(null);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Partial<Record<keyof Form, string>> = {};
    if (!form.name.trim()) er.name = 'Please enter your name.';
    if (!form.email.includes('@')) er.email = 'Enter a valid email address.';
    if (!form.phone.trim()) er.phone = 'Please enter a phone number.';
    if (!form.message.trim()) er.message = 'Tell us a little about what you need.';
    setErrors(er);
    if (Object.keys(er).length) return;

    // TODO: connect Formspree / EmailJS. Until then the enquiry is handed off over WhatsApp / email.
    const lines = [
      side.contact.intro,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      form.topic ? `Topic: ${form.topic}` : '',
      `Message: ${form.message}`,
    ];
    const wa = getEnquiryWhatsAppLink(lines);
    const mail = getEnquiryEmailLink(`${side.name} enquiry from ${form.name}`, lines);
    setSent({ wa, mail });
    window.open(wa, '_blank', 'noopener,noreferrer');
    setForm(empty);
  };

  const details = [
    { icon: <Phone size={16} />, label: 'Phone / WhatsApp', value: '+91 99498 26052' },
    { icon: <Mail size={16} />, label: 'Email', value: CONTACT_EMAIL },
    { icon: <MapPin size={16} />, label: 'Location', value: 'India' },
  ];

  return (
    <section className={bare ? 'section-tight' : 'section'} id="contact">
      <div className="wrap">
        {!bare && <SectionHead label={side.contact.label} title={side.contact.title} sub={side.contact.sub} />}
        <Fade delay={0.1} style={{ marginTop: bare ? 0 : '3rem' }}>
          <div className="contact-box">
            <div>
              <span className="pill"><span className="pill-dot" />{side.name}</span>
              <h3 style={{ fontSize: '1.9rem', margin: '1.1rem 0 0.8rem' }}>{bare ? 'Tell us about your project.' : 'Talk to us directly.'}</h3>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '1.8rem' }}>
                Replies come from the people who will actually do the work.
              </p>
              {details.map((d) => (
                <div key={d.label} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="chrome-tile" style={{ width: 38, height: 38, borderRadius: 11 }}>{d.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)' }}>{d.label}</div>
                    <div style={{ fontSize: '0.92rem' }}>{d.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={submit} noValidate aria-label="Enquiry form">
              {sent && (
                <div className="card" style={{ padding: '1rem 1.2rem', marginBottom: '1.2rem', borderColor: 'rgba(var(--dot),0.4)' }} role="status">
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: 600, marginBottom: '0.4rem' }}>
                    <Check size={16} color="rgb(var(--dot))" /> Enquiry ready
                  </div>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.86rem' }}>
                    We opened WhatsApp with your message. If it didn’t open,{' '}
                    <a href={sent.wa} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>send on WhatsApp</a> or{' '}
                    <a href={sent.mail} style={{ color: 'var(--accent)' }}>send by email</a>.
                  </p>
                </div>
              )}
              <div className="field">
                <label htmlFor="f-name">Name</label>
                <input id="f-name" name="name" className={`input${errors.name ? ' err' : ''}`} value={form.name} onChange={change} placeholder="Your full name" autoComplete="name" />
                {errors.name && <span className="err-text">{errors.name}</span>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(190px, 100%), 1fr))', gap: '0 1rem' }}>
                <div className="field">
                  <label htmlFor="f-email">Email</label>
                  <input id="f-email" name="email" type="email" className={`input${errors.email ? ' err' : ''}`} value={form.email} onChange={change} placeholder="you@example.com" autoComplete="email" />
                  {errors.email && <span className="err-text">{errors.email}</span>}
                </div>
                <div className="field">
                  <label htmlFor="f-phone">Phone</label>
                  <input id="f-phone" name="phone" type="tel" className={`input${errors.phone ? ' err' : ''}`} value={form.phone} onChange={change} placeholder="+91 …" autoComplete="tel" />
                  {errors.phone && <span className="err-text">{errors.phone}</span>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-topic">What are you looking for?</label>
                <select id="f-topic" name="topic" className="input" value={form.topic} onChange={change}>
                  <option value="">Select…</option>
                  {side.contact.options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-message">Tell us more</label>
                <textarea id="f-message" name="message" rows={4} className={`input${errors.message ? ' err' : ''}`} value={form.message} onChange={change} placeholder={side.key === 'lab' ? 'Your branch, level, and deadline…' : 'What are you trying to build?'} />
                {errors.message && <span className="err-text">{errors.message}</span>}
              </div>
              <button type="submit" className="btn btn-accent" style={{ width: '100%', justifyContent: 'center' }}>
                <Send size={16} /> Send message
              </button>
              <p style={{ color: 'var(--text-faint)', fontSize: '0.78rem', marginTop: '0.9rem', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <MessageCircle size={13} /> Sending opens WhatsApp with your details filled in.
              </p>
            </form>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default GetInTouch;
