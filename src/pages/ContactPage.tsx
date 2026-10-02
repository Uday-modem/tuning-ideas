import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SideContent } from '../content';
import PageHero from '../components/PageHero';
import GetInTouch from '../components/sections/GetInTouch';
import { SectionHead } from '../components/Reveal';

interface Props { side: SideContent }

const ContactPage: React.FC<Props> = ({ side }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero label={`Contact · ${side.name}`} title={side.contact.title} sub={side.contact.sub} />
      <GetInTouch side={side} bare />
      <section className="section">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '3rem', alignItems: 'start' }}>
          <SectionHead label="Common questions" title="Questions you might have." align="left" />
          <div>
            {side.faqs.map((f, i) => (
              <div className="faq-item" key={f.q}>
                <button className="faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                  {f.q}
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                      <p className="faq-a">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
