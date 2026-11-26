// Is the About "Now" box (profile.now.updated, e.g. "November 2026") out of date?
// Stale from the third calendar month after it: "November 2026" turns stale on 1 February 2027.
// Used by prerender.mjs (build warning) and check-site.mjs (weekly check fails).
const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

export function nowStatus(updated, today = new Date()) {
  if (!updated) return { stale: false }
  const m = /^([A-Za-z]+)\s+(\d{4})$/.exec(String(updated).trim())
  const month = m ? MONTHS.indexOf(m[1].toLowerCase()) : -1
  if (month < 0) {
    return { stale: true, message: `profile.now.updated is "${updated}"; write it like "November 2026".` }
  }
  const age = (today.getFullYear() - Number(m[2])) * 12 + (today.getMonth() - month)
  if (age < 3) return { stale: false, age }
  return {
    stale: true,
    age,
    message: `The About "Now" box says "updated ${updated}" (${age} months ago). Update profile.now in src/data/profile.js, or remove the box.`,
  }
}
