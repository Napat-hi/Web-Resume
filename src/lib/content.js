// Helpers for data fields that may still hold TODO(Po) placeholders.
// Production never renders a TODO string; dev builds show it so gaps stay visible.

export const isTodo = (v) => typeof v === 'string' && v.startsWith('TODO')
export const known = (v) => v !== null && v !== undefined && v !== '' && !isTodo(v)
export const showTodos = import.meta.env.DEV
