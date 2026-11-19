// status: 'In progress' | 'Completed'. Add `date` once a certificate is issued.
export const certifications = [
  { id: 'aws-academy-de', name: 'AWS Academy Data Engineering', issuer: 'AWS Academy', status: 'In progress' },
]

export const education = [
  {
    id: 'science-tokyo',
    degree: 'Exchange semester',
    school: 'Institute of Science Tokyo',
    period: 'Apr – Aug 2027',
    status: 'Accepted',
    gpa: null,
    coursework: [],
    currentCourses: [],
  },
  {
    id: 'siit',
    degree: 'B.Eng. Computer Engineering, AI specialization',
    school: 'Sirindhorn International Institute of Technology (SIIT), Thammasat University',
    period: '2023 – 2027',
    status: 'Year 4 · graduating 2027',
    gpa: '3.2 / 4.0',
    coursework: [
      'Machine Learning',
      'Natural Language Processing',
      'Computer Networks',
      'Cybersecurity & Information Security',
      'Database Systems',
      'Software Engineering',
      'Data Structures & Algorithms',
      'Operating Systems',
      'Digital Circuits & Electronics',
      'Microcontroller Programming',
      'Linear Algebra',
    ],
    currentCourses: ['Computer Vision', 'Big Data', 'Ethical Hacking', 'Knowledge Representation', 'Robotics'],
  },
  {
    id: 'bcc',
    degree: 'High School, Business Track',
    school: 'Bangkok Christian College (BCC)',
    period: '2011 – 2022',
    status: null,
    gpa: '3.79 / 4.0',
    coursework: [],
    currentCourses: [],
  },
]
