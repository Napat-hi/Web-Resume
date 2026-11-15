# Web-Resume

Source for [napat-hi.github.io/Web-Resume](https://napat-hi.github.io/Web-Resume/), the portfolio of Napat Hirunsak.

## Stack

- React 19 + Vite 5
- React Router (`HashRouter`, so GitHub Pages serves every route from one `index.html`)
- Framer Motion for scroll reveals, layout animation and the case-study transition
- CSS Modules + design tokens in `src/styles/tokens.css`. The site uses no UI framework.
- lucide-react icons, self-hosted fonts via Fontsource (Space Grotesk, Inter, JetBrains Mono)
- Formspree for the contact form

## Run locally

```bash
npm ci
npm run dev       # http://localhost:5173/Web-Resume/
npm run build     # outputs dist/
npm run preview   # serves dist/ at http://localhost:4173/Web-Resume/
```

## Project layout

```
src/
  data/        all content: profile, experience, projects, skills, education
  sections/    home-page sections (Hero, About, Experience, Projects, Skills, Education, Contact)
  pages/       Home, ProjectCase (/projects/:slug), NotFound
  components/  layout (Nav, Footer), CommandPalette, DotGrid, ProjectCover, ui/
  context/     theme, toast and command-palette state
  hooks/ lib/  scroll-spy, focus trap, copy, count-up, SEO helpers
  styles/      tokens.css, global.css, print.css
public/        favicon, OG image, sitemap.xml, robots.txt
```

## Edit content

You edit text in `src/data/` only. Components render from those files, and the Stats block counts internships and projects from them.

Unknown facts carry a `TODO(Po)` marker. The dev server shows them as red dashed labels; production builds hide them.

### Add a project

1. Open `src/data/projects.js` and add an object to `projects`:

   ```js
   {
     slug: 'my-project',            // URL: #/projects/my-project
     title: 'My Project',
     tagline: 'One line on what it does.',
     categories: ['ai'],            // ai | data | fullstack | security | research | automation
     status: 'completed',           // published | completed | in-progress | design
     year: '2026',
     context: 'Computer Vision course',
     team: '3 people',
     role: 'What I owned',
     problem: 'The problem in one or two sentences.',
     approach: ['What I did, one item per step.'],
     stack: ['Python', 'PyTorch'],
     outcome: 'Result, if there is one. Use null otherwise.',
     links: [{ label: 'Code', url: 'https://github.com/...', kind: 'github' }],
   }
   ```

2. Leave `links` empty when no public link exists. The card then shows no buttons.
3. Set `confidential: true` for company work. The page then shows a "high-level only" note.
4. The card gets a generated cover from its first category, so no image is needed.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` with the official GitHub Pages actions.

One-time setup: **Settings → Pages → Source = GitHub Actions**.

`vite.config.js` sets `base: '/Web-Resume/'`. Change it only if the repo name changes.

## Extras

- **Ctrl/Cmd + K** opens the command palette: jump to a section, open a project, copy the email, switch theme, open the resume.
- Printing the home page (Ctrl/Cmd + P) gives a two-page resume.
- The theme follows the system setting until you pick one. The site remembers your choice.
