import type { LucideIcon } from 'lucide-react';
import React from 'react';
import {
  Globe, Layers, ShoppingCart, Palette, Wrench, Server, Workflow, Headphones, GraduationCap,
  Code2, FileText, Mic, Award, Search, Rocket, Store, Building2, Briefcase, Sparkles, Lightbulb,
  Cpu, Brain, Target, Send, Users, BookOpen, ShieldCheck,
} from 'lucide-react';
import type { IconKey } from '../content';

const map: Record<IconKey, LucideIcon> = {
  globe: Globe, layers: Layers, cart: ShoppingCart, palette: Palette, wrench: Wrench, server: Server,
  workflow: Workflow, headphones: Headphones, cap: GraduationCap, code: Code2, file: FileText, mic: Mic,
  award: Award, search: Search, rocket: Rocket, store: Store, building: Building2, briefcase: Briefcase,
  sparkles: Sparkles, lightbulb: Lightbulb, cpu: Cpu, brain: Brain, target: Target, send: Send,
  users: Users, book: BookOpen, shield: ShieldCheck,
};

interface Props {
  name: IconKey;
  size?: number;
  large?: boolean;
}

/** Chrome-style icon tile — stands in for Niva's 3D chrome icons. */
const Icon: React.FC<Props> = ({ name, size = 26, large = false }) => {
  const Cmp = map[name];
  return (
    <span className={`chrome-tile${large ? ' lg' : ''}`} aria-hidden="true">
      <Cmp size={large ? size + 8 : size} strokeWidth={1.5} />
    </span>
  );
};

export default Icon;
