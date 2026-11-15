// Work experience. `start` (YYYY-MM) drives sorting, newest first.
// type: 'internship' entries are counted by the Stats block.
// Copy rules: stop-slop. Never invent facts; unknowns are TODO(Po).

export const experience = [
  {
    id: 'cpall-2026',
    type: 'internship',
    company: 'CP ALL Public Company Limited (7-Eleven Thailand)',
    role: 'Digital Solution Intern (Business Analysis & AI Research)',
    start: '2026-06',
    period: 'Jun – Aug 2026',
    location: 'Bangkok',
    summary: 'Business analysis and AI research in the Digital Solution department.',
    bullets: [
      'Did business analysis across the delivery lifecycle: FDD, SIS, UAT and QA/QC.',
      'Built a Python + openpyxl tool that generates UAT test cases for a store-transfer system.',
      'Built a proof of concept that audits refrigerated and frozen shelves from video with a VLM.',
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
      'Ran risk assessments on internal systems and cloud servers.',
      'Scanned for vulnerabilities and worked with the team on security implementations.',
      'Used Wazuh and Cloudflare for monitoring, and documented incidents with recommendations.',
    ],
    tags: ['Risk Assessment', 'Vulnerability Scanning', 'Wazuh', 'Cloudflare', 'Cloud Security'],
    projects: ['security-analysis'],
  },
  {
    id: 'humanica-2024',
    type: 'internship',
    company: 'Humanica Public Company Limited',
    role: 'SAP Development Intern (Financial Solutions)',
    start: '2024-06',
    period: 'Jun – Aug 2024',
    location: 'Bangkok',
    summary: 'Frontend work on a financial solutions platform.',
    bullets: [
      'Built responsive web interfaces with React, HTML, CSS and JavaScript.',
      'Improved accessibility and usability of platform features on desktop and mobile.',
      'Worked with UX designers and backend developers to ship new features.',
    ],
    tags: ['React', 'JavaScript', 'HTML / CSS', 'SAP', 'Git'],
    projects: ['sap-frontend'],
  },
  {
    id: 'baka',
    type: 'internship',
    company: 'BAKA Thailand (AgriTech)',
    role: 'UX/UI Research & Design Intern',
    // Po chose to show no dates or bullets for this role. `start` keeps it last in the list.
    start: '0000-00',
    period: null,
    location: 'Thailand',
    summary: 'UX/UI research and design for an AgriTech product.',
    bullets: [],
    tags: ['UX Research', 'UI Design'],
    projects: [],
  },
]

export const sortedExperience = [...experience].sort((a, b) => b.start.localeCompare(a.start))
export const internshipCount = experience.filter((e) => e.type === 'internship').length
