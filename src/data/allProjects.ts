import type { AcademicProject } from '../types';
import { eceProjects } from './eceProjects';
import { cseProjects } from './cseProjects';

export { eceProjects, cseProjects };

export const allAcademicProjects: AcademicProject[] = [...eceProjects, ...cseProjects];

export const projectCounts = {
  ECE: eceProjects.length,
  CSE: cseProjects.length,
  total: eceProjects.length + cseProjects.length,
};

// Category tabs per department. Includes a few evergreen categories (0 results today)
// so the filter row reads as complete even before more titles are added under them.
export const departmentCategories: Record<'ECE' | 'CSE', string[]> = {
  ECE: [
    'IoT',
    'AI',
    'Deep Learning',
    'Machine Learning',
    'Embedded',
    'Biomedical',
    'Robotics',
    'Electrical',
    'Renewable Energy',
    'Computer Vision',
    'VLSI',
    'MATLAB',
  ],
  CSE: [
    'Deep Learning',
    'Machine Learning',
    'Python Full Stack',
    'Java Full Stack',
    'MERN Stack',
    'Cloud Computing',
    'Blockchain',
  ],
};
