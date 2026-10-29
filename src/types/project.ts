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
  /** A cut-out with a transparent background: drawn with no frame or card. */
  bare?: boolean
  /** CSS width of the figure inside its column, e.g. '90%'; centred. */
  width?: string
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
  /** Where the figure comes from; makes the note a link. */
  href?: string
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

/** One branch of the case-study mind map: a stage of the story in a glance. */
export interface OverviewBranch {
  /** Short node label, e.g. 'Problem'. */
  label: string
  /** One or two very short lines — the gist, not the argument. */
  points: string[]
  image?: ProjectImage
  /** Section id in the detailed case study this branch expands into. */
  sectionId: string
}

/**
 * The compact, mind-map version of a case study shown before the detailed
 * page. Written by hand (not derived) so every line stays crisp.
 */
export interface ProjectOverview {
  /** The design question at the centre of the map. */
  question: string
  branches: OverviewBranch[]
}

/** One moment of the case study told as a story: a single line, little else. */
export interface StoryBeat {
  /** Tiny act marker, e.g. 'The tension'. */
  act: string
  /** The one line this moment says. Keep it short. */
  line: string
  /** At most one quiet supporting sentence. */
  aside?: string
  /** At most one image. */
  image?: ProjectImage
}

/**
 * The editorial case-study template: a run of blocks under a full-bleed hero.
 * An image with an empty `src` renders as a labelled placeholder, so the
 * layout can be reviewed before the final artwork exists.
 */
export type CaseBlock =
  /** Opening statement, with optional headline numbers. */
  | { kind: 'intro'; id?: string; eyebrow: string; statement: string; body?: string; stats?: Metric[] }
  /** Text beside one large image; `flip` swaps the sides. */
  | { kind: 'feature'; id?: string; eyebrow: string; heading: string; body: string; bullets?: string[]; image?: ProjectImage; flip?: boolean }
  /** One image across the full content width. */
  | { kind: 'wide'; id?: string; image: ProjectImage }
  /** A heading over a grid of captioned images. */
  | { kind: 'gallery'; id?: string; eyebrow: string; heading: string; body?: string; images: ProjectImage[]; columns?: 1 | 2 | 3 | 4 }
  /** A three-panel storyboard: illustrations with real text beneath, in the site's own styling. */
  | { kind: 'storyboard'; id?: string; eyebrow: string; heading: string; body: string; panels: { image: ProjectImage; caption: string }[] }
  /** Side-by-side spec cards: one per product, label/value rows, optional image. */
  | { kind: 'specs'; id?: string; eyebrow: string; heading: string; body?: string; cards: { name: string; rows: { label: string; value: string }[]; image?: ProjectImage; note?: string }[] }
  /** A wide photo with one detail ringed and an arrow to a zoomed-in view of it. */
  | { kind: 'callout'; id?: string; eyebrow: string; heading: string; body?: string; image: ProjectImage; ratio: number; zoom: ProjectImage; target: { x: number; y: number; rw: number; rh: number }; caption?: string }
  /** How a product works, as picture steps joined by arrows; one row per product. */
  | { kind: 'flow'; id?: string; eyebrow: string; heading: string; body?: string; rows: { name: string; aspect?: string; steps: { image: ProjectImage; title: string; body: string; focus?: string }[] }[] }
  /** A numbered run of steps — process, research method, flow. */
  | { kind: 'steps'; id?: string; eyebrow: string; heading: string; body?: string; image?: ProjectImage; steps: { title: string; body: string }[] }
  /** A single large pull-line between sections. */
  | { kind: 'pullquote'; line: string; aside?: string }
  /** The closing section. */
  | { kind: 'closing'; eyebrow: string; heading: string; body: string }

export interface CaseStudy {
  /** Role, team, tools, year — shown beside the hero title. */
  facts: ProjectMeta[]
  /** Big cover image behind the hero. */
  heroImage?: ProjectImage
  /** Flip the hero photo and put the facts top right, to keep a product at the photo's bottom visible. */
  heroMirrored?: boolean
  blocks: CaseBlock[]
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
  /** Mind-map summary shown at /work/:slug; the sections below are /work/:slug/details. */
  overview?: ProjectOverview
  /** The detailed page told as a few beats; the full sections become an appendix. */
  story?: StoryBeat[]
  /** The editorial template; when present it replaces the story on the detailed page. */
  caseStudy?: CaseStudy
  sections: ProjectSection[]
}
