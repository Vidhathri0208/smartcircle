/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageRoute =
  | 'home'
  | 'about'
  | 'contact'
  | 'services/movie-production-marketing'
  | 'services/brand-marketing'
  | 'services/celebrity-pr'
  | 'services/creative-production'
  | 'services/youtube-management';

export interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  canvasType: 'clapperboard' | 'brand-nexus' | 'celebrity-star' | 'creative-sculpt' | 'youtube-play';
  primaryColor: string; // Tailwind glow / accent class (e.g. 'from-amber-400 to-yellow-600')
  features: {
    title: string;
    description: string;
  }[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  deliverables: string[];
  stats: {
    label: string;
    value: string;
  }[];
  projects?: {
    released: string[];
    ongoing: string[];
    upcoming: string[];
  };
  marketingServices?: string[];
  platforms?: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'movies' | 'brands' | 'celebrity' | 'creative' | 'youtube';
  imageUrl: string;
  client: string;
  year: string;
  description: string;
  stats: string;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
}
