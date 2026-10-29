import type { CaseStudy, ProjectData } from '@/types/project'
import { CaseHero } from './CaseHero'
import { CaseBlockView } from './CaseBlocks'

/** The editorial case-study template: hero, then the project's blocks in order. */
export function CaseStudyView({ project, study }: { project: ProjectData; study: CaseStudy }) {
  return (
    <>
      <CaseHero project={project} study={study} />
      {study.blocks.map((block, i) => (
        <CaseBlockView key={i} block={block} />
      ))}
    </>
  )
}
