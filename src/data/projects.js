// Projects shown on the home page and as /projects/:slug case studies.
// Fields:
//   categories:   any of 'ai' | 'fullstack' | 'security' | 'research' | 'automation'
//   status:       'published' | 'completed' | 'in-progress'
//   links:        real URLs only. Empty array => no link buttons rendered.
//   confidential: company-internal work. Keep it high-level, no screenshots.
// Copy rules: stop-slop. Never invent metrics, links or roles; unknowns are TODO(Po).

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
    tagline: "Traces where an open LLM's hallucinations start, using the model's own pretraining corpus.",
    categories: ['ai', 'research'],
    status: 'published',
    year: '2026',
    context: 'Senior project · SIIT',
    team: '4 people',
    // Po: helped shape the research idea and wrote the most code on the team, across all parts.
    role: 'Lead developer. I helped shape the research idea and wrote most of the code, from generation to corpus counting.',
    problem:
      "Hallucination benchmarks score a model's answers and skip its training data, so they can't tell you whether an error came from the corpus or from the model.",
    approach: [
      'We ran eight HALoGEN tasks (3,200 prompts) on five ~7B open models with published corpora: OLMo 2, DCLM, OLMo 1.7, RedPajama-INCITE and Pythia.',
      'We took one greedy and five sampled answers per prompt, 96,000 generations in total, to separate corpus errors from sampling instability.',
      "We counted correct and wrong facts in each model's pretraining corpus with infini-gram and checked each task verifier against human labels.",
      'The paper studies wrong birth and death years in biographies, judged against Wikidata.',
    ],
    stack: ['Python', 'PyTorch', 'vLLM', 'Hugging Face', 'infini-gram', 'Modal', 'SQLite', 'pandas', 'statsmodels'],
    outcome: 'Paper accepted at AIESC 2027. We released the code under Apache-2.0 and the data under CC BY 4.0.',
    links: [
      { label: 'Code', url: 'https://github.com/Napat-hi/hallutrace', kind: 'github' },
      { label: 'Project page', url: 'https://erthcyp.github.io/HalluTrace/', kind: 'external' },
    ],
    featured: true,
  },
  {
    slug: 'shelf-audit',
    title: 'AI Shelf Auditing POC',
    tagline: 'Audits refrigerated and frozen shelves from store video with a vision-language model.',
    categories: ['ai'],
    status: 'completed',
    year: '2026',
    context: 'CP ALL internship',
    team: null,
    role: 'AI research intern',
    // TODO(Po): confirm what is OK to publish, and one line on how shelves get checked today.
    problem: 'TODO(Po): one line on the problem this POC addresses.',
    approach: [
      'I built a proof of concept that sends store video frames to Gemini Flash and asks it to audit each shelf.',
      'I wrote a frame-selection and deduplication pipeline so the model sees each shelf once.',
      'I estimated the API cost of running the audit at scale.',
    ],
    stack: ['Python', 'Gemini API', 'VLM', 'Prompt engineering'],
    // TODO(Po): an outcome you can share (e.g. presented to the team, accuracy, decision made).
    outcome: null,
    links: [],
    confidential: true,
    featured: true,
  },
  {
    slug: 'uat-generator',
    title: 'UAT Test-Case Generator',
    tagline: 'Generates UAT test cases for a store-transfer system and writes them to Excel.',
    categories: ['automation'],
    status: 'completed',
    year: '2026',
    context: 'CP ALL internship',
    team: null,
    role: 'Built the tool',
    // TODO(Po): confirm the team wrote these test cases by hand before.
    problem: 'TODO(Po): how the team produced UAT test cases before this tool.',
    approach: ['I wrote a Python tool that generates the UAT test cases and writes them into Excel with openpyxl.'],
    stack: ['Python', 'openpyxl', 'Excel'],
    // TODO(Po): outcome (time saved, number of cases, who used it) if shareable.
    outcome: null,
    links: [],
    confidential: true,
  },
  {
    slug: 'dreamseat',
    title: 'DreamSeat',
    tagline: 'A TCAS study-planning platform designed as microservices.',
    categories: ['fullstack'],
    status: 'completed',
    year: null, // TODO(Po): year
    context: 'University project',
    team: null, // TODO(Po): team size
    role: 'TODO(Po): exact role (worked on the SDS and presentation)',
    problem: 'Students preparing for TCAS university admission need one place to plan their study.',
    approach: [
      'I worked on the software design specification (SDS) for the microservices architecture.',
      'I prepared and gave the project presentation.',
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
    problem: 'Our database lab course asked us to manage patient records, appointments and staff operations in one app.',
    approach: [
      'We designed a normalized MySQL schema.',
      'We built the CRUD features with React and a Node.js API.',
      'We added role-based access control for each staff type.',
    ],
    stack: ['React', 'Node.js', 'MySQL', 'REST API', 'RBAC'],
    outcome: null,
    links: [],
  },
  {
    slug: 'bluerov2',
    title: 'Anatomy of a Real Robot',
    tagline: 'A component-by-component analysis of the BlueROV2 underwater robot.',
    categories: ['research'],
    status: 'completed',
    year: '2026',
    context: 'Robotics course',
    team: null,
    role: null,
    // TODO(Po): 2–3 lines on what you analysed and what you found.
    problem: 'TODO(Po): the question this analysis answers.',
    approach: ['I analysed the components of the BlueROV2.'],
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
    problem: "The financial solutions platform's interfaces needed responsive layouts and better usability.",
    approach: [
      'I built and improved frontend components with React, HTML, CSS and JavaScript.',
      'I worked with UX designers and backend developers on new features and frontend–backend integration.',
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
    problem: 'The company needed regular risk assessment and monitoring of internal systems and cloud servers.',
    approach: [
      'I ran risk assessments and vulnerability scans on internal systems.',
      'I used Wazuh and Cloudflare for monitoring and protection.',
      'I documented security incidents and wrote recommendations.',
    ],
    stack: ['Wazuh', 'Cloudflare', 'Risk Assessment', 'Documentation'],
    outcome: null,
    links: [],
    confidential: true,
  },
  {
    slug: 'portfolio',
    title: 'This Portfolio',
    tagline: 'A data-driven portfolio with a command palette, case studies and a print-ready resume.',
    categories: ['fullstack'],
    status: 'completed',
    year: '2026',
    context: 'Personal',
    team: null,
    role: 'Design and build',
    problem: 'Recruiters need to see my work in one place, and I need to update it in minutes.',
    approach: [
      'I keep all content in plain data files, and each section renders from them.',
      'I built it with React, Vite, Framer Motion and CSS Modules, with no UI framework.',
      'You can press Ctrl/Cmd+K for the command palette, open a case study per project, or print the page as a resume.',
    ],
    stack: ['React', 'Vite', 'Framer Motion', 'CSS Modules', 'GitHub Actions'],
    outcome: null,
    links: [
      { label: 'Code', url: 'https://github.com/Napat-hi/Web-Resume', kind: 'github' },
      { label: 'Live', url: 'https://napat-hi.github.io/Web-Resume/', kind: 'external' },
    ],
  },
  // TODO(Po): current-semester projects (Computer Vision, Big Data, Ethical Hacking,
  // Knowledge Representation, Robotics). Add one entry per project once details exist.
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
export const projectCount = projects.length
