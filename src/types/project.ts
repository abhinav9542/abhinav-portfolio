export type ProjectSectionType =
  | 'text'
  | 'imageGrid'
  | 'moodboard'
  | 'twoColumn'
  | 'specs'
  | 'observations'
  | 'beforeAfter'
  | 'imageRow'

/**
 * Case studies come from decks with genuinely different structures — a
 * product-design deck argues in storyboards and mood boards, an
 * industrial-design deck argues in dimensions, percentile data and
 * before/after sections. Rather than force the second into the first's
 * shape, the section union grew to match the real content.
 */

export interface ProjectImage {
  src: string
  alt: string
  caption?: string
  /** Small eyebrow above the figure, e.g. 'Before · current product'. */
  label?: string
  /** Tailwind aspect-ratio class override, e.g. 'aspect-square'. Defaults per layout. */
  aspect?: string
  /** `contain` for diagrams and drawings that must not be cropped. */
  fit?: 'cover' | 'contain'
}

/** A single measured fact — dimension, material, percentile band. */
export interface SpecItem {
  label: string
  value: string
  note?: string
}

export interface SpecGroup {
  title: string
  items: SpecItem[]
}

/** A numbered research finding. */
export interface Observation {
  title: string
  body: string
}

/** A headline number quantifying a design change. */
export interface Metric {
  value: string
  label: string
  note?: string
}

export interface ProjectSection {
  id: string
  heading: string
  type: ProjectSectionType
  body?: string
  images?: ProjectImage[]
  /** Widens the section to the 6xl measure. Set per case study, not per section type. */
  wide?: boolean

  /** `specs` */
  specGroups?: SpecGroup[]

  /** `observations` */
  observations?: Observation[]
  /** Sourcing note rendered above the observation grid. */
  note?: string

  /** `beforeAfter` — images[0] is before, images[1] is after. */
  extras?: ProjectImage[]
  metrics?: Metric[]
  bullets?: string[]
  bulletsHeading?: string

  /** `imageRow` and `specs` */
  columns?: 1 | 2 | 3 | 4 | 5
}

export interface ProjectMeta {
  label: string
  value: string
}

export interface ProjectData {
  slug: string
  title: string
  tagline: string
  role: string
  year: string
  coverImage: string
  tags: string[]
  featured: boolean
  /**
   * Re-points the palette variables for this case study (see `.theme-technical`
   * in globals.css). Defaults to the site's warm cream field.
   */
  theme?: 'warm' | 'technical'
  /** Extra hero facts beyond role and year, e.g. programme or guidance credit. */
  meta?: ProjectMeta[]
  /** True while this entry is a placeholder awaiting real case-study content. */
  isPlaceholder?: boolean
  sections: ProjectSection[]
}
