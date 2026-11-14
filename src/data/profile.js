// Single source of truth for personal info. Edit here, not in components.
// Never invent facts. Unknowns are marked TODO(Po).

export const profile = {
  name: 'Napat Hirunsak',
  nickname: 'Po',
  headline: 'AI & Systems Engineer — Computer Engineering @ SIIT',
  // Rotating role text in the hero.
  roles: ['AI Engineer', 'Systems Developer', 'Security-minded'],
  // TODO(Po): confirm wording of the status chip.
  status: 'Open to full-time / graduate roles from 2027',
  location: 'Bangkok, Thailand',
  email: 'napat6603@gmail.com',
  // TODO(Po): this is a Google Drive folder. A direct PDF link would let "Download resume" actually download.
  resumeUrl: 'https://drive.google.com/drive/u/1/folders/16gKTZ-5SgtQgIdOoqYQV0mwsbtStA-6E',
  formspreeEndpoint: 'https://formspree.io/f/xykvgbdd',
  siteUrl: 'https://napat-hi.github.io/Web-Resume/',

  links: [
    { id: 'github', label: 'GitHub', handle: 'Napat-hi', url: 'https://github.com/Napat-hi' },
    { id: 'linkedin', label: 'LinkedIn', handle: 'napat-hirunsak', url: 'https://www.linkedin.com/in/napat-hirunsak-340b9838a/' },
    { id: 'instagram', label: 'Instagram', handle: 'po_napat', url: 'https://www.instagram.com/po_napat/' },
  ],

  languages: [
    { name: 'Thai', level: 'Native' },
    { name: 'English', level: 'Fluent', note: 'IELTS 6.5 · TU-GET 650' },
    { name: 'Chinese', level: 'Beginner', note: 'HSK 3' },
  ],

  // About section paragraphs.
  summary: [
    "I'm Napat “Po” Hirunsak, a 4th-year Computer Engineering student (AI specialization) at SIIT, Thammasat University, graduating in 2027.",
    'I work where AI meets real systems: evaluating and applying language and vision models, then building the software and processes that make them usable in production.',
    'Across four internships I have done business analysis and AI research at CP ALL (7-Eleven Thailand), IT security and SAP frontend development at Humanica, and UX/UI research at BAKA Thailand.',
    'My approach is the same whether the problem is a hallucinating LLM or a manual QA process: understand the system first, measure it, then fix it properly.',
  ],

  // Short "what I focus on" cards in About.
  focus: [
    { icon: 'brain', title: 'AI / ML', text: 'LLM hallucination research, VLM-based vision pipelines, prompt engineering' },
    { icon: 'shield', title: 'Security', text: 'Risk assessment, vulnerability scanning, Wazuh, Cloudflare' },
    { icon: 'layers', title: 'Systems & Delivery', text: 'React, Node.js, MySQL, business analysis, UAT / QA' },
  ],
}
