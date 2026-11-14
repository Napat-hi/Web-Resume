// Projects shown on the home page and as /projects/:slug case studies.
// Fields:
//   categories: any of 'ai' | 'fullstack' | 'security' | 'research' | 'automation'
//   status:     'published' | 'completed' | 'in-progress'
//   links:      only real URLs. Empty array => no link buttons rendered.
//   confidential: company-internal work; keep high-level, no screenshots.
// Never invent metrics, links or roles. Unknowns are TODO(Po).

export const categories = [
  { id: 'ai', label: 'AI / ML' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'security', label: 'Security' },
  { id: 'research', label: 'Research' },
  { id: 'automation', label: 'Automation' },
]

export const statusLabel = {
  published: 'Paper',
  completed: 'Completed',
  'in-progress': 'In progress',
}

export const projects = [
  {
    slug: 'hallutrace',
    title: 'HalluTrace',
    tagline: 'Locating where an open LLM’s hallucinations start, from its own pretraining corpus.',
    categories: ['ai', 'research'],
    status: 'published',
    year: '2026',
    context: 'Senior project · SIIT',
    team: '4 people',
    // TODO(Po): your exact role (attribution / citation verifier / code verifier / infra?).
    role: 'TODO(Po): my role',
    problem:
      'Hallucination benchmarks judge model outputs but almost never look at the training data, so they cannot say whether an error comes from the corpus or from the model.',
    approach: [
      'Ran eight HALoGEN tasks (3,200 prompts) on five ~7B open models with published corpora: OLMo 2, DCLM, OLMo 1.7, RedPajama-INCITE and Pythia.',
      'One greedy and five sampled answers per prompt (96,000 generations) to separate training-data errors from inference-time instability.',
      'Counted correct and wrong facts in each model’s pretraining corpus with infini-gram, and checked every task verifier against human labels.',
      'Case study in the paper: wrong birth and death years in biographies, judged against Wikidata.',
    ],
    stack: ['Python', 'PyTorch', 'vLLM', 'Hugging Face', 'infini-gram', 'Modal', 'SQLite', 'pandas', 'statsmodels'],
    // TODO(Po): confirm status — the repo tag says "aiesc2027-submission". Accepted, or submitted?
    // Also confirm venue spelling: repo says AIESC, chat said AISEC.
    outcome: 'Paper: AIESC 2027. Code and data released under Apache-2.0 / CC BY 4.0.',
    links: [
      { label: 'Code', url: 'https://github.com/Napat-hi/hallutrace', kind: 'github' },
      { label: 'Project page', url: 'https://erthcyp.github.io/HalluTrace/', kind: 'external' },
    ],
    featured: true,
  },
  {
    slug: 'shelf-audit',
    title: 'AI Shelf Auditing POC',
    tagline: 'Auditing refrigerated and frozen shelves from video with a vision-language model.',
    categories: ['ai'],
    status: 'completed',
    year: '2026',
    context: 'CP ALL internship',
    team: null,
    role: 'AI research intern',
    // TODO(Po): confirm what is OK to publish. Kept high-level on purpose.
    problem: 'Checking shelf condition in refrigerated and frozen sections is manual and slow.',
    approach: [
      'Proof of concept using a VLM (Gemini Flash) to audit shelves from store video.',
      'Frame-selection and deduplication pipeline so the model sees each shelf once.',
      'API cost analysis to estimate what running it at scale would cost.',
    ],
    stack: ['Python', 'Gemini API', 'VLM', 'Prompt engineering'],
    // TODO(Po): an outcome you are allowed to share (e.g. "presented to team", accuracy, decision made).
    outcome: null,
    links: [],
    confidential: true,
    featured: true,
  },
  {
    slug: 'uat-generator',
    title: 'UAT Test-Case Generator',
    tagline: 'Generates UAT test cases straight into Excel.',
    categories: ['automation'],
    status: 'completed',
    year: '2026',
    context: 'CP ALL internship',
    team: null,
    role: 'Built the tool',
    problem: 'UAT test cases for a store-transfer system were written by hand in Excel.',
    approach: [
      'Python tool that generates the UAT test cases and writes them into Excel with openpyxl.',
    ],
    stack: ['Python', 'openpyxl', 'Excel'],
    // TODO(Po): outcome (time saved, number of cases, who used it) if shareable.
    outcome: null,
    links: [],
    confidential: true,
  },
  {
    slug: 'dreamseat',
    title: 'DreamSeat',
    tagline: 'TCAS study-planning platform built on a microservices architecture.',
    categories: ['fullstack'],
    status: 'completed',
    year: null, // TODO(Po): year
    context: 'University project',
    team: null, // TODO(Po): team size
    role: 'TODO(Po): exact role (worked on the SDS and presentation)',
    problem: 'Thai students planning for TCAS university admission need one place to plan their study.',
    approach: [
      'Contributed to the software design specification (SDS) for a microservices architecture.',
      'Prepared and delivered the project presentation.',
    ],
    stack: ['Microservices', 'UML', 'SDS'],
    outcome: null,
    links: [],
  },
  {
    slug: 'hospital-management',
    title: 'Hospital Management System',
    tagline: 'Patient records, appointments and staff operations with role-based access.',
    categories: ['fullstack'],
    status: 'completed',
    year: null, // TODO(Po): year
    context: 'Database lab course · team project',
    team: 'Team project',
    role: 'Developer',
    problem: 'A database course project: manage patient records, appointments and staff operations.',
    approach: [
      'Designed a normalized MySQL schema.',
      'Built CRUD features with React and a Node.js API.',
      'Role-based access control for different staff types.',
    ],
    stack: ['React', 'Node.js', 'MySQL', 'REST API', 'RBAC'],
    outcome: null,
    links: [],
  },
  {
    slug: 'bluerov2',
    title: 'Anatomy of a Real Robot',
    tagline: 'Component-level analysis of the BlueROV2 underwater robot.',
    categories: ['research'],
    status: 'completed',
    year: '2026',
    context: 'Robotics course',
    team: null,
    role: null,
    // TODO(Po): 2–3 lines on what you analysed and what you found.
    problem: 'Understand how a real commercial robot is put together.',
    approach: ['Analysed the components of the BlueROV2.'],
    stack: ['Robotics', 'BlueROV2'],
    outcome: null,
    links: [],
  },
  {
    slug: 'sap-frontend',
    title: 'SAP Frontend Development',
    tagline: 'Responsive interfaces for a financial solutions platform.',
    categories: ['fullstack'],
    status: 'completed',
    year: '2024',
    context: 'Humanica internship',
    team: null,
    role: 'Frontend intern',
    problem: 'A financial solutions platform needed improved, responsive interfaces.',
    approach: [
      'Built and improved frontend components with React, HTML, CSS and JavaScript.',
      'Worked with UX designers and developers on new features and frontend–backend integration.',
    ],
    stack: ['React', 'JavaScript', 'HTML / CSS', 'SAP', 'Git'],
    outcome: null,
    links: [],
    confidential: true,
  },
  {
    slug: 'security-analysis',
    title: 'Security Analysis & Documentation',
    tagline: 'Risk assessment, vulnerability scanning and incident documentation.',
    categories: ['security'],
    status: 'completed',
    year: '2025',
    context: 'Humanica internship',
    team: null,
    role: 'IT security intern',
    problem: 'Internal systems and cloud servers needed regular risk assessment and monitoring.',
    approach: [
      'Risk assessments and vulnerability scanning of internal systems.',
      'Worked with Wazuh and Cloudflare for monitoring and protection.',
      'Documented security incidents and wrote recommendations.',
    ],
    stack: ['Wazuh', 'Cloudflare', 'Risk Assessment', 'Documentation'],
    outcome: null,
    links: [],
    confidential: true,
  },
  {
    slug: 'portfolio',
    title: 'This Portfolio',
    tagline: 'Data-driven portfolio with a command palette, case studies and a print-ready resume.',
    categories: ['fullstack'],
    status: 'completed',
    year: '2026',
    context: 'Personal',
    team: null,
    role: 'Design and build',
    problem: 'One place for recruiters to see my work, kept easy to update.',
    approach: [
      'All content lives in plain data files; sections render from them.',
      'React + Vite, Framer Motion, CSS Modules; no UI framework.',
      'Command palette (Ctrl/Cmd+K), case-study routes, print stylesheet, dark/light theme.',
    ],
    stack: ['React', 'Vite', 'Framer Motion', 'CSS Modules', 'GitHub Actions'],
    outcome: null,
    links: [
      { label: 'Code', url: 'https://github.com/Napat-hi/Web-Resume', kind: 'github' },
      { label: 'Live', url: 'https://napat-hi.github.io/Web-Resume/', kind: 'external' },
    ],
  },
  // TODO(Po): current-semester projects — Computer Vision, Big Data, Ethical Hacking,
  // Knowledge Representation, Robotics. Add one entry per project once details exist.
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
export const projectCount = projects.length
