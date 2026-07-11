export interface Skill {
  name: string
  category: 'tool' | 'skill'
}

export const skills: Skill[] = [
  { name: 'Figma', category: 'tool' },
  { name: 'Adobe Photoshop', category: 'tool' },
  { name: 'SPSS', category: 'tool' },
  { name: 'Ms PowerPoint', category: 'tool' },
  { name: 'Ms Word', category: 'tool' },
  { name: 'Empathy Mapping', category: 'skill' },
  { name: 'User Research', category: 'skill' },
  { name: 'Behavioral Analysis', category: 'skill' },
  { name: 'Digital Sketching', category: 'skill' },
]
