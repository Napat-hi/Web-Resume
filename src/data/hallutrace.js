// HalluTrace's main result (the paper's Fig. 2): where wrong birth and death years in the
// Biographies task most likely started, per model. Copied from the public release:
// github.com/Napat-hi/hallutrace, results/intervention_points/f5_by_model.csv (data CC BY 4.0).
// `lo`/`hi` are slot counts; a range means the corpus counts leave the point open.
// The CSV also has overlap rows ("training data and process together", "open: ...");
// they are left out because they re-count slots already in these five rows.
//
// Do NOT use the F1 heatmap (h per task) as a headline: all eight task verifiers failed the
// human-label check (quarantined), so the repo shows those numbers only as supplementary.

export const points = [
  { id: 'inference', label: 'At inference', short: 'Inference' },
  { id: 'data', label: 'In the training data', short: 'Training data' },
  { id: 'process', label: 'In the training process', short: 'Training process' },
  { id: 'boundary', label: 'At the knowledge boundary', short: 'Knowledge boundary', note: 'the corpus holds neither the right nor the wrong year' },
  { id: 'undetermined', label: 'Undetermined', short: 'Undetermined' },
]

// Order follows the CSV. n = wrong year slots for that model.
export const models = [
  { id: 'all', label: 'All five models', n: 277, inference: [58, 58], data: [0, 7], process: [0, 7], boundary: [12, 59], undetermined: [157, 207] },
  { id: 'olmo2', label: 'OLMo 2', n: 106, inference: [23, 23], data: [0, 2], process: [0, 2], boundary: [0, 23], undetermined: [60, 83] },
  { id: 'dclm', label: 'DCLM', n: 73, inference: [12, 12], data: [0, 2], process: [0, 2], boundary: [12, 29], undetermined: [32, 49] },
  { id: 'olmo17', label: 'OLMo 1.7', n: 45, inference: [5, 5], data: [0, 0], process: [0, 0], boundary: [0, 6], undetermined: [34, 40] },
  { id: 'redpajama', label: 'RedPajama', n: 50, inference: [18, 18], data: [0, 3], process: [0, 3], boundary: [0, 1], undetermined: [28, 32] },
  { id: 'pythia', label: 'Pythia', n: 3, inference: [0, 0], data: [0, 0], process: [0, 0], boundary: [0, 0], undetermined: [3, 3] },
]

export const source = {
  label: 'f5_by_model.csv',
  url: 'https://github.com/Napat-hi/hallutrace/blob/main/results/intervention_points/f5_by_model.csv',
}

const pct = (x, n) => Math.round((x / n) * 100)
export function shareText([lo, hi], n) {
  return lo === hi ? `${pct(lo, n)}%` : `${pct(lo, n)}–${pct(hi, n)}%`
}
export function countText([lo, hi], n) {
  return lo === hi ? `${lo} of ${n} wrong years` : `${lo} to ${hi} of ${n} wrong years`
}
