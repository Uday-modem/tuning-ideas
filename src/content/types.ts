export type Side = 'digital' | 'lab';

export type IconKey =
  | 'globe' | 'layers' | 'cart' | 'palette' | 'wrench' | 'server' | 'workflow' | 'headphones'
  | 'cap' | 'code' | 'file' | 'mic' | 'award' | 'search' | 'rocket' | 'store' | 'building'
  | 'briefcase' | 'shield' | 'sparkles' | 'lightbulb' | 'cpu' | 'brain' | 'target' | 'send' | 'users' | 'book';

export interface ServiceItem {
  id: string;
  icon: IconKey;
  title: string;
  short: string;
  outcome: string;
  included: string[];
  bestFor: string;
  outcomes: string[];
  useCases: string[];
  cta: string;
}

export interface ProblemCard {
  title: string;
  body: string;
}

export interface AudienceRow {
  title: string;
  body: string;
  icon: IconKey;
}

export interface ProgressStep {
  icon: IconKey;
  title: string;
  body: string;
}

export interface WorkItem {
  id: string;
  tag: string;
  kind: string;
  headline: string;
  summary: string;
  tech: string[];
  status: 'Completed' | 'Concept / Demo' | 'Ready to build';
  seed: number;
  /** image file in /public without extension (DS1, SLS1 …). Optional: falls back to generated art. */
  image?: string;
  problem: string;
  approach: string[];
  results: string[];
}

export interface Review {
  id: number;
  quote: string;
  name: string;
  role: string;
  initial: string;
  sample: boolean;
}

export interface Faq {
  q: string;
  a: string;
}

export interface MatchRow {
  need: string;
  start: string;
}

export interface Belief {
  title: string;
  body: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface AboutContent {
  heroTitle: string;
  heroSub: string;
  storyLabel: string;
  storyTitle: string;
  story: string[];
  quote: string;
  beliefsTitle: string;
  beliefs: Belief[];
  stats: Stat[];
  ctaTitle: string;
  ctaSub: string;
}

export interface NavItem {
  label: string;
  to: string;
}

export interface SideContent {
  key: Side;
  name: string;
  path: string;
  nav: NavItem[];
  heroHeadline: string[];
  heroEyebrow: string;
  /** short welcome line shown in the bubble-game win message */
  welcome: string;
  heroSub: string;
  primary: NavItem;
  secondary: NavItem;
  problem: { label: string; title: string; sub: string; cards: ProblemCard[] };
  services: {
    label: string;
    title: string;
    sub: string;
    pageTitle: string;
    pageSub: string;
    items: ServiceItem[];
    matchTitle: string;
    match: MatchRow[];
  };
  audience: { label: string; title: string; sub: string; rows: AudienceRow[] };
  progress: { label: string; title: string; sub: string; steps: ProgressStep[] };
  work: { label: string; title: string; sub: string; pageTitle: string; pageSub: string; items: WorkItem[] };
  reviews: { label: string; title: string; sub: string; items: Review[] };
  /** optional academic-integrity statement shown on Student Lab pages */
  integrity?: { title: string; body: string; points: string[] };
  about: AboutContent;
  faqs: Faq[];
  contact: { label: string; title: string; sub: string; options: string[]; intro: string };
  footerLine: string;
  footerLinks: { title: string; links: NavItem[] }[];
}
