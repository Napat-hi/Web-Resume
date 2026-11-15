// Grouped skills. Every skill must be backed by a job, project or course.
// `from` notes the evidence (not rendered; it keeps the list honest).
//
// Removed because nothing in the data backs them yet (TODO(Po): give a source to restore):
//   Django, Docker, TensorFlow, OpenAI API, NLTK, CNN, Bootstrap, VPN,
//   Hub & Switch, Network Topology, Firewall Configuration, LangChain, FAISS, Figma.

export const skillGroups = [
  {
    id: 'ai',
    title: 'AI / Machine Learning',
    skills: [
      { name: 'Python', from: 'HalluTrace, CP ALL' },
      { name: 'PyTorch', from: 'HalluTrace' },
      { name: 'Hugging Face', from: 'HalluTrace' },
      { name: 'vLLM', from: 'HalluTrace' },
      { name: 'LLM evaluation', from: 'HalluTrace' },
      { name: 'Gemini API / VLMs', from: 'CP ALL shelf audit' },
      { name: 'Prompt engineering', from: 'CP ALL shelf audit' },
      { name: 'Computer Vision', from: 'Security robot (YOLO11n)' },
      { name: 'YOLO', from: 'Security robot' },
      { name: 'OpenCV / MediaPipe', from: 'Security robot gesture control' },
      { name: 'ROS 2', from: 'Security robot' },
      { name: 'RapidMiner', from: 'Marathon GPS Clustering' },
      { name: 'pandas', from: 'HalluTrace' },
      { name: 'statsmodels', from: 'HalluTrace' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Infrastructure',
    skills: [
      { name: 'Node.js', from: 'Hospital Management System' },
      { name: 'MySQL / SQL', from: 'Hospital Management System' },
      { name: 'REST APIs', from: 'Hospital Management System' },
      { name: 'Microservices design', from: 'DreamSeat' },
      { name: 'SQLite', from: 'HalluTrace' },
      { name: 'Modal', from: 'HalluTrace' },
      { name: 'openpyxl', from: 'UAT generator' },
      { name: 'Linux', from: 'DirtyPipe reproduction, Raspberry Pi robot' },
      { name: 'Raspberry Pi', from: 'Security robot' },
      { name: 'SAP', from: 'Humanica 2024' },
      { name: 'Git / GitHub', from: 'Humanica 2024, all projects' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend & Design',
    skills: [
      { name: 'React', from: 'Humanica 2024, Hospital, Portfolio' },
      { name: 'JavaScript', from: 'Humanica 2024' },
      { name: 'HTML / CSS', from: 'Humanica 2024' },
      { name: 'Responsive design', from: 'Humanica 2024' },
      { name: 'Vite', from: 'Portfolio' },
      { name: 'Framer Motion', from: 'Portfolio' },
      { name: 'UX research', from: 'BAKA Thailand' },
      { name: 'UI design', from: 'BAKA Thailand' },
    ],
  },
  {
    id: 'network',
    title: 'Network Engineering',
    skills: [
      { name: 'TCP/IP', from: 'Computer Networks course' },
      { name: 'OSI model', from: 'Computer Networks course' },
      { name: 'Subnetting / CIDR', from: 'Computer Networks course' },
      { name: 'Routing', from: 'Computer Networks course' },
      { name: 'LAN / WAN', from: 'Computer Networks course' },
      { name: 'Network monitoring', from: 'Humanica 2025' },
    ],
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    skills: [
      { name: 'Risk assessment', from: 'Humanica 2025' },
      { name: 'Vulnerability scanning', from: 'Humanica 2025' },
      { name: 'Cloud security', from: 'Humanica 2025' },
      { name: 'Wazuh', from: 'Humanica 2025' },
      { name: 'Cloudflare', from: 'Humanica 2025' },
      { name: 'Incident documentation', from: 'Humanica 2025' },
      { name: 'Penetration testing', from: 'Exploit workbook' },
      { name: 'Nmap', from: 'Exploit workbook' },
      { name: 'Kali Linux', from: 'Exploit workbook' },
      { name: 'AFL++ fuzzing', from: 'Exploit workbook' },
      { name: 'Exploit analysis (CVE)', from: 'DirtyPipe reproduction' },
      { name: 'Attribute-based encryption (CP-ABE)', from: 'SDDaaS' },
    ],
  },
  {
    id: 'ba',
    title: 'Business Analysis & QA',
    skills: [
      { name: 'FDD / SIS documents', from: 'CP ALL' },
      { name: 'UAT', from: 'CP ALL' },
      { name: 'QA / QC', from: 'CP ALL' },
      { name: 'UML', from: 'DreamSeat SDS' },
      { name: 'Software design spec (SDS)', from: 'DreamSeat' },
    ],
  },
]
