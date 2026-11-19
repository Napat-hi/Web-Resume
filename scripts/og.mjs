// Link-preview images (1200x630 PNG) for each page, drawn at build time with satori (layout
// to SVG) and resvg (SVG to PNG). Fonts come from the static @fontsource packages (WOFF; satori
// cannot read WOFF2). Light theme colors from src/styles/tokens.css, fixed so every preview
// looks the same wherever it is shared.
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const require = createRequire(import.meta.url)
const font = (pkg, file) => readFileSync(require.resolve(`${pkg}/files/${file}`))

const fonts = [
  { name: 'Space Grotesk', data: font('@fontsource/space-grotesk', 'space-grotesk-latin-600-normal.woff'), weight: 600 },
  { name: 'Inter', data: font('@fontsource/inter', 'inter-latin-400-normal.woff'), weight: 400 },
  { name: 'Inter', data: font('@fontsource/inter', 'inter-latin-600-normal.woff'), weight: 600 },
  { name: 'JetBrains Mono', data: font('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff'), weight: 500 },
]

const C = {
  bg: '#f6f9fe',
  surface: '#ffffff',
  border: '#dce6f2',
  text: '#0b1b30',
  muted: '#44546b',
  subtle: '#56667d',
  accentText: '#0369a1',
  accentFill: '#7dd3fc',
  accentSoft: '#e0f2fe',
}

// Tiny hyperscript so the layout reads like markup without a JSX build step.
const h = (type, style, ...children) => ({ type, props: { style: { display: 'flex', ...style }, children: children.flat().filter(Boolean) } })

function layout({ eyebrow, title, description, chips = [] }) {
  const titleSize = title.length > 34 ? 60 : title.length > 22 ? 70 : 84
  return h(
    'div',
    { width: 1200, height: 630, boxSizing: 'border-box', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 80px', background: C.bg, fontFamily: 'Inter', color: C.text, position: 'relative' },
    // Sky glow in the corner, like the hero aurora.
    h('div', { position: 'absolute', top: -260, right: -200, width: 700, height: 700, borderRadius: 700, background: 'radial-gradient(circle, rgba(56,189,248,0.28), rgba(56,189,248,0) 70%)' }),
    h(
      'div',
      { alignItems: 'center', gap: 18 },
      h('div', { width: 56, height: 56, borderRadius: 56, alignItems: 'center', justifyContent: 'center', background: C.accentSoft, border: `2px solid ${C.accentFill}`, color: C.accentText, fontFamily: 'JetBrains Mono', fontSize: 22 }, 'NH'),
      h('div', { fontSize: 26, fontWeight: 600 }, 'Napat Hirunsak'),
      h('div', { fontSize: 26, color: C.subtle }, '· AI & Systems Engineer'),
    ),
    h(
      'div',
      { flexDirection: 'column', gap: 22, maxWidth: 1000 },
      eyebrow && h('div', { fontFamily: 'JetBrains Mono', fontSize: 24, color: C.accentText, letterSpacing: 1 }, eyebrow.toUpperCase()),
      h('div', { fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: titleSize, lineHeight: 1.05, letterSpacing: -1.5 }, title),
      description && h('div', { fontSize: 32, lineHeight: 1.35, color: C.muted, lineClamp: 3 }, description),
    ),
    h(
      'div',
      { justifyContent: 'space-between', alignItems: 'center' },
      h(
        'div',
        { gap: 12, overflow: 'hidden', maxWidth: 680 },
        chips.slice(0, 3).map((c, i) =>
          h('div', { flexShrink: 0, whiteSpace: 'nowrap', alignItems: 'center', height: 44, padding: '0 18px', borderRadius: 999, fontFamily: 'JetBrains Mono', fontSize: 20, background: i === 0 ? C.accentFill : C.surface, color: i === 0 ? '#082f49' : C.muted, border: `1px solid ${i === 0 ? C.accentFill : C.border}` }, c),
        ),
      ),
      h('div', { fontFamily: 'JetBrains Mono', fontSize: 22, color: C.subtle, whiteSpace: 'nowrap' }, 'napat-hi.github.io/Web-Resume'),
    ),
  )
}

export async function renderOg(data) {
  const svg = await satori(layout(data), { width: 1200, height: 630, fonts })
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
}
