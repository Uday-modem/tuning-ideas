import type { SideContent, WorkItem } from './types';
import { allAcademicProjects, projectCounts } from '../data/allProjects';
import { academicServices } from '../data/academicServices';

const firstSentence = (text: string): string => {
  const cut = text.indexOf('. ');
  return cut > 0 ? text.slice(0, cut + 1) : text;
};

const trim = (text: string, max: number): string =>
  text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, '')}…` : text;

const pick = (code: string, seed: number): WorkItem | null => {
  const p = allAcademicProjects.find((x) => x.code === code);
  if (!p) return null;
  return {
    id: p.code,
    tag: `${p.department} · ${p.category}`,
    kind: `${p.department} project`,
    headline: p.title,
    summary: trim(p.objective, 210),
    tech: p.tools.split(',').map((t) => t.trim()).filter(Boolean).slice(0, 4),
    status: 'Ready to build',
    seed,
    problem: firstSentence(p.objective),
    approach: [
      'Plan the block diagram, architecture, and tools',
      'Build and test the hardware or software end to end',
      'Prepare report, presentation, and viva walkthrough',
    ],
    results: ['Working demo you can explain', 'Source code with setup notes', 'Report, PPT, and diagrams ready to submit'],
  };
};

const workItems = [
  pick('TIMT26E01', 3),
  pick('TIMT26C01', 8),
  pick('TIMT26E03', 5),
  pick('TIMT26C03', 11),
  pick('TIMT26E04', 7),
  pick('TIMT26C06', 2),
].filter((x): x is WorkItem => x !== null);

export const lab: SideContent = {
  key: 'lab',
  name: 'Student Lab',
  path: '/lab',
  nav: [
    { label: 'Home', to: '/lab' },
    { label: 'About', to: '/lab/about' },
    { label: 'Services', to: '/lab/services' },
    { label: 'Projects', to: '/lab/projects' },
    { label: 'Work', to: '/lab/work' },
    { label: 'Reviews', to: '/lab/reviews' },
    { label: 'Contact', to: '/lab/contact' },
  ],
  heroEyebrow: 'Student Lab',
  heroHeadline: ['Final year projects,', 'built and explained.'],
  heroSub:
    'Embedded, IoT, AI/ML, Robotics, and Full Stack projects for Diploma, B.Tech, and M.Tech students, with abstract, source code, report, and viva guidance.',
  primary: { label: `Browse ${projectCounts.total} titles`, to: '/lab/projects' },
  secondary: { label: 'How we support you', to: '/lab/services' },

  problem: {
    label: 'The gap',
    title: 'Good ideas shouldn’t stay unfinished.',
    sub: 'Choosing a title is the easy part. Getting a project working, documented, and ready to present is where most students get stuck.',
    cards: [
      {
        title: 'Ideas stay stuck as slides',
        body: 'A title on paper isn’t a working project. We help you build the circuit, the code, and the demo.',
      },
      {
        title: 'Deadlines move faster than DIY',
        body: 'Review dates arrive early. We plan milestones against your college schedule so the report and demo are ready.',
      },
      {
        title: 'Support disappears after delivery',
        body: 'Viva questions come after submission. We stay with you through reviews, viva preparation, and publication.',
      },
    ],
  },

  services: {
    label: 'Services',
    title: 'Everything from title to viva.',
    sub: 'Four ways we support you. Start where you’re stuck.',
    pageTitle: 'Six ways we support your project.',
    pageSub: `${academicServices.length} deliverables, grouped by what you need at each stage of the final year.`,
    items: [
      {
        id: 'selection',
        icon: 'cap',
        title: 'Project Selection & Guidance',
        short: `Talk to us about your branch, interests, and deadline. We recommend the right title from ${projectCounts.total}+ options or scope a custom one.`,
        outcome: 'A title that fits your branch and deadline.',
        included: ['Branch and interest discussion', `Titles across ECE (${projectCounts.ECE}) and CSE (${projectCounts.CSE})`, 'Custom project scoping', 'Tool and component guidance', 'Timeline against your review dates'],
        bestFor: 'Diploma, B.Tech, and M.Tech students who haven’t finalised a topic.',
        outcomes: ['Clarity on what to build', 'A realistic plan', 'A title your guide will accept'],
        useCases: ['IoT and embedded titles for ECE', 'Deep learning titles for CSE', 'Full stack titles with a web interface', 'A custom idea you already have'],
        cta: 'Get project guidance',
      },
      {
        id: 'build',
        icon: 'code',
        title: 'Source Code & Working Demo',
        short: 'Complete, working, well-commented source code with setup instructions for Arduino, Raspberry Pi, or Python-based projects.',
        outcome: 'A project that runs when you demo it.',
        included: ['Project source code', 'Setup instructions', 'Project demo, live or recorded', 'Output screenshots', 'Step-by-step project explanation'],
        bestFor: 'Students who need a working build they can understand and show.',
        outcomes: ['A demo that works end to end', 'Code you can walk through', 'Screenshots for your report'],
        useCases: ['Arduino and ESP32 builds', 'Raspberry Pi vision projects', 'Python and Flask applications', 'Deep learning model with web app'],
        cta: 'Ask about source code',
      },
      {
        id: 'documents',
        icon: 'file',
        title: 'Reports, Abstract & Papers',
        short: 'Submission-ready abstract, IEEE base paper, project report, and diagrams, formatted to your college guidelines.',
        outcome: 'Documents that are ready to submit.',
        included: ['Project abstract', 'IEEE base paper and reference literature', 'Full project report', 'Block, circuit, flow, and architecture diagrams', 'Plagiarism check documentation'],
        bestFor: 'Students with a working project who need the paperwork done right.',
        outcomes: ['Report formatted to guidelines', 'Reference papers in hand', 'Originality documentation'],
        useCases: ['Report for internal submission', 'Diagrams for the design chapter', 'Abstract for a review', 'Plagiarism report for the university'],
        cta: 'Get my documents',
      },
      {
        id: 'viva',
        icon: 'mic',
        title: 'Presentation & Viva Preparation',
        short: 'A structured PowerPoint, one-on-one review assistance, and simple explanations so you can present with confidence.',
        outcome: 'You can explain your own project.',
        included: ['Project presentation (PPT)', 'Project review assistance for viva', 'Student-friendly project explanation', 'Practice on likely questions', 'Demo walkthrough'],
        bestFor: 'Students facing reviews or the final viva soon.',
        outcomes: ['Confident delivery', 'Answers to common questions', 'A clean presentation'],
        useCases: ['Review one presentation', 'Final viva rehearsal', 'Demo walkthrough practice', 'Explaining the algorithm simply'],
        cta: 'Prepare for viva',
      },
      {
        id: 'publish',
        icon: 'globe',
        title: 'Publication Support',
        short: 'Support to publish your project work in international journals or conferences for an added academic edge.',
        outcome: 'Your work, published.',
        included: ['Journal or conference selection', 'Paper structuring', 'Formatting support', 'Submission guidance'],
        bestFor: 'B.Tech and M.Tech students who want a publication on their record.',
        outcomes: ['A paper ready to submit', 'Guidance on venues', 'An academic edge'],
        useCases: ['International journal paper', 'Conference submission', 'Extending a project into a paper'],
        cta: 'Ask about publishing',
      },
      {
        id: 'letters',
        icon: 'award',
        title: 'Letters & Certificates',
        short: 'Project acceptance letter and project completion certificate for your internal submission requirements.',
        outcome: 'The paperwork your college asks for.',
        included: ['Project acceptance letter', 'Project completion certificate'],
        bestFor: 'Students whose college requires these documents with submission.',
        outcomes: ['Letters on time', 'Certificates for your file'],
        useCases: ['Acceptance letter at project start', 'Completion certificate at submission'],
        cta: 'Request documents',
      },
    ],
    matchTitle: 'Match your stage to the right support.',
    match: [
      { need: 'You need a title for your branch', start: 'Project Selection & Guidance' },
      { need: 'You have a title but no working build', start: 'Source Code & Working Demo' },
      { need: 'Your report is due', start: 'Reports, Abstract & Papers' },
      { need: 'Your viva is next week', start: 'Presentation & Viva Preparation' },
    ],
  },

  audience: {
    label: 'Who we serve',
    title: 'Built for your level and branch.',
    sub: 'Diploma, B.Tech, and M.Tech students across Electronics and Computer Science.',
    rows: [
      { title: 'Diploma Students', body: 'Hands-on builds with clear explanations, so the concepts make sense as well as the demo.', icon: 'cap' },
      { title: 'B.Tech Students', body: 'Final year projects with full documentation, review support, and viva preparation.', icon: 'book' },
      { title: 'M.Tech Students', body: 'Research-oriented projects with IEEE references and publication support.', icon: 'brain' },
      { title: 'ECE Branch', body: 'Embedded, IoT, VLSI, Robotics, Biomedical, and Renewable Energy titles.', icon: 'cpu' },
      { title: 'CSE Branch', body: 'Deep Learning, Machine Learning, Full Stack, Cloud, and Blockchain titles.', icon: 'code' },
    ],
  },

  progress: {
    label: 'Our progress',
    title: 'From title to viva, step by step.',
    sub: 'Five stages of a final year project, with the support we give at each one. Scroll to move through them.',
    steps: [
      { icon: 'search', title: 'Pick your title', body: 'We match your branch, interest, and deadline to the right project from our catalogue or scope a custom one.' },
      { icon: 'target', title: 'Plan and design', body: 'Block diagrams, circuit or flow diagrams, and architecture, so you know what you’re building.' },
      { icon: 'cpu', title: 'Build and test', body: 'Source code, hardware setup, and a working demo you can run and understand.' },
      { icon: 'file', title: 'Document', body: 'Abstract, IEEE base paper, report, screenshots, and plagiarism documentation.' },
      { icon: 'mic', title: 'Present and publish', body: 'Presentation, viva preparation, certificates, and optional journal or conference publication.' },
    ],
  },

  work: {
    label: 'Selected work',
    title: 'Projects ready to build with you.',
    sub: `A few of our ${projectCounts.total} titles. Each one comes with objectives, tools, and full academic support.`,
    pageTitle: 'Featured project titles.',
    pageSub: 'A selection from our catalogue across ECE and CSE. Open the full catalogue to search and filter every title.',
    items: workItems,
  },

  reviews: {
    label: 'What students say',
    title: 'Don’t take our word for it.',
    sub: 'Placeholder reviews, clearly marked. Real student reviews replace these as they arrive.',
    items: [
      { id: 1, quote: 'The explanation sessions helped me understand my own project before the viva.', name: 'B.Tech Student', role: 'ECE', initial: 'B', sample: true },
      { id: 2, quote: 'Report, PPT, and source code were all organised and ready well before the review date.', name: 'M.Tech Student', role: 'CSE', initial: 'M', sample: true },
      { id: 3, quote: 'They guided me to a title that matched my branch and my timeline.', name: 'Diploma Student', role: 'Electronics', initial: 'D', sample: true },
    ],
  },

  about: {
    heroTitle: 'The lab behind your project.',
    heroSub: `A dedicated academic division supporting Diploma, B.Tech, and M.Tech students with ${projectCounts.total}+ project titles across ECE and CSE.`,
    storyLabel: 'Our story',
    storyTitle: 'Projects students can actually explain.',
    story: [
      'Alongside client work, Student Lab supports students with Embedded Systems, IoT, AI/ML, Robotics, Deep Learning, and Full Stack Development projects.',
      'You receive abstracts, source code, reports, IEEE papers, and viva guidance from start to finish, so you can present the project as your own.',
      'Every project is built for your real curriculum, your real review dates, and your real deadlines.',
    ],
    quote: 'A project you can explain is worth more than a project you can only submit.',
    beliefsTitle: 'What we believe.',
    beliefs: [
      { title: 'Understand to present', body: 'Every build comes with a simple explanation so you can answer questions.' },
      { title: 'Real hardware, real code', body: 'Working builds with documented setup, not just slides.' },
      { title: 'Originality matters', body: 'Plagiarism documentation is part of what we provide.' },
      { title: 'Support through viva', body: 'We stay available after submission, until the viva is done.' },
    ],
    stats: [
      { value: `${projectCounts.total}`, label: 'Project titles' },
      { value: `${projectCounts.ECE}`, label: 'ECE titles' },
      { value: `${projectCounts.CSE}`, label: 'CSE titles' },
      { value: `${academicServices.length}`, label: 'Support deliverables' },
    ],
    ctaTitle: 'Ready to pick your final year project?',
    ctaSub: 'Tell us your branch, interests, and deadline. We’ll recommend the right project.',
  },

  faqs: [
    { q: 'Which levels do you support?', a: 'Diploma, B.Tech, and M.Tech students in both ECE and CSE.' },
    { q: 'What do I receive with a project?', a: 'Depending on what you need: abstract, IEEE base paper, source code, report, presentation, diagrams, screenshots, demo, and project explanation.' },
    { q: 'Can I get a custom title?', a: 'Yes. We scope custom final year projects based on your department and idea.' },
    { q: 'Do you help with the viva?', a: 'Yes. We provide review assistance and a simple explanation of how your project works so you can present with confidence.' },
    { q: 'Can my work be published?', a: 'We support publication in international journals and conferences.' },
    { q: 'Do you check for plagiarism?', a: 'Plagiarism check documentation is available for your report and abstract.' },
  ],

  contact: {
    label: 'Get in touch',
    title: 'Let’s plan your project.',
    sub: 'Share your branch, level, and deadline. We reply personally.',
    options: ['Project selection', 'Source code and demo', 'Report and abstract', 'Presentation and viva', 'Publication', 'Custom project', 'Other'],
    intro: 'Hi Tuning Ideas Student Lab, I need help with a final year project.',
  },

  footerLine: 'Final year projects, built, documented, and explained.',
  footerLinks: [
    {
      title: 'Student Lab',
      links: [
        { label: 'All project titles', to: '/lab/projects' },
        { label: 'Services', to: '/lab/services' },
        { label: 'Work', to: '/lab/work' },
        { label: 'Reviews', to: '/lab/reviews' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', to: '/lab/about' },
        { label: 'Contact', to: '/lab/contact' },
      ],
    },
  ],
};
