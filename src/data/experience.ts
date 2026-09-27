export interface Experience {
  role: string
  place: string
  period: string
  summary: string
  /** Research skills, worded with terms psychology and design share. */
  skills: string[]
  appliedIn?: { label: string; slug: string }
}

// Kept to what the resume states — presented as psychology research, not
// re-labelled as design work.
export const experience: Experience = {
  role: 'Research Intern',
  place: 'Mind Detox Centre, New Delhi',
  period: 'May – Aug 2024',
  summary:
    'Conducted behavioral research using qualitative and quantitative methods, supporting data collection, analysis and reporting of insights.',
  skills: [
    'Behavioral research',
    'Qualitative methods',
    'Quantitative methods',
    'Data collection',
    'Analysis & synthesis',
    'Research reporting',
  ],
  appliedIn: { label: 'See it applied in Dementia Aid', slug: 'dementia-aid' },
}
