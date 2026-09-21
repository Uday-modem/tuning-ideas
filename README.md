# Tuning Ideas — Website

**Full Stack Development & Digital Solutions**

A premium, responsive business website built with React + Vite + TypeScript + Tailwind CSS + Framer Motion.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
tuning-ideas/
├── public/
│   └── favicon.svg           # TI monogram favicon
├── src/
│   ├── assets/               # Place logo images here
│   │   ├── logo-horizontal.png
│   │   └── logo-monogram.png
│   ├── components/
│   │   ├── TILogo.tsx         # SVG monogram component
│   │   ├── LoadingScreen.tsx  # Animated loading screen
│   │   ├── Navbar.tsx         # Sticky navbar + mobile menu
│   │   ├── Hero.tsx           # Hero section
│   │   ├── About.tsx          # About + founders
│   │   ├── Services.tsx       # 8 service cards
│   │   ├── Process.tsx        # 4-step timeline
│   │   ├── Projects.tsx       # Project showcase
│   │   ├── Testimonials.tsx   # Client reviews
│   │   ├── Contact.tsx        # Contact form + info
│   │   ├── Footer.tsx         # Dark charcoal footer
│   │   ├── FloatingWhatsApp.tsx
│   │   └── BackToTop.tsx
│   ├── data/
│   │   ├── services.ts
│   │   ├── projects.ts
│   │   └── testimonials.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎨 Brand Colors

| Token           | Hex       | Usage                    |
|-----------------|-----------|--------------------------|
| `--ivory`       | `#F5F0E8` | Page background          |
| `--cream`       | `#EDE8DC` | Section alternates       |
| `--charcoal`    | `#1C1C1A` | Primary text / footer    |
| `--copper`      | `#B87333` | Accent / CTA             |
| `--bronze`      | `#A0522D` | Deep copper accent       |
| `--copper-light`| `#D4924A` | Headings on dark bg      |
| `--copper-pale` | `#F0DFC0` | Tag / badge backgrounds  |

---

## 📧 Contact Form Integration

The contact form is ready for **EmailJS** or **Formspree**.

### Option A — Formspree

1. Sign up at [https://formspree.io](https://formspree.io)
2. Create a form and copy your form ID
3. In `src/components/Contact.tsx`, find `handleSubmit` and replace the TODO comment with:

```ts
await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});
```

### Option B — EmailJS

1. Sign up at [https://www.emailjs.com](https://www.emailjs.com)
2. Install: `npm install @emailjs/browser`
3. In `Contact.tsx`:

```ts
import emailjs from '@emailjs/browser';

// Inside handleSubmit:
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  form as Record<string, unknown>,
  'YOUR_PUBLIC_KEY'
);
```

---

## 🖼️ Adding Real Logo Images

Replace the SVG logo with actual PNG images:

1. Copy your logos into `src/assets/`:
   - `logo-horizontal.png` — use in Navbar and Footer
   - `logo-monogram.png` — use as favicon and hero watermark

2. In `Navbar.tsx`, replace `<TILogo />` with:
```tsx
import logoHorizontal from '../assets/logo-horizontal.png';
<img src={logoHorizontal} alt="Tuning Ideas" height={40} />
```

3. Update `public/favicon.svg` or add `logo-monogram.png` to `/public/` and update `index.html`.

---

## 📱 Responsive Breakpoints

- **Mobile** — < 640px: single column, vertical timeline
- **Tablet** — 640–900px: adjusted grids
- **Desktop** — > 900px: full multi-column layouts

---

## 📦 Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** — fast build tool
- **Tailwind CSS 3** — utility-first styling
- **Framer Motion 11** — animations
- **Lucide React** — icons

---

## ✏️ Customization Checklist

- [ ] Replace placeholder phone numbers (`9701xxxxxx`, `8688xxxxxx`)
- [ ] Replace placeholder email (`tuningideas@example.com`)
- [ ] Replace WhatsApp link (`wa.me/919701xxxxxx`) with real number
- [ ] Add real logo images to `src/assets/`
- [ ] Connect contact form to EmailJS or Formspree
- [ ] Replace sample testimonials with real client reviews
- [ ] Add real project screenshots / images to project cards
- [ ] Add real social media profile URLs in `Footer.tsx`
- [ ] Update `og:url` in `index.html` with your live domain

---

© 2026 Tuning Ideas. Founded by Modem Uday Kiran Kumar.
