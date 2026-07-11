import type { ProjectData } from '@/types/project'

/**
 * Project data. Every project is data-driven: the detail page template
 * (ProjectDetailPage) is fully generic and dispatches on `section.type`,
 * so adding a case study is purely an edit to this file — no component
 * changes required.
 *
 * Section ids mirror the structure of Abhinav's case-study decks
 * (problem statement -> research -> challenges -> mood board -> design
 * solution -> product development) so deck content maps in directly.
 */

const dementiaAidBase = '/projects/dementia-aid'

export const projects: ProjectData[] = [
  {
    slug: 'dementia-aid',
    title: 'Dementia Aid',
    tagline:
      'Reconnect, relive, remember — compassionate, non-medical product interventions for people living with dementia and their family caregivers.',
    role: 'UX Researcher & Product Designer',
    year: '2025',
    coverImage: `${dementiaAidBase}/cover.jpg`,
    tags: ['Product Design', 'UX Research', 'Assistive Technology'],
    featured: true,
    sections: [
      {
        id: 'problemStatement',
        heading: 'Problem Statement',
        type: 'twoColumn',
        body: "Dementia is a decline in memory, mood, reasoning, and daily abilities — not a single disease. Alzheimer's disease is its leading cause, accounting for 60–70% of cases. With dementia in India projected to more than double by 2050, the current lack of compassionate, non-medical interventions leaves heightened distress for patients and an unsustainable burden on their family caregivers at home.",
        images: [
          {
            src: `${dementiaAidBase}/stats-chart.jpg`,
            alt: 'Bar chart showing the number of persons with dementia in India, in millions, projected to grow from 3.1 million in 2005 to 14.3 million by 2050',
            aspect: 'aspect-[7/6]',
            caption:
              'Persons with dementia in India, projected to 2050. Source: Alzheimer’s & Related Disorders Society of India.',
          },
        ],
      },
      {
        id: 'research',
        heading: 'Research',
        type: 'text',
        body: 'We used a qualitative, exploratory design to understand the environmental challenges and lived experiences of people with dementia and their caregivers in India. Data was collected through semi-structured interviews with professionals and caregivers, and thematic analysis surfaced the key patterns and challenges that shaped the design direction.',
      },
      {
        id: 'challenges',
        heading: 'Challenges',
        type: 'imageGrid',
        body: 'Three recurring struggles emerged from the research: short-term forgetfulness that blurs recent days, sundowning distress as evening approaches, and disorientation when navigating the home at night.',
        images: [
          {
            src: `${dementiaAidBase}/challenge-forgetfulness.jpg`,
            alt: 'Illustrated storyboard of an elderly woman unable to recall yesterday, comforted by a photograph of her grandson',
            caption: 'Short-term forgetfulness — when today becomes a blur.',
            aspect: 'aspect-square',
          },
          {
            src: `${dementiaAidBase}/challenge-sundowning.jpg`,
            alt: 'Illustrated storyboard of an elderly woman growing anxious and confused as daylight fades into evening',
            caption: 'Sundowning — anxiety and confusion as daylight fades.',
            aspect: 'aspect-square',
          },
          {
            src: `${dementiaAidBase}/challenge-navigation.jpg`,
            alt: 'Illustrated storyboard of an elderly woman lost in a dark hallway at night, searching for the bathroom',
            caption: 'Night-time navigation — losing the way to familiar rooms.',
            aspect: 'aspect-square',
          },
        ],
      },
      {
        id: 'moodboard',
        heading: 'Mood Board',
        type: 'moodboard',
        body: 'Designing with empathy, memory and connection. The Memory Pebble borrows from nature’s simplest forms — pebbles that soothe, ground and belong — while the Anvika Button draws on the familiarity of clothing buttons: simple, everyday, universally understood. Soft edges, natural textures, and a calm muted palette throughout.',
        images: [
          {
            src: `${dementiaAidBase}/mood-pebble-stack.jpg`,
            alt: 'Stacked smooth grey pebbles evoking calm and balance',
          },
          {
            src: `${dementiaAidBase}/mood-pebble-hand.jpg`,
            alt: 'A smooth pebble-shaped device resting comfortably in an open palm',
          },
          {
            src: `${dementiaAidBase}/mood-buttons.jpg`,
            alt: 'Assorted clothing buttons in warm neutral tones',
          },
          {
            src: `${dementiaAidBase}/mood-cardigan.jpg`,
            alt: 'Close-up of a beige linen shirt with a simple button',
          },
        ],
      },
      {
        id: 'memPebble',
        heading: 'Mem Pebble',
        type: 'twoColumn',
        body: 'A gentle companion for memory, comfort and safety. The smooth handheld form provides grounding sensory relief for anxiety, while an ambient lighting system adjusts color temperature to ease sundowning — reinforced by music therapy and on-device visual cues that strengthen memories of recent experiences.',
        images: [
          {
            src: `${dementiaAidBase}/pebble-render.jpg`,
            alt: 'Mem Pebble product render — an egg-shaped device in beige stone texture with a black glass face and single button',
            caption: 'Mem Pebble — tactile, egg-shaped form in stone and black glass.',
            aspect: 'aspect-square',
          },
          {
            src: `${dementiaAidBase}/pebble-lighting.jpg`,
            alt: 'An elderly woman relaxing at sunset beside the glowing Mem Pebble as warm ambient ceiling lighting and music fill the room',
            caption: 'Adaptive lighting and music therapy easing the sundowning hours.',
            aspect: 'aspect-square',
          },
        ],
      },
      {
        id: 'anvikaButton',
        heading: 'Anvika Button',
        type: 'twoColumn',
        body: 'A smart button that guides at every step. Anvika resembles a standard clothing button, blending discreetly into daily wear, and runs for months on low-energy signal transmission. As the wearer approaches within 1–1.5 meters, door signage detects them and gently glows — confirming the correct room non-verbally and making night-time navigation safer.',
        images: [
          {
            src: `${dementiaAidBase}/anvika-cardigan.jpg`,
            alt: 'Illustration of the Anvika Button sewn onto a beige cardigan beside an ordinary button, nearly indistinguishable',
            caption: 'Discreet integration — worn like any other button.',
          },
          {
            src: `${dementiaAidBase}/anvika-door.jpg`,
            alt: 'Illustration of an elderly man walking toward a door where a toilet sign glows in response to his Anvika Button',
            caption: 'Proximity-triggered signage glowing to confirm the right room.',
          },
        ],
      },
      {
        id: 'productDevelopment',
        heading: 'Product Development',
        type: 'imageGrid',
        body: 'The pebble was refined into an organic, textured body in black and beige — 10.8 × 8.2 × 11.8 cm, 3D-printed in PLA — with a deliberately minimal interface: two buttons and a rear-facing light that activates during evening hours to reduce sundowning symptoms and promote calm orientation. The Anvika Button houses a light-emitter array and clip mechanism inside a standard button silhouette.',
        images: [
          {
            src: `${dementiaAidBase}/dev-pebble-render.jpg`,
            alt: 'Rendered Mem Pebble with its photo display screen and single control button',
            caption: 'Mem Pebble — final render with photo display.',
            aspect: 'aspect-square',
          },
          {
            src: `${dementiaAidBase}/dev-pebble-glow.jpg`,
            alt: 'Rendered Mem Pebble showing the rear-facing evening glow around the device',
            caption: 'Mem Pebble — rear-facing light for evening hours.',
            aspect: 'aspect-square',
          },
          {
            src: `${dementiaAidBase}/anvika-render-pair.jpg`,
            alt: 'Rendered pair of Anvika Buttons showing the glowing LED array and the rear clip mechanism',
            caption: 'Anvika Button — LED array and clip mechanism.',
            aspect: 'aspect-square',
          },
          {
            src: `${dementiaAidBase}/anvika-render-top.jpg`,
            alt: 'Rendered Anvika Button resting on a studio surface with its proximity LEDs lit',
            caption: 'Anvika Button — proximity LEDs lit.',
            aspect: 'aspect-square',
          },
        ],
      },
    ],
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    tagline: 'A case study placeholder — full write-up coming soon.',
    role: 'Interaction Designer',
    year: '2025',
    coverImage: '',
    tags: ['Interaction Design', 'Behavioral Design'],
    featured: false,
    isPlaceholder: true,
    sections: [
      {
        id: 'problemStatement',
        heading: 'Problem Statement',
        type: 'text',
        body: 'Placeholder copy. The real problem statement for this project will replace this once the case study is shared.',
      },
      {
        id: 'research',
        heading: 'Research',
        type: 'text',
        body: 'Placeholder copy describing the research approach and key insights gathered for this project.',
      },
      {
        id: 'challenges',
        heading: 'Challenges',
        type: 'imageGrid',
        body: 'Placeholder copy summarising the challenges this project needed to address.',
        images: [
          { src: '', alt: 'Challenge illustration one — placeholder' },
          { src: '', alt: 'Challenge illustration two — placeholder' },
        ],
      },
      {
        id: 'moodboard',
        heading: 'Mood Board',
        type: 'moodboard',
        body: 'Placeholder copy describing the visual and material direction explored for this project.',
        images: [
          { src: '', alt: 'Mood board reference one — placeholder' },
          { src: '', alt: 'Mood board reference two — placeholder' },
          { src: '', alt: 'Mood board reference three — placeholder' },
        ],
      },
      {
        id: 'designSolution',
        heading: 'Design Solution',
        type: 'twoColumn',
        body: 'Placeholder copy describing the design solution and its reasoning.',
        images: [{ src: '', alt: 'Design solution visual — placeholder' }],
      },
      {
        id: 'productDevelopment',
        heading: 'Product Development',
        type: 'imageGrid',
        body: 'Placeholder copy covering development and prototyping details.',
        images: [{ src: '', alt: 'Product development render — placeholder' }],
      },
    ],
  },
]

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getAdjacentProjects(slug: string): {
  prev?: ProjectData
  next?: ProjectData
} {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return {}
  return {
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  }
}
