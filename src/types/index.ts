export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  bgLetter: string;
  bgColor: string;
  status?: 'Completed' | 'Concept / Demo';
}

export interface Testimonial {
  id: number;
  quote: string;
  reviewer: string;
  role: string;
  initial: string;
  note: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface AcademicProject {
  sno: number;
  code: string;
  title: string;
  objective: string;
  tools: string;
  domain: string;
  category: string;
}

export interface AcademicSupportService {
  id: number;
  icon: string;
  title: string;
  description: string;
}
