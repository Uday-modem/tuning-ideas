import type { AcademicSupportService } from '../types';

/**
 * Student Lab = hands-on mentorship and prototyping. The student takes part in the work,
 * writes their own documents, and can explain every part. (Academic-integrity positioning, UGC.)
 */
export const academicServices: AcademicSupportService[] = [
  { id: 1, icon: '🧭', title: 'Project Selection & Roadmap', description: 'Choose a title that fits your branch and deadline, and shape a milestone plan you understand and agree with.' },
  { id: 2, icon: '🧩', title: 'Architecture & Circuit Diagrams', description: 'Block diagrams, circuit diagrams, flowcharts, and system architecture to study, review, and adapt for your project.' },
  { id: 3, icon: '💻', title: 'Reference Implementations', description: 'Working reference code with setup notes, so you can study how it works, adapt it, and extend it yourself.' },
  { id: 4, icon: '🛠️', title: 'Hands-on Prototyping', description: 'Build the hardware or software prototype together in guided sessions, so you learn every part by doing it.' },
  { id: 5, icon: '🧪', title: 'Testing Assistance', description: 'Test plans, debugging help, and guidance on capturing and interpreting your own results.' },
  { id: 6, icon: '🗣️', title: 'Technical Explanations', description: 'Simple, student-friendly explanations of how each component, algorithm, and block works.' },
  { id: 7, icon: '📄', title: 'Documentation Templates', description: 'Structure and templates for your abstract and report, formatted to common college guidelines. You write the content.' },
  { id: 8, icon: '📚', title: 'Reference Reading Guidance', description: 'Pointers to relevant IEEE and other reference papers, and how to read and cite them properly.' },
  { id: 9, icon: '📊', title: 'Presentation Guidance', description: 'Help structuring your own presentation for reviews, seminars, and the final viva.' },
  { id: 10, icon: '🎤', title: 'Viva Preparation', description: 'Mock questions, demo practice, and one-on-one review preparation so you can present with confidence.' },
  { id: 11, icon: '🛡️', title: 'Academic Integrity Guidance', description: 'Referencing, citation, and writing in your own words, in line with UGC academic-integrity regulations and your institution’s policy.' },
  { id: 12, icon: '🌍', title: 'Publication Guidance', description: 'Guidance on choosing journals or conferences and structuring a paper from your own project work.' },
];
