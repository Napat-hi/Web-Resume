import { isTodo, showTodos } from '../../lib/content'

// Renders a TODO(Po) placeholder as a dashed marker in dev; renders nothing in production.
export default function Todo({ value }) {
  if (!showTodos || !isTodo(value)) return null
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0 6px',
        border: '1px dashed var(--danger)',
        borderRadius: 4,
        color: 'var(--danger)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
      }}
    >
      {value}
    </span>
  )
}
