// Single source of truth for personal info. Edit here, not in components.
// Copy rules: stop-slop (no em dashes, no adverbs, active voice). Never invent facts.
// Unknowns are marked TODO(Po).

export const profile = {
  name: 'Napat Hirunsak',
  nickname: 'Po',
  headline: 'AI & Systems Engineer · Computer Engineering @ SIIT',
  // Rotating role text in the hero.
  roles: ['AI Engineer', 'Systems Developer', 'Security-minded'],
  status: 'Open to full-time / graduate roles from 2027',
  location: 'Bangkok, Thailand',
  email: 'napat.hi.work@gmail.com',
  // File lives at public/Napat_Hirunsak_Resume.pdf -> https://napat-hi.github.io/Web-Resume/Napat_Hirunsak_Resume.pdf
  resumeUrl: `${import.meta.env.BASE_URL}Napat_Hirunsak_Resume.pdf`,
  formspreeEndpoint: 'https://formspree.io/f/xeagakdk', // delivers to napat.hi.work@gmail.com
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
    "I'm Napat Hirunsak, Po for short. I study Computer Engineering with an AI specialization at SIIT, Thammasat University, and I graduate in 2027.",
    'I test language and vision models, then build the software a team needs to use them. In my senior project, my team and I trace LLM hallucinations back to the pretraining data that produced them.',
    "I've done four internships: business analysis and AI research at CP ALL (7-Eleven Thailand), IT security and SAP frontend work at Humanica, and UX/UI research at BAKA Thailand.",
  ],

  // Short focus cards in About.
  focus: [
    { icon: 'brain', title: 'AI / ML', text: 'LLM hallucination research, VLM video pipelines, prompt engineering' },
    { icon: 'shield', title: 'Security', text: 'Risk assessment, vulnerability scanning, Wazuh, Cloudflare' },
    { icon: 'layers', title: 'Systems & delivery', text: 'React, Node.js, MySQL, business analysis, UAT / QA' },
  ],
}
