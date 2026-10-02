import type { SideContent, WorkItem } from './types';
import { allAcademicProjects, projectCounts } from '../data/allProjects';
import { academicServices } from '../data/academicServices';

const firstSentence = (text: string): string => {
  const cut = text.indexOf('. ');
  return cut > 0 ? text.slice(0, cut + 1) : text;
};

const trim = (text: string, max: number): string =>
  text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, '')}…` : text;

const pick = (code: string, seed: number, image?: string): WorkItem | null => {
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
    image,
    problem: firstSentence(p.objective),
    approach: [
      'Plan the block diagram, architecture, and tools with your mentor',
      'Build and test the prototype together, hands-on',
      'Write your own documentation and practise the viva walkthrough',
    ],
    results: ['A working prototype you built and can explain', 'Reference implementation with setup notes', 'Architecture, diagrams, and documentation templates'],
  };
};

const workItems = [
  pick('TIMT26E01', 3, 'SLS1'),
  pick('TIMT26C01', 8, 'SLS2'),
  pick('TIMT26E03', 5, 'SLS3'),
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
  welcome: 'Hands-on mentorship and working prototypes for your final year project, from first idea to viva.',
  heroHeadline: ['Final year projects,', 'built with a mentor.'],
  heroSub:
    'We help students conceptualize, build, test and understand their final-year projects through hands-on technical mentorship and working prototypes.',
  primary: { label: `Browse ${projectCounts.total} titles`, to: '/lab/projects' },
  secondary: { label: 'How we mentor you', to: '/lab/services' },

  problem: {
    label: 'The gap',
    title: 'Good ideas shouldn’t stay unfinished.',
    sub: 'Choosing a title is the easy part. Building a working prototype and understanding it well enough to explain it is where most students get stuck.',
    cards: [
      {
        title: 'Ideas stay stuck as slides',
        body: 'A title on paper isn’t a working project. We mentor you through the circuit, the code, and the prototype, so you build it and understand it.',
      },
      {
        title: 'Deadlines move faster than DIY',
        body: 'Review dates arrive early. We plan milestones against your college schedule so your prototype and documentation stay on track.',
      },
      {
        title: 'Support disappears after delivery',
        body: 'Viva questions come after the build. We stay with you through reviews, viva preparation, and publication guidance.',
      },
    ],
  },

  integrity: {
    title: 'Mentorship, not ghost-writing.',
    body: 'Student Lab is end-to-end project development and mentorship. You take part in building, testing, and understanding your project, and you write your own report and presentation. We follow academic-integrity principles in line with UGC regulations on academic integrity and plagiarism.',
    points: [
      'You participate in building and testing',
      'You write your own report and presentation',
      'We guide referencing and citation',
      'You can explain every part in your viva',
    ],
  },

  services: {
    label: 'Services',
    title: 'Mentorship from idea to viva.',
    sub: 'Four ways we support you. Start where you’re stuck.',
    pageTitle: 'Six ways we mentor your project.',
    pageSub: `${academicServices.length} areas of support, grouped by what you need at each stage of the final year. You take part in every step.`,
    items: [
      {
        id: 'selection',
        icon: 'cap',
        title: 'Project Selection & Mentorship',
        short: `Talk to us about your branch, interests, and deadline. We help you choose the right title from ${projectCounts.total}+ options or shape a custom one, then mentor you through it.`,
        outcome: 'A title that fits your branch and a plan you understand.',
        included: ['Branch and interest discussion', `Titles across ECE (${projectCounts.ECE}) and CSE (${projectCounts.CSE})`, 'Custom project scoping', 'Tool and component guidance', 'Milestone plan against your review dates'],
        bestFor: 'Diploma, B.Tech, and M.Tech students who haven’t finalised a topic.',
        outcomes: ['Clarity on what to build', 'A realistic plan you helped shape', 'A title your guide will accept'],
        useCases: ['IoT and embedded titles for ECE', 'Deep learning titles for CSE', 'Full stack titles with a web interface', 'A custom idea you already have'],
        cta: 'Get project mentorship',
      },
      {
        id: 'build',
        icon: 'code',
        title: 'Prototyping & Reference Implementations',
        short: 'Hands-on help building a working prototype, with reference implementations, circuit diagrams, and architecture that you study, adapt, and extend yourself.',
        outcome: 'A working prototype you built and understand.',
        included: ['Reference implementations and setup notes', 'Circuit diagrams and system architecture', 'Hands-on prototyping sessions', 'Testing assistance and debugging help', 'Step-by-step technical explanations'],
        bestFor: 'Students who want to build a working prototype and understand every part of it.',
        outcomes: ['A prototype you can run and explain', 'Code and circuits you can walk through', 'Test results you captured yourself'],
        useCases: ['Arduino and ESP32 builds', 'Raspberry Pi vision prototypes', 'Python and Flask applications', 'Deep learning model with a web interface'],
        cta: 'Start prototyping',
      },
      {
        id: 'documents',
        icon: 'file',
        title: 'Documentation Guidance & Templates',
        short: 'Templates and structure for your abstract, report, and diagrams, plus guidance on reading and citing reference papers. You write it in your own words.',
        outcome: 'A clear structure to write your own documents.',
        included: ['Report and abstract templates', 'Guidance on formatting to your college guidelines', 'Reference-paper reading help (IEEE and others)', 'Citation and referencing guidance', 'Feedback on your diagrams and drafts'],
        bestFor: 'Students with a working prototype who want to document it well, in their own words.',
        outcomes: ['A report structure ready to fill', 'Know how to find and cite references', 'Feedback on your draft'],
        useCases: ['Structure for the design chapter', 'Feedback on your diagrams', 'How to cite an IEEE paper', 'Abstract outline for a review'],
        cta: 'Get documentation guidance',
      },
      {
        id: 'viva',
        icon: 'mic',
        title: 'Presentation Guidance & Viva Preparation',
        short: 'Help structuring your own presentation, practising your demo, and explaining your project clearly and confidently.',
        outcome: 'You can explain your own project.',
        included: ['Presentation structure guidance', 'Mock viva questions', 'Demo walkthrough practice', 'Student-friendly technical explanations', 'Review preparation'],
        bestFor: 'Students facing reviews or the final viva soon.',
        outcomes: ['Confident delivery', 'Answers to common questions', 'A clear presentation of your own work'],
        useCases: ['Review one presentation structure', 'Final viva rehearsal', 'Demo walkthrough practice', 'Explaining the algorithm simply'],
        cta: 'Prepare for viva',
      },
      {
        id: 'publish',
        icon: 'globe',
        title: 'Research & Publication Guidance',
        short: 'Guidance on choosing journals or conferences and structuring a paper from your own project work.',
        outcome: 'Your own work, ready to share.',
        included: ['Journal or conference selection', 'Paper structuring guidance', 'Formatting guidance', 'Submission process guidance'],
        bestFor: 'B.Tech and M.Tech students who want to share their own research.',
        outcomes: ['A clearer path to submission', 'Guidance on venues', 'An academic edge'],
        useCases: ['International journal paper', 'Conference submission', 'Extending a project into a paper'],
        cta: 'Ask about publishing',
      },
      {
        id: 'integrity',
        icon: 'shield',
        title: 'Academic Integrity Guidance',
        short: 'We show you how to reference, cite, and write in your own words, in line with UGC academic-integrity regulations and your institution’s policy.',
        outcome: 'Work that is honestly your own.',
        included: ['Referencing and citation basics', 'Writing in your own words', 'Understanding your institution’s integrity policy', 'Acknowledging reference material properly', 'Originality best practices'],
        bestFor: 'Every student, ideally at the start of the project.',
        outcomes: ['Confidence about what is acceptable', 'Proper acknowledgement of sources', 'A project you can stand behind'],
        useCases: ['How to cite a base paper', 'What counts as your own work', 'Acknowledging reference code', 'Preparing for originality checks run by your institution'],
        cta: 'Ask about integrity',
      },
    ],
    matchTitle: 'Match your stage to the right support.',
    match: [
      { need: 'You need a title for your branch', start: 'Project Selection & Mentorship' },
      { need: 'You have a title but no working build', start: 'Prototyping & Reference Implementations' },
      { need: 'You’re writing your report', start: 'Documentation Guidance & Templates' },
      { need: 'Your viva is next week', start: 'Presentation Guidance & Viva Preparation' },
    ],
  },

  audience: {
    label: 'Who we serve',
    title: 'Built for your level and branch.',
    sub: 'Diploma, B.Tech, and M.Tech students across Electronics and Computer Science.',
    rows: [
      { title: 'Diploma Students', body: 'Hands-on builds with clear explanations, so the concepts make sense as well as the prototype.', icon: 'cap' },
      { title: 'B.Tech Students', body: 'Final year projects with hands-on mentorship, documentation guidance, and viva preparation.', icon: 'book' },
      { title: 'M.Tech Students', body: 'Research-oriented projects with reference-paper guidance and publication guidance.', icon: 'brain' },
      { title: 'ECE Branch', body: 'Embedded, IoT, VLSI, Robotics, Biomedical, and Renewable Energy titles.', icon: 'cpu' },
      { title: 'CSE Branch', body: 'Deep Learning, Machine Learning, Full Stack, Cloud, and Blockchain titles.', icon: 'code' },
    ],
  },

  progress: {
    label: 'Our progress',
    title: 'From title to viva, step by step.',
    sub: 'Five stages of a final year project, with the mentorship we give at each one. Scroll to move through them.',
    steps: [
      { icon: 'search', title: 'Pick your title', body: 'We help you match your branch, interest, and deadline to the right project from our catalogue, or shape a custom one.' },
      { icon: 'target', title: 'Plan and design', body: 'Block diagrams, circuit diagrams, and architecture, so you know what you’re building and why.' },
      { icon: 'cpu', title: 'Build and test', body: 'Reference implementations, hardware setup, and testing support, so you build a working prototype and understand it.' },
      { icon: 'file', title: 'Document', body: 'Templates and guidance to write your own abstract and report, with reference papers cited properly.' },
      { icon: 'mic', title: 'Present and publish', body: 'Presentation guidance, viva preparation, and optional publication guidance.' },
    ],
  },

  work: {
    label: 'Selected work',
    title: 'Projects to build with a mentor.',
    sub: `A few of our ${projectCounts.total} titles. Each one comes with objectives, tools, and hands-on mentorship.`,
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
      { id: 2, quote: 'The mentoring kept me on schedule, and I could explain every part of my prototype in the review.', name: 'M.Tech Student', role: 'CSE', initial: 'M', sample: true },
      { id: 3, quote: 'They guided me to a title that matched my branch and my timeline.', name: 'Diploma Student', role: 'Electronics', initial: 'D', sample: true },
    ],
  },

  about: {
    heroTitle: 'The lab where projects are built together.',
    heroSub: `A dedicated mentorship division supporting Diploma, B.Tech, and M.Tech students with ${projectCounts.total}+ project titles across ECE and CSE.`,
    storyLabel: 'Our story',
    storyTitle: 'Projects students build and understand.',
    story: [
      'Alongside client work, Student Lab helps students conceptualize, build, test, and understand final-year projects in Embedded Systems, IoT, AI/ML, Robotics, Deep Learning, and Full Stack Development.',
      'Through hands-on technical mentorship and working prototypes, we provide reference implementations, circuit diagrams, architecture, documentation templates, testing assistance, and technical explanations. You take part in the work and understand it.',
      'Our approach follows academic-integrity principles, in line with UGC regulations on academic integrity and plagiarism. Every project is shaped around your curriculum, your review dates, and your deadlines.',
    ],
    quote: 'A project you built and understand is worth more than one you only submitted.',
    beliefsTitle: 'What we believe.',
    beliefs: [
      { title: 'You do the work', body: 'We mentor. You build, test, and explain every part of your project.' },
      { title: 'Real hardware, real learning', body: 'Working prototypes with documented setup, so you learn by doing.' },
      { title: 'Integrity first', body: 'We guide referencing and originality. Your report is written in your own words.' },
      { title: 'Support through viva', body: 'We stay available after the build, until the viva is done.' },
    ],
    stats: [
      { value: `${projectCounts.total}`, label: 'Project titles' },
      { value: `${projectCounts.ECE}`, label: 'ECE titles' },
      { value: `${projectCounts.CSE}`, label: 'CSE titles' },
      { value: `${academicServices.length}`, label: 'Mentorship areas' },
    ],
    ctaTitle: 'Ready to start your final year project?',
    ctaSub: 'Tell us your branch, interests, and deadline. We’ll recommend the right project and mentor you through it.',
  },

  faqs: [
    { q: 'Which levels do you support?', a: 'Diploma, B.Tech, and M.Tech students in both ECE and CSE.' },
    { q: 'What do I get with a project?', a: 'Hands-on mentorship and working prototypes: reference implementations, circuit diagrams, architecture, documentation templates, testing assistance, technical explanations, presentation guidance, and viva preparation.' },
    { q: 'Will you write my project for me?', a: 'No. Student Lab is mentorship, not ghost-writing. You take part in building, testing, and understanding your project, and you write your own report and presentation. This keeps your work in line with academic-integrity expectations.' },
    { q: 'Can I get a custom title?', a: 'Yes. We help you shape a custom final year project based on your department and idea.' },
    { q: 'Do you help with the viva?', a: 'Yes. Mock questions, demo practice, and plain-language explanations of how each part works, so you can present with confidence.' },
    { q: 'Can my work be published?', a: 'We offer guidance on choosing journals or conferences and structuring a paper. You are the author of your own work.' },
    { q: 'How do you handle plagiarism?', a: 'We guide you on referencing, citation, and writing in your own words. Originality checks are run by your institution. Our job is to help you build and write work that is honestly yours.' },
  ],

  contact: {
    label: 'Get in touch',
    title: 'Let’s plan your project.',
    sub: 'Share your branch, level, and deadline. We reply personally.',
    options: ['Project mentorship', 'Prototyping help', 'Documentation guidance', 'Presentation and viva', 'Publication guidance', 'Custom project', 'Other'],
    intro: 'Hi Tuning Ideas Student Lab, I’d like mentorship for a final year project.',
  },

  footerLine: 'End-to-end project development and mentorship for students.',
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
