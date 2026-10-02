import type { Side, SideContent } from './types';
import { digital } from './digital';
import { lab } from './lab';

export * from './types';
export { digital, lab };

export const sides: Record<Side, SideContent> = { digital, lab };

export const team = [
  { initials: 'MK', name: 'Modem Uday Kiran Kumar' },
  { initials: 'SS', name: 'Sure Silpa' },
];

/** Exact text required by the brief for the "Our stack, connected" section. */
export const stackSection = {
  label: 'Our stack, connected',
  title: 'Works with the tools you already use.',
  sub: 'Modern web frameworks for businesses, and hardware plus AI toolchains for engineering projects — all under one roof.',
  rows: [
    ['React', 'TypeScript', 'Node.js', 'Spring Boot', 'MySQL', 'MERN Stack', 'Flask', 'Tailwind'],
    ['Arduino', 'ESP32', 'Raspberry Pi', 'Python', 'TensorFlow', 'YOLO', 'OpenCV', 'LoRa'],
  ],
};
