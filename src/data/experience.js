// Work experience, newest first. `start` (YYYY-MM) is used for sorting.
// type: 'internship' entries are counted by the Stats block.

export const experience = [
  {
    id: 'cpall-2026',
    type: 'internship',
    company: 'CP ALL Public Company Limited (7-Eleven Thailand)',
    role: 'Digital Solution Intern — Business Analysis & AI Research',
    start: '2026-06',
    period: 'Jun – Aug 2026',
    location: 'Bangkok',
    summary: 'Business analysis and AI research inside the Digital Solution department.',
    bullets: [
      'Business analysis across the delivery lifecycle: FDD, SIS, UAT and QA/QC.',
      'Automated UAT test-case generation for a store-transfer system with Python and openpyxl.',
      'AI research: proof of concept for VLM-based shelf auditing of refrigerated and frozen shelves.',
    ],
    tags: ['Business Analysis', 'UAT / QA', 'Python', 'openpyxl', 'Gemini API', 'VLM'],
    projects: ['shelf-audit', 'uat-generator'],
  },
  {
    id: 'humanica-2025',
    type: 'internship',
    company: 'Humanica Public Company Limited',
    role: 'IT Security Intern',
    start: '2025-06',
    period: 'Jun – Aug 2025',
    location: 'Bangkok',
    summary: 'Helped secure internal systems and cloud servers.',
    bullets: [
      'Assisted in securing internal systems and cloud servers through risk assessments.',
      'Performed vulnerability scanning and collaborated on security implementations.',
      'Worked with Wazuh and Cloudflare, and documented security incidents and recommendations.',
    ],
    tags: ['Risk Assessment', 'Vulnerability Scanning', 'Wazuh', 'Cloudflare', 'Cloud Security'],
    projects: ['security-analysis'],
  },
  {
    id: 'humanica-2024',
    type: 'internship',
    company: 'Humanica Public Company Limited',
    role: 'SAP Development Intern — Financial Solutions',
    start: '2024-06',
    period: 'Jun – Aug 2024',
    location: 'Bangkok',
    summary: 'Frontend work on a financial solutions platform.',
    bullets: [
      'Developed responsive web interfaces using React, HTML, CSS and JavaScript.',
      'Enhanced platform features with improved accessibility and usability across devices.',
      'Collaborated with UX designers and developers on new features and frontend–backend integration.',
    ],
    tags: ['React', 'JavaScript', 'HTML / CSS', 'SAP', 'Git'],
    projects: ['sap-frontend'],
  },
  {
    id: 'baka',
    type: 'internship',
    company: 'BAKA Thailand (AgriTech)',
    role: 'UX/UI Research & Design Intern',
    // TODO(Po): dates. Sorted last until known.
    start: '0000-00',
    period: 'TODO(Po): dates',
    location: 'Thailand',
    summary: 'UX/UI research and design for an AgriTech product.',
    // TODO(Po): 2–3 real bullets (what you researched, what you designed, outcome).
    bullets: [],
    tags: ['UX Research', 'UI Design'],
    projects: [],
  },
]

export const sortedExperience = [...experience].sort((a, b) => b.start.localeCompare(a.start))
export const internshipCount = experience.filter((e) => e.type === 'internship').length
