export type ProjectSectionType = 'text' | 'imageGrid' | 'moodboard' | 'twoColumn'

export interface ProjectImage {
  src: string
  alt: string
  caption?: string
  /** Tailwind aspect-ratio class override, e.g. 'aspect-square'. Defaults per layout. */
  aspect?: string
}

export interface ProjectSection {
  id: string
  heading: string
  type: ProjectSectionType
  body?: string
  images?: ProjectImage[]
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
  /** True while this entry is a placeholder awaiting real case-study content. */
  isPlaceholder?: boolean
  sections: ProjectSection[]
}
