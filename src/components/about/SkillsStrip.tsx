import { skills } from '@/data/skills'
import { Tag } from '@/components/ui/Tag'

export function SkillsStrip() {
  const doubled = [...skills, ...skills]

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-3 py-2 motion-reduce:animate-none motion-reduce:flex-wrap">
        {doubled.map((skill, index) => (
          <Tag key={`${skill.name}-${index}`}>{skill.name}</Tag>
        ))}
      </div>
    </div>
  )
}
