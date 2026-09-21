import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send } from 'lucide-react';
import { WHATSAPP_LINK, EMAIL_LINK, WHATSAPP_LABEL, CONTACT_EMAIL } from '../utils/contactLinks';

interface FormState {
  fname: string;
  bname: string;
  phone: string;
  email: string;
  service: string;
  idea: string;
  schedule: string;
}

const initialForm: FormState = {
  fname: '',
  bname: '',
  phone: '',
  email: '',
  service: '',
  idea: '',
  schedule: '',
};

const Contact: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.fname.trim()) newErrors.fname = 'Required';
    if (!form.phone.trim()) newErrors.phone = 'Required';
    if (!form.email.trim() || !form.email.includes('@')) newErrors.email = 'Valid email required';
    if (!form.idea.trim()) newErrors.idea = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: Integrate EmailJS or Formspree here
    // Example EmailJS: emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')
    // Example Formspree: fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: JSON.stringify(form) })
    setSubmitted(true);
    setForm(initialForm);
  };

  const inputStyle = (hasError?: string): React.CSSProperties => ({
    width: '100%',
    padding: '0.8rem 1rem',
    border: `1.5px solid ${hasError ? '#e24b4a' : 'var(--border-color)'}`,
    borderRadius: 10,
    fontFamily: '"Manrope", sans-serif',
    fontSize: '0.92rem',
    color: 'var(--charcoal)',
    background: 'var(--ivory)',
    outline: 'none',
    transition: 'border-color 0.2s',
  });

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--text-mid)',
    marginBottom: '0.4rem',
    display: 'block',
  };

  const contactDetails = [
    { icon: '👤', label: 'Founder & CEO', value: 'Modem Uday Kiran Kumar' },
    { icon: '👥', label: 'Co-Founder', value: 'Sure Silpa' },
    { icon: '📞', label: 'Phone / WhatsApp', value: '+91 99498 26052' },
    { icon: '✉️', label: 'Email', value: CONTACT_EMAIL },
    { icon: '📍', label: 'Location', value: 'India' },
    { icon: '🕐', label: 'Availability', value: '24/7 for maintenance clients' },
  ];

  return (
    <section id="contact" ref={ref} style={{ padding: '6rem 2rem', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Let's Build Your Idea</h2>
          <div className="divider" />
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: '4rem',
            marginTop: '3rem',
          }}
          className="contact-grid"
        >
          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '1.8rem',
                fontWeight: 700,
                color: 'var(--charcoal)',
                marginBottom: '1.75rem',
              }}
            >
              Talk to Us Directly
            </h3>

            {contactDetails.map((d) => (
              <div
                key={d.label}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.25rem' }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'var(--copper-pale)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {d.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.68rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--copper)',
                      fontWeight: 700,
                      marginBottom: '0.2rem',
                    }}
                  >
                    {d.label}
                  </div>
                  <div style={{ fontSize: '0.92rem', color: 'var(--charcoal)', fontWeight: 500 }}>
                    {d.value}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2rem' }}>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                title={WHATSAPP_LABEL}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.8rem 1.25rem',
                  background: 'var(--charcoal)',
                  color: 'var(--ivory)',
                  borderRadius: 10,
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--copper)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--charcoal)')}
              >
                💬 {WHATSAPP_LABEL}
              </a>
              <a
                href={EMAIL_LINK}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.8rem 1.25rem',
                  background: 'transparent',
                  color: 'var(--charcoal)',
                  border: '1.5px solid var(--charcoal)',
                  borderRadius: 10,
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.88rem',
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
                ✉️ Send Email
              </a>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.8rem 1.25rem',
                  background: 'transparent',
                  color: 'var(--charcoal)',
                  border: '1.5px solid var(--border-color)',
                  borderRadius: 10,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  fontFamily: '"Manrope", sans-serif',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = 'var(--copper)';
                  el.style.color = 'var(--copper)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = 'var(--border-color)';
                  el.style.color = 'var(--charcoal)';
                }}
              >
                📅 Book a Schedule
              </button>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '1.5rem',
              padding: '2.5rem',
            }}
          >
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'var(--copper-pale)',
                  border: '1px solid var(--copper)',
                  borderRadius: 10,
                  padding: '1rem 1.25rem',
                  color: 'var(--bronze)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                ✓ Your request has been submitted. We will contact you soon.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.25rem',
                }}
                className="form-grid-cols"
              >
                {/* Full Name */}
                <div>
                  <label style={labelStyle} htmlFor="fname">
                    Full Name *
                  </label>
                  <input
                    style={inputStyle(errors.fname)}
                    id="fname"
                    name="fname"
                    type="text"
                    placeholder="Your full name"
                    value={form.fname}
                    onChange={handleChange}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--copper)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = errors.fname ? '#e24b4a' : 'var(--border-color)')}
                  />
                  {errors.fname && <span style={{ fontSize: '0.72rem', color: '#e24b4a' }}>{errors.fname}</span>}
                </div>

                {/* Business Name */}
                <div>
                  <label style={labelStyle} htmlFor="bname">
                    Business Name
                  </label>
                  <input
                    style={inputStyle()}
                    id="bname"
                    name="bname"
                    type="text"
                    placeholder="Your business name"
                    value={form.bname}
                    onChange={handleChange}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--copper)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={labelStyle} htmlFor="phone">
                    Phone Number *
                  </label>
                  <input
                    style={inputStyle(errors.phone)}
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 9701 xxxxxx"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--copper)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = errors.phone ? '#e24b4a' : 'var(--border-color)')}
                  />
                  {errors.phone && <span style={{ fontSize: '0.72rem', color: '#e24b4a' }}>{errors.phone}</span>}
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle} htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    style={inputStyle(errors.email)}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--copper)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = errors.email ? '#e24b4a' : 'var(--border-color)')}
                  />
                  {errors.email && <span style={{ fontSize: '0.72rem', color: '#e24b4a' }}>{errors.email}</span>}
                </div>

                {/* Service */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle} htmlFor="service">
                    Service Required
                  </label>
                  <select
                    style={inputStyle()}
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--copper)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                  >
                    <option value="">Select a service...</option>
                    <option>Website Development</option>
                    <option>Web Application</option>
                    <option>Ecommerce</option>
                    <option>Maintenance</option>
                    <option>Server Support</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Idea */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle} htmlFor="idea">
                    Tell Us About Your Idea *
                  </label>
                  <textarea
                    style={{ ...inputStyle(errors.idea), minHeight: 120, resize: 'vertical' }}
                    id="idea"
                    name="idea"
                    placeholder="Describe your project, goals, and any specific requirements..."
                    value={form.idea}
                    onChange={handleChange}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--copper)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = errors.idea ? '#e24b4a' : 'var(--border-color)')}
                  />
                  {errors.idea && <span style={{ fontSize: '0.72rem', color: '#e24b4a' }}>{errors.idea}</span>}
                </div>

                {/* Schedule */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle} htmlFor="schedule">
                    Preferred Schedule / Date
                  </label>
                  <input
                    style={inputStyle()}
                    id="schedule"
                    name="schedule"
                    type="text"
                    placeholder="e.g. Weekday mornings, or a specific date"
                    value={form.schedule}
                    onChange={handleChange}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--copper)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', marginTop: '1.25rem', justifyContent: 'center' }}
              >
                Submit Project Request <Send size={15} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-grid-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
