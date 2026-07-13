/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceDetail, PortfolioItem, TeamMember } from './types';

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  'movie-production-marketing': {
    id: 'movie-production-marketing',
    title: 'Movie Production & Marketing',
    tagline: 'Cinematic Excellence from Treatment to Theatre',
    description: 'We orchestrate complete filmmaking lifecycles, translating bold scripts into cinematic milestones. From state-of-the-art VFX to hyper-targeted theatrical and streaming campaigns, we spark conversations that translate directly to box office records.',
    canvasType: 'clapperboard',
    primaryColor: '#e0a96d', // Elegant Gold
    features: [
      { title: 'Meme Marketing', description: 'Instagram meme pages, posts, stories' },
      { title: 'Regional Memes', description: 'Regional memes, stories & content creators' },
      { title: 'Song Promotions', description: 'Via music influencers & bulk reels' },
      { title: 'Music & Fan Pages', description: 'Music pages & fan pages' },
      { title: 'Paparazzi Coverage', description: 'Paparazzi coverage' },
      { title: 'X (Twitter)', description: 'Tweets, spaces & trending' },
      { title: 'YouTube Marketing', description: 'Channel postings, reviews & skip ads' },
      { title: 'Media Articles', description: 'Media articles & online publications' },
      { title: 'Social Media', description: 'Social media profile management' },
      { title: 'IMDb Listing', description: 'IMDb listing & maintenance' },
      { title: 'Wikipedia', description: 'Wikipedia listing' },
      { title: 'BookMyShow', description: 'BookMyShow listing & services' },
      { title: 'Instant Reels', description: 'Instant reels' },
      { title: 'District by Zomato', description: 'District by Zomato listing' },
      { title: 'Listing Websites', description: '10+ listing websites' },
      { title: 'OTT Marketing', description: 'OTT marketing' }
    ],
    projects: {
      released: [
        'Shambhala',
        'Nari Nari Naduma Murari',
        'Seetha Payanam',
        'Om Shanti Shantihi',
        'Jockey',
        'Nilakanta',
        'Purushaha',
        'Vanda Devullu'
      ],
      ongoing: [
        'Aakarshita',
        'Ameer Log',
        'Anakapalli',
        'Anumana Pakshi',
        '#BMB',
        'Hit & Run',
        'Jangaa',
        'Kanna',
        'Kotha Cinema',
        'Love Oh Love',
        'Mr Middle Class',
        'Raktha Charitra',
        'The Red Bag'
      ],
      upcoming: [
        'SK 33',
        'Shining Pictures 2',
        'Speed — David Reddy',
        'Repert',
        'Veera Kasulavada',
        'Air Force',
        'Pakashala Pantham'
      ]
    },
    platforms: [
      'BookMyShow',
      'IMDb',
      'Wikipedia',
      'YouTube',
      'Instagram',
      'X (Twitter)',
      'District by Zomato',
      'OTT platforms'
    ],
    process: [
      { step: '01', title: 'Conceptual Treatment', description: 'Aligning screenplay themes with dynamic audience profiles.' },
      { step: '02', title: 'Teaser & Digital Assets', description: 'Generating pulse-quickening trailers and high-fidelity social content.' },
      { step: '03', title: 'Immersive Media Tours', description: 'Connecting cast members directly with major press, podcasts, and digital channels.' },
      { step: '04', title: 'Premiere Stabilization', description: 'Securing global ratings, public endorsements, and localized theatre activation.' }
    ],
    deliverables: [
      'Cinematic Trailers & Promos',
      'Pre & Post-Production Supervision',
      'VFX & Title Sequences',
      'Theatrical Release Strategy Plans',
      'Digital Press Kits (DPK)'
    ],
    stats: [
      { label: 'Cumulative Box Office', value: '$85M+' },
      { label: 'Film Campaigns Hosted', value: '15+' },
      { label: 'Global Fandom Impressions', value: '450M+' }
    ]
  },
  'brand-marketing': {
    id: 'brand-marketing',
    title: 'Brand Marketing & Digital Presence',
    tagline: 'Transforming Organizations into Legacy Icons',
    description: 'We align corporate vision with dynamic digital performance. Our tailor-made systems generate qualified leads, construct vibrant brand identities, and establish permanent shelf-space in consumer minds.',
    canvasType: 'brand-nexus',
    primaryColor: '#3a86ff', // Electric Neon Blue
    features: [
      {
        title: 'Brand Strategy & Planning',
        description: 'A successful brand starts with a clear strategy. We work closely with businesses to define their brand identity, positioning, values, and long-term objectives. Our strategic planning process includes market research, competitor analysis, audience profiling, and growth planning to create a roadmap that supports sustainable business development and strengthens brand recognition.'
      },
      {
        title: 'Content Creation',
        description: 'We create engaging, audience-focused content including social media posts, website copy, blogs, and marketing materials that strengthen your brand, boost engagement, and drive conversions.'
      },
      {
        title: 'Creative Design & Communication',
        description: 'We create impactful designs and marketing creatives that strengthen your brand identity, communicate your message effectively, and engage the right audience.'
      },
      {
        title: 'Social Media Profile Management',
        description: 'We manage your social media with strategic content, audience engagement, and performance tracking to boost brand awareness, follower growth, and customer interaction.'
      },
      {
        title: 'Influencer Collaborations',
        description: 'We connect your brand with the right influencers to create authentic campaigns that expand reach, build credibility, and drive meaningful audience engagement.'
      },
      {
        title: 'Google Ads Management',
        description: 'We create and optimize Google Ads campaigns to increase website traffic, generate qualified leads, and maximize your return on investment.'
      },
      {
        title: 'Website Development',
        description: 'We create responsive, high-performing websites that elevate your brand and drive business growth.'
      },
      {
        title: 'Website Maintenance & Updates',
        description: 'We provide regular updates, security monitoring, backups, bug fixes, and performance optimization to keep your website secure, up to date, and running smoothly.'
      },
      {
        title: 'Performance Monitoring & Reporting',
        description: 'We provide data-driven analytics and performance reports that measure results, uncover insights, and support smarter business decisions for continuous growth.'
      },
      {
        title: 'Multi-Platform Presence Management',
        description: 'A strong digital identity extends across multiple platforms. We ensure consistency and professionalism across social media networks, professional directories, personal websites, industry platforms, and public profiles. Our team manages updates, branding alignment, and profile optimization to create a unified and impactful online presence.'
      },
      {
        title: 'Regional Community & Group Outreach',
        description: 'We help individuals connect with regional communities, industry groups, professional networks, and local audiences through targeted outreach strategies. By engaging with relevant communities and groups, we increase visibility, build relationships, and create opportunities for meaningful audience interaction and recognition.'
      },
      {
        title: 'Digital Reputation Building',
        description: 'Your online reputation plays a crucial role in personal and professional success. We implement strategic reputation-building initiatives that enhance positive visibility, strengthen credibility, promote achievements, and establish trust among audiences, clients, industry peers, and stakeholders across digital platforms.'
      },
      {
        title: 'Audience Engagement Activities',
        description: 'Meaningful audience engagement is essential for building a loyal community. We plan and execute interactive activities such as Q&A sessions, contests, polls, live interactions, community campaigns, and audience-driven initiatives that encourage participation, strengthen relationships, and increase follower engagement.'
      },
      {
        title: 'Profile Growth & Visibility Enhancement',
        description: 'We implement strategic growth initiatives to increase profile visibility, audience reach, and online recognition. Through profile optimization, content enhancement, platform management, audience targeting, and visibility campaigns, we help individuals expand their digital footprint and achieve sustainable personal brand growth.'
      }
    ],
    process: [
      { step: '01', title: 'Brand Audit', description: 'Diagnosing market gaps, competitive vulnerabilities, and target audience profiles.' },
      { step: '02', title: 'Strategy & Funnel Build', description: 'Defining brand positioning and constructing high-converting user journeys.' },
      { step: '03', title: 'Creative & Campaign Deployment', description: 'Launching visual banners, engaging content, and targeted ad campaigns.' },
      { step: '04', title: 'Analytics & Optimization', description: 'Monitoring performance, conducting A/B tests, and scaling ROI efficiently.' }
    ],
    deliverables: [
      'Digital Identity Style Guides',
      'High-Converting Ad Creatives',
      'End-to-End Sales Funnel Systems',
      'Monthly Attribution Dashboards'
    ],
    stats: [
      { label: 'Brand Campaigns Launched', value: '45+' },
      { label: 'Average Client ROI', value: '310%' },
      { label: 'Qualified Leads Generated', value: '150K+' }
    ]
  },
  'celebrity-pr': {
    id: 'celebrity-pr',
    title: 'Celebrity PR & Representation',
    tagline: 'Guarding and Crafting Elite Public Profiles',
    description: 'Empowering prominent filmmakers, actors, and visionary creators. We curate public perception, negotiate verified channel security, initiate major press coverage, and contain media crises with split-second precision.',
    canvasType: 'celebrity-star',
    primaryColor: '#ffffff', // High Contrast Silver/White
    features: [
      { title: 'Celebrity Profile Building', description: 'Positioning celebrities through strategic branding, professional biographies, portfolio development, IMDb and Wikipedia profile management, and official website creation.' },
      { title: 'Media Relations', description: 'Establishing strong relationships with entertainment journalists and digital media to secure quality coverage, exclusive interviews, and feature articles.' },
      { title: 'Digital PR', description: 'Strengthening online presence through entertainment portal coverage, Google News publications, SEO optimization, and knowledge panel enhancement.' },
      { title: 'Social Media PR', description: 'Developing platform-specific strategies for Instagram, X, Facebook, and YouTube to keep celebrities relevant and engaged with their audience.' },
      { title: 'Brand Endorsements & Collaborations', description: 'Connecting celebrities with brands that align with their image and negotiating partnerships to enhance commercial value.' },
      { title: 'Event & Appearance Management', description: 'Managing publicity and media coordination for movie promotions, audio launches, red-carpet events, and corporate appearances.' },
      { title: 'Film Promotion PR', description: 'Creating customized publicity campaigns for every stage of a film\'s journey, from first-look announcements to post-release publicity.' },
      { title: 'Television, OTT & Digital Appearances', description: 'Securing opportunities for television shows, podcasts, OTT promotional content, and digital talk shows.' },
      { title: 'Reputation Management', description: 'Protecting and strengthening public image through online reputation management, media handling, and strategic responses.' },
      { title: 'Fan Community Management', description: 'Building and nurturing loyal fan communities through fan club engagement, hashtag campaigns, and interactive initiatives.' },
      { title: 'Content Creation & Distribution', description: 'Creating and distributing high-quality promotional content, including behind-the-scenes videos, interview clips, and event photography.' },
      { title: 'Awards & Recognition PR', description: 'Maximizing publicity around award nominations, wins, magazine features, and industry recognitions.' },
      { title: 'International PR', description: 'Expanding global reach through international media outreach, film festival publicity, and overseas interviews.' },
      { title: 'Crisis Communication', description: 'Strategic crisis management addressing rumors, misinformation, and safeguarding reputation during challenging situations.' },
      { title: 'Monitoring & Performance Reporting', description: 'Providing detailed media coverage reports, social media insights, sentiment analysis, and campaign performance evaluations.' },
      { title: 'Exclusive Celebrity Support Services', description: 'Premium services including airport look coverage, paparazzi coordination, CSR publicity, talent management, and personal website management.' }
    ],
    process: [
      { step: '01', title: 'Perception Audit', description: 'Measuring baseline social sentiment and current public visibility indices.' },
      { step: '02', title: 'Profile & Media Building', description: 'Securing strategic placements, verified channels, and industry-leading profiles.' },
      { step: '03', title: 'Placement & Partnerships', description: 'Connecting talent with premium brand endorsements and high-visibility appearances.' },
      { step: '04', title: 'Reputation & Crisis Management', description: 'Providing 24/7 proactive monitoring, statement formulation, and sentiment defense.' }
    ],
    deliverables: [
      'Verified Social Profiles',
      'Press Release & Media Kits',
      'Endorsement Negotiation Portfolios',
      'Crisis Communication Playbooks',
      'Quarterly Sentiment Dashboards'
    ],
    stats: [
      { label: 'Talent Profiles Managed', value: '30+' },
      { label: 'Media Placements Secured', value: '500+' },
      { label: 'Brand Partnerships Closed', value: '85+' }
    ]
  },
  'creative-production': {
    id: 'creative-production',
    title: 'Creative Production',
    tagline: 'Pure Visual Artistry for High-Impact Mediums',
    description: 'Where imagination is fully materialized. We produce cinematic video edits, fluid 2D/3D motion graphics, responsive logo sets, and modular video systems that disrupt doom-scrolling and hold viewer attention hostage.',
    canvasType: 'creative-sculpt',
    primaryColor: '#ec4899', // Brilliant Fuchsia
    features: [
      { title: 'Editing', description: 'Cutting and arranging footage into the final story.' },
      { title: 'Dialogue Editing', description: 'Cleaning and enhancing recorded dialogue for clarity and consistency.' },
      { title: 'Sound Editing', description: 'Cleaning up dialogue, adding sound effects, and mixing audio.' },
      { title: 'Foley', description: 'Recording and adding custom sounds like footsteps, cloth movement, and object interactions.' },
      { title: 'Sound Design', description: 'Creating immersive soundscapes, ambient sounds, and special audio effects.' },
      { title: 'ADR / Dubbing', description: 'Re-recording dialogue to improve quality or support multiple language releases.' },
      { title: 'Music', description: 'Adding songs, background score (BGM), and soundtrack to enhance emotions and storytelling.' },
      { title: 'Song Mixing & Mastering', description: 'Finalizing songs for theatrical, streaming, and music platform releases.' },
      { title: 'Color Correction & Grading', description: 'Adjusting colors, lighting, and visual tone to create the desired cinematic look.' },
      { title: 'Digital Intermediate (DI)', description: 'Performing advanced color grading, conforming, and preparing the final visual master.' },
      { title: 'Visual Effects (VFX)', description: 'Adding computer-generated effects, CGI, compositing, and removing unwanted objects.' },
      { title: 'Motion Graphics', description: 'Creating animated titles, lower thirds, logos, and graphic sequences.' },
      { title: 'Titles & Graphics', description: 'Designing opening titles, subtitles, end credits, and on-screen text.' },
      { title: 'Subtitle & Caption Creation', description: 'Preparing subtitles and closed captions for theatrical, OTT, and international releases.' },
      { title: 'Localization', description: 'Adapting the film with multilingual subtitles, dubbing, and region-specific deliverables.' },
      { title: 'Quality Control (QC)', description: 'Reviewing picture, audio, subtitles, and technical specifications to ensure release readiness.' },
      { title: 'Mastering', description: 'Creating high-quality masters for theatrical, OTT, television, and archival purposes.' },
      { title: 'DCP Creation', description: 'Preparing Digital Cinema Packages (DCP) for theatrical distribution.' },
      { title: 'Promotional Content', description: 'Producing teasers, trailers, lyrical videos, video songs, character promos, motion posters, TV spots, making videos, and social media edits.' },
      { title: 'Final Export', description: 'Rendering the finished project in the required formats for cinema, television, OTT platforms, streaming services, and social media.' },
      { title: 'Archiving & Backup', description: 'Securing all project files, masters, and assets for future use, re-releases, and preservation.' }
    ],
    process: [
      { step: '01', title: 'Concept & Storyboard', description: 'Aligning visual direction and narrative flow before production begins.' },
      { step: '02', title: 'Production & Editing', description: 'Cutting and arranging footage with precise pacing and storytelling.' },
      { step: '03', title: 'Sound, VFX & Color', description: 'Integrating custom soundscapes, visual effects, and cinematic color grading.' },
      { step: '04', title: 'Final Export & Delivery', description: 'Mastering and rendering assets in optimized formats for every screen.' }
    ],
    deliverables: [
      'Cinematic Motion Graphics',
      'Professional DI & Color Grades',
      'Final Theatrical & Digital Masters',
      'Dynamic Promo & Lyrical Cuts',
      'Immersive 5.1 Surround Mixes'
    ],
    stats: [
      { label: 'Projects Delivered', value: '120+' },
      { label: 'Hours of Mastered Footage', value: '500+' },
      { label: 'Visual Effect Shots', value: '2,500+' }
    ]
  },
  'youtube-management': {
    id: 'youtube-management',
    title: 'YouTube Management & Strategy',
    tagline: 'Mastering the Algorithm to Command Millions of Views',
    description: 'We turn occasional uploaders into media networks. By merging psychological thumbnail crafting with strict SEO, structural content blueprints, and algorithmic pacing, we secure multi-million view streaks.',
    canvasType: 'youtube-play',
    primaryColor: '#ef4444', // Crimson Accent
    features: [
      {
        title: 'Algorithmic Optimization',
        description: 'Formulating high-relevance video titles, chapters, search-optimized descriptions, and interactive card layouts.'
      },
      {
        title: 'Thumbnail Studio',
        description: 'Engineering visual hooks, highly focus-tested expressions, and layout spacing for maximum CTR.'
      },
      {
        title: 'Audience Pacing Architecture',
        description: 'Structuring script intros, audio beats, and key visual shifts to elevate average watch duration.'
      }
    ],
    process: [
      { step: '01', title: 'Channel Audit', description: 'Deep-dive analysis of audience demographics, watch time, and content performance.' },
      { step: '02', title: 'Content & SEO Planning', description: 'Developing data-driven content calendars and optimizing metadata for search velocity.' },
      { step: '03', title: 'Production & Thumbnail Testing', description: 'Crafting high-retention videos and A/B testing CTR-focused thumbnail variants.' },
      { step: '04', title: 'Growth & Monetization', description: 'Scaling viewership and unlocking advanced revenue streams through sponsorships and memberships.' }
    ],
    deliverables: [
      'High-CTR Thumbnail Designs',
      'Channel SEO Playbooks',
      'Audience Engagement Audits',
      'Custom Banner & End Screen Templates'
    ],
    stats: [
      { label: 'Channels Scaled', value: '25+' },
      { label: 'Subscriber Growth', value: '1.2M+' },
      { label: 'Monthly Active Views', value: '45M+' }
    ]
  }
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'portfolio-1',
    title: 'The Outlaw - Movie Release Marketing',
    category: 'movies',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop',
    client: 'Apex Pictures',
    year: '2025',
    description: 'A comprehensive pre-production and hype-stabilization campaign generating massive box-office momentum.',
    stats: 'Box Office Hit: $42M on Opening Weekend'
  },
  {
    id: 'portfolio-2',
    title: 'Vanguard Luxury Brand Identity',
    category: 'brands',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
    client: 'Vanguard Group',
    year: '2025',
    description: 'Rebranding an elite luxury design studio globally, deploying elegant funnel strategies.',
    stats: 'Lead Conversion Lift: +290%'
  },
  {
    id: 'portfolio-3',
    title: 'Arya Dev - Celebrity PR Plan',
    category: 'celebrity',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    client: 'Arya Dev Studios',
    year: '2026',
    description: 'Securing social validation and managing prime press coverage following a major cinematic comeback launch.',
    stats: 'Earned Sentiment Score: 98.4% Positive'
  },
  {
    id: 'portfolio-4',
    title: 'Apex Esports Global Title Graphics',
    category: 'creative',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    client: 'Apex Arena Ltd',
    year: '2025',
    description: 'High-energy 3D logo identities, and full motion title overlays broadcast to millions worldwide.',
    stats: 'Stream Views Reached: 22M+'
  },
  {
    id: 'portfolio-5',
    title: 'TechNexus Studio Channel Scaling',
    category: 'youtube',
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop',
    client: 'TechNexus Media',
    year: '2026',
    description: 'Audience flow restructure, retention-oriented thumbnail systems, and premium title strategies.',
    stats: 'Subscribers Grew from 400K to 3.5M'
  },
  {
    id: 'portfolio-6',
    title: 'Neon Odyssey - Indie Short Film VFX',
    category: 'movies',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop',
    client: 'Odyssey Creative Circle',
    year: '2025',
    description: 'Stunning dystopian VFX sequences, custom titles, sound editing, and digital distribution planning.',
    stats: 'Best VFX nomination at CineFest 2025'
  },
  {
    id: 'portfolio-7',
    title: 'Veridia Organic Campaign Engine',
    category: 'brands',
    imageUrl: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=800&auto=format&fit=crop',
    client: 'Veridia Care',
    year: '2026',
    description: 'Integrated branding, ad arrays on social platforms, and influencer activation.',
    stats: 'Brand Value Raised by $14M'
  },
  {
    id: 'portfolio-8',
    title: 'Eminent Speaker Series Coverage',
    category: 'celebrity',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop',
    client: 'Global Summit India',
    year: '2025',
    description: 'Crisis protection protocols and verified live correspondence with top international press.',
    stats: 'Press Coverage in 40+ Top Tech Outlets'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Vikram Aditya',
    role: 'Founder & Chief Creative Officer',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop',
    bio: 'An award-winning cinematic director and visual strategist with 15+ years orchestrating digital movements and box office champions.'
  },
  {
    name: 'Ananya Rao',
    role: 'Partner & Brand Architect',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop',
    bio: 'Lead strategist executing cross-border brand funnel systems. Behind some of South Asia’s most valuable corporate identities.'
  },
  {
    name: 'Kabir Mehta',
    role: 'Director of Celebrity PR & Representation',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500&auto=format&fit=crop',
    bio: 'Crisis shield architect and verified media liaison. Kabir operates behind the scenes, protecting star narratives 24 hours a day.'
  },
  {
    name: 'Divya Reddy',
    role: 'Head of YouTube Strategy & Audience Growth',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop',
    bio: 'A psychological click-hook specialist who eats, sleeps, and breathes the YouTube algorithm. Responsible for over 1.8 billion total plays.'
  }
];
