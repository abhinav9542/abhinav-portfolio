import type { ProjectImage } from '@/types/project'
import { ProjectImageBlock } from './ProjectImageBlock'

interface ProjectMoodboardProps {
  images: ProjectImage[]
}

export function ProjectMoodboard({ images }: ProjectMoodboardProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {images.map((image, index) => (
        <ProjectImageBlock key={`${image.alt}-${index}`} image={image} aspect="aspect-square" />
      ))}
    </div>
  )
}
