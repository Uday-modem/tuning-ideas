import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Smart University Management System',
    category: 'Education / Institutional Software',
    description:
      'A complete full stack university management platform covering student records, attendance, exams, fee tracking, faculty workload, and an admin dashboard — built and delivered end-to-end.',
    tags: ['React', 'Spring Boot', 'MySQL', 'Admin Dashboard', 'Full Stack'],
    bgLetter: 'S',
    bgColor: '#1C1C1A',
    status: 'Completed',
  },
  {
    id: 2,
    title: 'Boutique Business Website',
    category: 'Fashion / Local Business',
    description:
      'A premium website concept for boutiques to showcase collections and redirect customers to WhatsApp for orders.',
    tags: ['React', 'TypeScript', 'UI/UX', 'WhatsApp Integration'],
    bgLetter: 'B',
    bgColor: '#2A2218',
    status: 'Concept / Demo',
  },
  {
    id: 3,
    title: 'Academic Project Guidance Platform',
    category: 'Education / Student Services',
    description:
      'A web platform concept for students to explore final-year project ideas across Embedded, IoT, AI/ML, and Robotics, and request end-to-end project support.',
    tags: ['React', 'Dashboard', 'UI/UX', 'Student Services'],
    bgLetter: 'A',
    bgColor: '#201A14',
    status: 'Concept / Demo',
  },
  {
    id: 4,
    title: 'Business Landing Page',
    category: 'Brand Website',
    description:
      'A modern landing page structure for local businesses to present services, contact details, and lead forms.',
    tags: ['Landing Page', 'SEO', 'Responsive Design'],
    bgLetter: 'L',
    bgColor: '#1A1A18',
    status: 'Concept / Demo',
  },
  {
    id: 5,
    title: 'Ecommerce Product Showcase',
    category: 'Online Store',
    description:
      'A product-focused layout for businesses moving from WhatsApp selling to an organized online catalog experience.',
    tags: ['Ecommerce', 'Product Catalog', 'WhatsApp Orders'],
    bgLetter: 'E',
    bgColor: '#241E16',
    status: 'Concept / Demo',
  },
];
