// Stops on the pixel-art drive (route #/journey), in driving order.
// Every line comes from facts Po confirmed (see experience.js / education.js / projects.js).
// Copy rules: stop-slop. `year: null` renders a sign with no year (BAKA, by Po's choice).
// `scene` picks the pixel scenery that rolls past near the stop: city | campus | field | tokyo.
//
// Logos and photos render as normal, sharp images (Po's call 2026-11-19: only the scenery and the car
// are pixel art). Logo sources (downloaded 2026-11-19, WebP in src/assets/logos/):
//   bcc        Wikipedia "File:Bangkok Christian College logo.png" (non-free, identifies the school)
//   siit       siit.tu.ac.th/images/home/logo.png (official site)
//   humanica   humanica.com/wp-content/uploads/2025/12/site-logo-black.png (official site)
//   seven-eleven  Wikimedia Commons "File:7-Eleven logo 2021.svg" (public domain); stands in for CP ALL
//   baka       baka.co.th/wp-content/uploads/2020/04/baka-logo.png (official site)
//   thammasat  Wikimedia Commons "File:Emblem of Thammasat University.svg" (public domain)
//   Institute of Science Tokyo: logo NOT used on purpose. isct.ac.jp/en/001/about/brand/logo says
//     "Unauthorized use of the Science Tokyo logo is an infringement of trademark rights"; non-members
//     must go through the naming-rights process. The stop uses a drawn Japan-flag badge instead.
//     Revisit once Po is enrolled (Apr 2027) and can check the Science Tokyo design system rules.
// Photos: from Po's D:/Photos, no people (bcc-campus, siit-campus) (exported to WebP, EXIF/GPS stripped).
// TODO(Po): send the CP ALL logo file if you want it instead of the 7-Eleven mark.

import bcc from '../assets/logos/bcc.webp'
import siit from '../assets/logos/siit.webp'
import humanica from '../assets/logos/humanica.webp'
import sevenEleven from '../assets/logos/seven-eleven.webp'
import baka from '../assets/logos/baka.webp'
import thammasat from '../assets/logos/thammasat.webp'
import bccPhoto from '../assets/photos/bcc-campus.webp'
import siitPhoto from '../assets/photos/siit-campus.webp'

export const journeyIntro = 'Scroll to drive!'

export const journey = [
  {
    id: 'bcc',
    year: '2011–2022',
    title: 'Bangkok Christian College',
    line: 'High school, Business Track. GPA 3.79.',
    say: 'Twelve years at BCC.',
    logo: bcc,
    logoAlt: 'Bangkok Christian College emblem',
    photo: bccPhoto,
    photoAlt: 'Tall white pillars at Bangkok Christian College against a blue sky',
    scene: 'city',
  },
  {
    id: 'siit',
    year: '2023',
    title: 'SIIT, Thammasat University',
    line: 'Started Computer Engineering with an AI specialization.',
    say: 'Day one of Computer Engineering!',
    logo: siit,
    logoAlt: 'SIIT logo',
    photo: siitPhoto,
    photoAlt: 'Aerial view of the Thammasat Rangsit campus',
    scene: 'campus',
  },
  {
    id: 'humanica-2024',
    year: '2024',
    title: 'Humanica',
    line: 'SAP Development Intern on a financial solutions platform.',
    say: 'First internship: SAP frontend.',
    logo: humanica,
    logoAlt: 'Humanica logo',
    scene: 'city',
  },
  {
    id: 'humanica-2025',
    year: '2025',
    title: 'Humanica',
    line: 'IT Security Intern: risk assessment, vulnerability scans, Wazuh.',
    say: 'Back at Humanica, now on security.',
    logo: humanica,
    logoAlt: 'Humanica logo',
    scene: 'city',
  },
  {
    id: 'cpall',
    year: '2026',
    title: 'CP ALL (7-Eleven Thailand)',
    line: 'Business analysis and AI research in the Digital Solution department.',
    say: 'BA work by day, VLM research too.',
    logo: sevenEleven,
    logoAlt: '7-Eleven logo',
    scene: 'city',
  },
  {
    id: 'baka',
    year: null,
    title: 'BAKA Thailand',
    line: 'UX/UI research and design for an AgriTech product.',
    say: 'Designing for farmers at BAKA.',
    logo: baka,
    logoAlt: 'BAKA logo',
    scene: 'field',
  },
  {
    id: 'paper',
    year: '2027',
    title: 'HalluTrace at AIESC 2027',
    line: 'Our paper on where LLM hallucinations start got accepted.',
    say: 'Paper accepted!',
    badge: 'trophy',
    celebrate: true,
    scene: 'city',
  },
  {
    id: 'tokyo',
    year: 'Apr–Aug 2027',
    title: 'Institute of Science Tokyo',
    line: 'Exchange semester in Tokyo.',
    say: 'Next stop: Tokyo!',
    badge: 'japan',
    scene: 'tokyo',
  },
  {
    id: 'graduate',
    year: '2027',
    title: 'Graduation',
    line: 'B.Eng. Computer Engineering. Open to full-time / graduate roles.',
    say: 'Graduating in 2027. Say hi!',
    logo: thammasat,
    logoAlt: 'Thammasat University emblem',
    scene: 'campus',
    cta: true,
  },
]
