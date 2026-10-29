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
const steamDeckBase = '/projects/steam-deck-ergonomics'

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
    caseStudy: {
      facts: [
        { label: 'My role', value: 'UX Researcher & Product Designer' },
        { label: 'Focus', value: 'Home care for dementia in India' },
        { label: 'Outcome', value: 'Two products: Mem Pebble and Anvika Button' },
        { label: 'Year', value: '2025' },
      ],
      heroImage: { src: `${dementiaAidBase}/pebble-lighting-hero.jpg`, alt: 'Mem Pebble glowing beside an elderly woman at sunset' },
      heroMirrored: true,
      blocks: [
        {
          kind: 'intro',
          eyebrow: 'The idea',
          statement: 'Support for dementia can feel clinical. We asked how everyday objects could make it feel familiar, calm and close.',
          body: 'Dementia affects memory, mood and daily abilities, and most care in India happens at home, where gentle, non-medical support is scarce.',
          stats: [
            { value: '2×+', label: 'Dementia in India is projected to more than double by 2050' },
            { value: '14.3M', label: 'Projected number of people living with dementia in India by 2050' },
            { value: '60–70%', label: "Share of cases caused by Alzheimer's disease" },
          ],
        },
        {
          kind: 'feature',
          id: 'problemStatement',
          eyebrow: 'The problem',
          heading: 'A growing need, and little gentle support',
          body: 'With dementia cases in India set to more than double by 2050, the lack of compassionate, non-medical interventions leaves patients more distressed and puts an unsustainable burden on family caregivers at home.',
          image: { src: `${dementiaAidBase}/stats-chart.png`, alt: 'Chart of persons with dementia in India, projected to 2050', bare: true, fit: 'contain', aspect: 'aspect-[1282/1094]', caption: 'Persons with dementia in India, projected to 2050.' },
        },
        {
          kind: 'steps',
          id: 'research',
          eyebrow: 'Research',
          heading: 'Listening to the people who live it',
          body: 'A qualitative, exploratory study of the environmental challenges and lived experience of people with dementia and their caregivers in India. We audio-recorded our sessions with patients and psychologists.',
          image: { src: `${dementiaAidBase}/research-site-wide.jpg`, alt: 'The New O.P.D. Block of Govt. Doon Medical College', caption: 'Govt. Doon Medical College, New O.P.D. Block.', aspect: 'aspect-[4/3]' },
          steps: [
            { title: 'Interviews', body: 'Semi-structured conversations with professionals and caregivers.' },
            { title: 'Audio recordings', body: 'Sessions with patients and psychologists were audio-recorded.' },
            { title: 'Thematic analysis', body: 'Patterns in lived experience, grouped into recurring themes.' },
            { title: 'Design direction', body: 'Three struggles that kept returning shaped what we made.' },
          ],
        },
        {
          kind: 'intro',
          id: 'secondaryResearch',
          eyebrow: 'Secondary research',
          statement: 'Our observations matched what published research reports.',
          body: 'These figures come from published studies and reports. The ranges are wide because studies differ in setting and definition, so we use them as supporting evidence, not as proof of our own findings.',
          stats: [
            { value: '2.5–66%', label: 'of people with dementia show sundowning, depending on setting and definition', note: 'Frontiers in Medicine, 2016', href: 'https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2016.00073/epub' },
            { value: '20–60%', label: 'wander: about 20% of those living at home, about 60% in institutions', note: 'Practical Neurology', href: 'https://practicalneurology.com/diseases-diagnoses/alzheimer-disease-dementias/wandering-sundowning-in-dementia/31912/' },
            { value: '24 h', label: 'If a missing person is not found within a day, up to half face serious injury or death', note: 'Pan-Canadian study, 2024', href: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11692155/' },
            { value: '3.7M → 7.6M', label: 'People with dementia in India, 2010 to 2030', note: 'ARDSI Dementia India Report, via Brookings', href: 'https://www.brookings.edu/blog/up-front/2019/09/20/the-persistence-of-memory-the-burden-of-alzheimers-disease-in-india/' },
            { value: '5 hours', label: 'a day spent on care by informal carers, on average', note: 'WHO dementia statistics, 2019', href: 'https://www.dementiaresearcher.nihr.ac.uk/who-dementia-statistics/' },
            { value: '70%', label: 'of informal carer hours are provided by women', note: 'WHO dementia statistics', href: 'https://www.dementiaresearcher.nihr.ac.uk/who-dementia-statistics/' },
          ],
        },
        {
          kind: 'storyboard',
          id: 'challenges',
          eyebrow: 'Insight 01',
          heading: 'Memory loss and forgetfulness',
          body: 'Difficulty recalling recent events, recognizing people or objects, and remembering daily routines.',
          panels: [
            { image: { src: `${dementiaAidBase}/story-forgetfulness-1.jpg`, alt: 'An elderly woman at a table looks at familiar objects', aspect: 'aspect-[458/546]' }, caption: 'She looks at familiar objects but struggles to remember what to do next.' },
            { image: { src: `${dementiaAidBase}/story-forgetfulness-2.jpg`, alt: 'A caregiver shows her a photo album', aspect: 'aspect-[458/546]' }, caption: 'She sometimes forgets the names of close family members, even though they feel familiar.' },
            { image: { src: `${dementiaAidBase}/story-forgetfulness-3.jpg`, alt: 'She stands at the stove holding a pot', aspect: 'aspect-[458/546]' }, caption: 'She may forget if she has already done a task like cooking, eating or taking medication.' },
          ],
        },
        {
          kind: 'storyboard',
          eyebrow: 'Insight 02',
          heading: 'Sundowning and evening confusion',
          body: 'Increased anxiety, restlessness and confusion in the late afternoon and evening, often triggered by changes in light.',
          panels: [
            { image: { src: `${dementiaAidBase}/story-sundowning-1.jpg`, alt: 'At 5:30 PM she gazes at the sunset, uneasy', aspect: 'aspect-[458/508]' }, caption: 'As the evening begins, she starts to feel uneasy and restless without a clear reason.' },
            { image: { src: `${dementiaAidBase}/story-sundowning-2.jpg`, alt: 'At 7:00 PM she sits up in bed, confused', aspect: 'aspect-[458/508]' }, caption: 'She becomes more confused, may ask repeated questions, and feel uncertain about her surroundings.' },
            { image: { src: `${dementiaAidBase}/story-sundowning-3.jpg`, alt: 'At 8:30 PM she clutches the blanket, afraid', aspect: 'aspect-[458/508]' }, caption: 'She may experience fear, agitation or disrupted sleep during the night.' },
          ],
        },
        {
          kind: 'storyboard',
          eyebrow: 'Insight 03',
          heading: 'Disorientation and navigation',
          body: 'Difficulty recognizing places, finding rooms or moving around the house independently, especially at night.',
          panels: [
            { image: { src: `${dementiaAidBase}/story-navigation-1.jpg`, alt: 'At 9:00 PM she looks into a lit bedroom, unsure', aspect: 'aspect-[458/484]' }, caption: 'She may not recognize familiar rooms or forget which room she was heading to.' },
            { image: { src: `${dementiaAidBase}/story-navigation-2.jpg`, alt: 'At 9:05 PM she reaches for one of two similar doors', aspect: 'aspect-[458/484]' }, caption: 'She can get confused between similar-looking doors and struggle to find the right place, such as the bathroom or bedroom.' },
            { image: { src: `${dementiaAidBase}/story-navigation-3.jpg`, alt: 'At 9:10 PM she stands at the foot of a dark staircase', aspect: 'aspect-[458/484]' }, caption: 'This can lead to wandering, getting stuck, or feeling unsafe, especially during the night.' },
          ],
        },
        {
          kind: 'gallery',
          id: 'explorations',
          eyebrow: 'Initial explorations',
          heading: 'First ideas, drawn by hand',
          body: 'Before any product existed, we sketched how a home could help someone find their way, and what a small companion might look like.',
          columns: 2,
          images: [
            { src: `${dementiaAidBase}/explore-navigation.jpg`, alt: 'Hand-drawn navigation ideas: glowing signage, glowing tape, door handles and room colors', caption: 'Navigation cues: glowing signs, tape and door handles, and a color for each room.', aspect: 'aspect-[3/2]' },
            { src: `${dementiaAidBase}/explore-concepts.jpg`, alt: 'Pencil sketches of a pebble-shaped companion with a photo screen, a wristband and a cabinet placement', caption: 'Early forms: a pebble with a photo screen, and a wristband.', aspect: 'aspect-[3/2]' },
          ],
        },
        {
          kind: 'gallery',
          id: 'scenarios',
          eyebrow: 'Scenario visualization',
          heading: 'Imagining the moments',
          body: 'Quick scenes helped us test each idea in the home, at the time of day it would matter.',
          columns: 3,
          images: [
            { src: `${dementiaAidBase}/scenario-cabinet.jpg`, alt: 'Sketch of the pebble companion resting on a cabinet', caption: 'The pebble at home, within sight.', aspect: 'aspect-[4/3]', fit: 'contain' },
            { src: `${dementiaAidBase}/scenario-bedroom.jpg`, alt: 'Sketch of a person sitting on a bed in a room with a window', caption: 'The evening in the bedroom.', aspect: 'aspect-[4/3]', fit: 'contain' },
            { src: `${dementiaAidBase}/scenario-door.jpg`, alt: 'Sketch of a door sign lighting up as someone approaches with a small LED device', caption: 'A door sign lights up as the wearer comes near.', aspect: 'aspect-[4/3]', fit: 'contain' },
          ],
        },
        {
          kind: 'gallery',
          id: 'moodboard',
          eyebrow: 'Mood board',
          heading: 'Soft edges, natural textures, a calm palette',
          body: 'Mem Pebble borrows from pebbles that soothe and ground. Anvika borrows from the clothing button: simple, everyday, universally understood.',
          columns: 1,
          images: [{ src: `${dementiaAidBase}/moodboard.jpg`, alt: 'Mood board for Memory Pebble and Anvika Button: keywords, materials, textures, form language and colour palette', aspect: 'aspect-[3/2]', width: '90%' }],
        },
        {
          kind: 'feature',
          id: 'ideation',
          eyebrow: 'Ideation',
          heading: 'Sketching the pebble',
          body: 'We began on paper with soft, rounded forms, settling on an egg shape that is easy to hold and calm to look at. Side views, screen placement and rough dimensions followed.',
          image: { src: `${dementiaAidBase}/ideation-mem-pebble.png`, alt: 'Pencil sketches of the Mem Pebble: egg-shaped forms, side views and dimensions', caption: 'Early Mem Pebble sketches.', aspect: 'aspect-[977/530]', bare: true, fit: 'contain' },
        },
        {
          kind: 'feature',
          eyebrow: 'Ideation',
          heading: 'Sketching the band and the button',
          body: 'Alongside the pebble, we sketched a wearable: the Smriti Band, with a small screen, a chip and a soft cushion against the skin. Guided by the navigation insight, we later set the band aside and chose the button instead, which became Anvika.',
          image: { src: `${dementiaAidBase}/ideation-anvika.png`, alt: 'Pencil sketches of the Smriti Band and early Anvika ideas', caption: 'Smriti Band and early Anvika sketches.', aspect: 'aspect-[726/535]', bare: true, fit: 'contain' },
          flip: true,
        },
        {
          kind: 'feature',
          id: 'memPebble',
          eyebrow: 'Product one',
          heading: 'Mem Pebble',
          body: 'A gentle companion for memory, comfort and safety. Its smooth handheld form gives grounding relief for anxiety, and an ambient light shifts its color temperature to ease sundowning, with music and photo cues that strengthen recent memories.',
          bullets: ['Handheld comfort for anxiety', 'Ambient light that eases the evening', 'Music therapy and on-device visual cues'],
          image: { src: `${dementiaAidBase}/pebble-render.jpg`, alt: 'Mem Pebble render', aspect: 'aspect-square', width: '85%' },
        },
        { kind: 'wide', image: { src: `${dementiaAidBase}/dev-pebble-dimensions.jpg`, alt: 'Mem Pebble form study from the side, front and top', caption: 'Form study: side, front and top views.', aspect: 'aspect-[1727/911]' } },
        {
          kind: 'feature',
          id: 'anvikaButton',
          eyebrow: 'Product two',
          heading: 'Anvika Button',
          body: 'A smart button that guides at every step. It looks like an ordinary clothing button and runs for months on low-energy signals. As the wearer comes within 1–1.5 meters, the door sign glows to confirm the right room, with no words needed.',
          bullets: ['Blends into everyday clothing', 'Door signage glows as you approach', 'Safer night-time navigation'],
          image: { src: `${dementiaAidBase}/anvika-door.jpg`, alt: 'A door sign glowing as the wearer approaches', aspect: 'aspect-[1144/1375]', width: '85%' },
          flip: true,
        },
        {
          kind: 'gallery',
          eyebrow: 'Anvika in detail',
          heading: 'A button first, a smart device second',
          columns: 3,
          images: [
            { src: `${dementiaAidBase}/anvika-render-pair.jpg`, alt: 'Anvika Button render with its rear clip and four glowing LEDs', caption: 'The rear clip and LED array.', aspect: 'aspect-[1374/1145]' },
            { src: `${dementiaAidBase}/anvika-render-top.jpg`, alt: 'Anvika Button sewn onto beige fabric with its LEDs lit', caption: 'Sewn on like any button.', aspect: 'aspect-[1374/1145]' },
            { src: `${dementiaAidBase}/anvika-cardigan.jpg`, alt: 'Anvika Button on the collar of a linen shirt beside an ordinary button', caption: 'Worn beside an ordinary button.', aspect: 'aspect-[1374/1145]' },
          ],
        },
        {
          kind: 'intro',
          id: 'designEvidence',
          eyebrow: 'Secondary research',
          statement: 'Published research supports parts of our design, and is honest about its limits.',
          body: 'The evidence is strongest for visual cues, modest for music, and weaker for lighting. Reviews also suggest that familiar music can work as a memory cue, because musical memory is relatively spared in moderate Alzheimer’s. We treat the warm evening light as a gentle comfort, not as a treatment.',
          stats: [
            { value: '30 studies', label: 'A Cochrane review found music-based therapy probably improves depressive symptoms slightly in people with dementia, but likely does not reduce agitation', note: 'Cochrane review, 2025', href: 'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD003477.pub5/information' },
            { value: 'Sleep, not agitation', label: 'Light therapy reduced night-time awakenings in a meta-analysis of 11 trials, but showed no clear effect on agitation or depression', note: 'Fong et al., 2023', href: 'https://research.polyu.edu.hk/en/publications/the-effects-of-light-therapy-on-sleep-agitation-and-depression-in/' },
            { value: '32 studies', label: 'A scoping review found visual cues such as signage are the most studied physical cue, and that signage helped people with dementia find their way', note: 'Scoping review of environmental cues', href: 'https://aminer.org/pub/6177dba75244ab9dcb395756/influences-of-physical-environmental-cues-on-people-with-dementia-a-scoping-review' },
          ],
        },
        {
          kind: 'flow',
          id: 'howItWorks',
          eyebrow: 'How they work',
          heading: 'Two simple interactions',
          body: 'Neither product asks the user to learn anything new. Each one works in the background of an ordinary day.',
          rows: [
            {
              name: 'Mem Pebble',
              steps: [
                { image: { src: `${dementiaAidBase}/pebble-render.jpg`, alt: 'Mem Pebble held in the hand' }, title: 'Hold it', body: 'A smooth, egg-shaped form gives grounding comfort in the hand, with just two buttons.', focus: 'center' },
                { image: { src: `${dementiaAidBase}/pebble-lighting.jpg`, alt: 'Mem Pebble glowing beside a woman at sunset, with music notes' }, title: 'Evening light and music', body: 'As the evening comes, its rear-facing light glows and shifts to a calmer color, while music plays softly to ease sundowning.', focus: 'left center' },
                { image: { src: `${dementiaAidBase}/dev-pebble-render.jpg`, alt: 'Mem Pebble showing a family photo on its screen' }, title: 'Photo cues', body: 'Family photos on its screen help strengthen memories of recent moments.', focus: 'center' },
              ],
            },
            {
              name: 'Anvika Button',
              aspect: 'aspect-square',
              steps: [
                { image: { src: `${dementiaAidBase}/anvika-render-pair.jpg`, alt: 'Anvika Button with its LEDs and rear clip' }, title: 'A button, inside', body: 'An LED array and a clip mechanism sit inside a standard button shape, with NFC inside the plastic case.', focus: 'center' },
                { image: { src: `${dementiaAidBase}/anvika-render-top.jpg`, alt: 'Anvika Button sewn onto beige fabric' }, title: 'Worn like clothing', body: 'It is sewn on like any other button, so it blends into everyday wear.', focus: 'center' },
                { image: { src: `${dementiaAidBase}/anvika-door.jpg`, alt: 'A door sign glowing as the wearer approaches' }, title: 'The door guides', body: 'Within 1–1.5 meters, the door sign detects the wearer and glows to confirm the right room, with no words needed.', focus: 'center 38%' },
              ],
            },
          ],
        },
        {
          kind: 'gallery',
          id: 'productDevelopment',
          eyebrow: 'Prototype',
          heading: 'From sketch to a refined, printable form',
          body: 'The pebble was refined into an organic, textured body in black and beige, 10.8 × 8.2 × 11.8 cm and 3D-printed in PLA, with two buttons and a rear-facing evening light. Anvika fits its LED array and clip inside a standard button shape.',
          columns: 2,
          images: [
            { src: `${dementiaAidBase}/dev-pebble-render.jpg`, alt: 'Mem Pebble with a family photo on its display', caption: 'Mem Pebble, with a family photo on its display.', aspect: 'aspect-square' },
            { src: `${dementiaAidBase}/button-reference.jpg`, alt: 'Line drawing of everyday clothing buttons', caption: 'Reference: the everyday clothing button.', aspect: 'aspect-square', fit: 'contain' },
          ],
        },
        {
          kind: 'specs',
          id: 'cmf',
          eyebrow: 'Color, material, finish',
          heading: 'CMF and dimensions',
          body: 'Both products stay quiet: few colors, soft forms and familiar materials, so they read as everyday objects rather than devices.',
          cards: [
            {
              name: 'Mem Pebble',
              image: { src: `${dementiaAidBase}/pebble-render.jpg`, alt: 'Mem Pebble product render', aspect: 'aspect-[4/3]' },
              rows: [
                { label: 'Color', value: 'Black and beige / off-white' },
                { label: 'Form', value: 'Organic, textured body' },
                { label: 'Length (x)', value: '10.8 cm' },
                { label: 'Breadth (y)', value: '8.2 cm' },
                { label: 'Height (z)', value: '11.8 cm' },
                { label: 'Print material', value: 'PLA' },
              ],
            },
            {
              name: 'Anvika Button',
              image: { src: `${dementiaAidBase}/anvika-cmf.jpg`, alt: 'Exploded view of the Anvika Button: top shell, inner disc and base', aspect: 'aspect-[4/3]', fit: 'contain', bare: true },
              rows: [
                { label: 'Color', value: 'White and grey' },
                { label: 'Material', value: 'Plastic case with NFC inside' },
                { label: 'Finish', value: 'Glossy, smooth' },
                { label: 'Form', value: 'A look-alike of a real shirt button, woven or tucked' },
              ],
            },
          ],
        },
        {
          kind: 'callout',
          id: 'display',
          eyebrow: 'Project display',
          heading: 'The project, on display',
          body: 'We presented the project as a display of sketches, posters, storyboards and a 3D-printed Mem Pebble.',
          image: { src: `${dementiaAidBase}/display-board.jpg`, alt: 'Our project display board with sketches, posters, storyboards and a 3D-printed Mem Pebble' },
          ratio: 1.426,
          target: { x: 89.6, y: 89.6, rw: 9, rh: 10.5 },
          zoom: { src: `${dementiaAidBase}/pebble-3d-print.jpg`, alt: 'The 3D-printed Mem Pebble model up close', caption: 'The 3D-printed Mem Pebble, up close.' },
          caption: 'Printed in PLA at 10.8 × 8.2 × 11.8 cm.',
        },
        {
          kind: 'closing',
          eyebrow: 'The outcome',
          heading: 'Everyday objects. Gentler days.',
          body: 'Together, a pebble in the hand and a button on the sleeve support memory, calm and independence, without ever feeling like medical equipment. Reconnect, relive, remember.',
        },
      ],
    },
    story: [
      {
        act: 'The scale',
        line: 'By 2050, dementia in India will more than double.',
        aside: 'And most of that care happens at home — with little gentle, non-medical support.',
      },
      {
        act: 'Listening',
        line: 'So we listened — to caregivers, and to the people who support them.',
        aside: 'Three struggles kept coming back.',
      },
      {
        act: 'The tension',
        line: 'Forgetting yesterday. Fear as evening falls. Lost at night, at home.',
        image: { src: `${dementiaAidBase}/challenge-sundowning.jpg`, alt: 'Storyboard of sundowning distress as daylight fades' },
      },
      {
        act: 'The first idea',
        line: 'What if calm could be held in your hand?',
        aside: 'Mem Pebble — a smooth companion whose light softens as the evening comes.',
        image: { src: `${dementiaAidBase}/pebble-render.jpg`, alt: 'Mem Pebble product render' },
      },
      {
        act: 'The second idea',
        line: 'What if the right door could quietly say, “this way”?',
        aside: 'Anvika — a clothing button that makes the door sign glow as you approach.',
        image: { src: `${dementiaAidBase}/anvika-door.jpg`, alt: 'A door sign glowing as the wearer approaches' },
      },
      {
        act: 'The outcome',
        line: 'Everyday objects. Gentler days.',
        aside: 'Reconnect, relive, remember.',
      },
    ],
    overview: {
      question: 'How might everyday objects help people with dementia remember, stay calm and find their way?',
      branches: [
        {
          label: 'Problem',
          points: ['Dementia in India set to more than double by 2050.', 'Little compassionate, non-medical support at home.'],
          image: { src: `${dementiaAidBase}/stats-chart.png`, alt: 'Chart of dementia cases in India projected to 2050', fit: 'contain' },
          sectionId: 'problemStatement',
        },
        {
          label: 'Research',
          points: ['Semi-structured interviews with professionals and caregivers.', 'Thematic analysis of lived experience.'],
          sectionId: 'research',
        },
        {
          label: 'Insights',
          points: ['Short-term forgetfulness', 'Sundowning distress at evening', 'Night-time disorientation'],
          image: { src: `${dementiaAidBase}/challenge-sundowning.jpg`, alt: 'Storyboard of sundowning distress in the evening' },
          sectionId: 'challenges',
        },
        {
          label: 'Mem Pebble',
          points: ['Handheld comfort for anxiety.', 'Ambient light that eases sundowning.'],
          image: { src: `${dementiaAidBase}/pebble-render.jpg`, alt: 'Mem Pebble product render' },
          sectionId: 'memPebble',
        },
        {
          label: 'Anvika Button',
          points: ['A clothing button that makes door signage glow as the wearer approaches.'],
          image: { src: `${dementiaAidBase}/anvika-door.jpg`, alt: 'Door signage glowing as the Anvika Button approaches' },
          sectionId: 'anvikaButton',
        },
        {
          label: 'Prototype',
          points: ['3D-printed PLA pebble, 10.8 × 8.2 × 11.8 cm.', 'Two buttons and an evening light.'],
          image: { src: `${dementiaAidBase}/dev-pebble-render.jpg`, alt: 'Refined Mem Pebble prototype render' },
          sectionId: 'productDevelopment',
        },
      ],
    },
    sections: [
      {
        id: 'problemStatement',
        heading: 'Problem Statement',
        type: 'twoColumn',
        body: "Dementia is a decline in memory, mood, reasoning, and daily abilities — not a single disease. Alzheimer's disease is its leading cause, accounting for 60–70% of cases. With dementia in India projected to more than double by 2050, the current lack of compassionate, non-medical interventions leaves heightened distress for patients and an unsustainable burden on their family caregivers at home.",
        images: [
          {
            src: `${dementiaAidBase}/stats-chart.png`,
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
    slug: 'steam-deck-ergonomics',
    title: 'Steam Deck OLED',
    tagline:
      'A physical ergonomics redesign of Valve’s handheld — curved side grips, a deepened rear volume, semi-textured trackpads and a faceted disc D-pad, each argued from percentile hand data rather than styling preference.',
    role: 'Industrial Designer',
    year: '2026',
    coverImage: `${steamDeckBase}/cover.jpg`,
    tags: ['Industrial Design', 'Human Factors', 'Ergonomics'],
    featured: true,
    theme: 'technical',
    caseStudy: {
      facts: [
        { label: 'My role', value: 'Industrial Designer' },
        { label: 'Programme', value: 'M.Des Interaction Design, UPES' },
        { label: 'Guidance', value: 'Dr. Samrat Dev' },
        { label: 'Year', value: '2026' },
      ],
      blocks: [
        {
          kind: 'intro',
          eyebrow: 'The brief',
          statement: 'The Steam Deck is already excellent. So the task was to raise its comfort ceiling, not to fix something broken.',
          body: 'Long sessions still bring grip fatigue, thumb strain and palm pressure. Every change here is argued from hand data rather than styling preference, and fits inside the original body and controls.',
          stats: [
            { value: '298 × 117 mm', label: 'The original envelope, kept unchanged' },
            { value: '7', label: 'Issues found through sustained use' },
            { value: '4', label: 'Ergonomic refinements that survived into the final proposal' },
          ],
        },
        {
          kind: 'gallery',
          id: 'brief',
          eyebrow: 'The starting point',
          heading: 'A refined device with a comfort ceiling',
          body: 'A 7.4″ HDR OLED, dual trackpads, rear paddles and a controller-first form made it the benchmark for handheld PC gaming. The side walls are near-vertical and the grip volume is shallow, which is where the fatigue begins.',
          columns: 2,
          images: [
            { src: `${steamDeckBase}/original-front.jpg`, alt: 'The current Steam Deck OLED at an angle on a teal background', label: 'Current product', aspect: 'aspect-[16/10]', caption: 'Product photography: Valve Corporation.' },
            { src: `${steamDeckBase}/original-side.jpg`, alt: 'Low side view of the current Steam Deck with near-vertical side walls', label: 'Current profile', aspect: 'aspect-[16/10]', caption: 'The shallow side volume this proposal deepens.' },
          ],
        },
        {
          kind: 'feature',
          id: 'specification',
          eyebrow: 'Baseline',
          heading: 'The envelope every change had to stay inside',
          body: 'A teardown of the current product set the limits. The control inventory is left intact: this is a comfort proposal, not a feature proposal.',
          bullets: [
            '298 × 117 × 49 mm, about 640 g',
            'Glass-fibre reinforced ABS body with textured ABS grips',
            'Dual analog sticks, ABXY, D-pad, two capacitive trackpads, triggers and four rear paddles',
          ],
          image: { src: `${steamDeckBase}/spec-topology.jpg`, alt: 'Annotated front elevation drawing of the Steam Deck OLED labelling each control', label: 'Front elevation', aspect: 'aspect-[16/10]', fit: 'contain', caption: 'A 1:1 reference drawing keeps every control in its original position.' },
        },
        {
          kind: 'feature',
          id: 'anthropometry',
          eyebrow: 'Hand data',
          heading: 'Designed for every hand, not just mine',
          body: 'Percentile hand data was mapped onto the existing controls, from the 5th-percentile female hand (about 74 mm breadth) to the 95th-percentile male hand (about 96 mm). That keeps the proposal from being tuned to one person’s grip.',
          bullets: [
            'Grip cross-section held inside a 30–45 mm comfort band',
            'Side walls rotated 6° outward, within the 5–8° grip-angle target',
            'All primary controls kept inside the 5th-percentile thumb arc',
          ],
          image: { src: `${steamDeckBase}/anthro-zones.jpg`, alt: 'The Steam Deck overlaid with thumb sweep circles and palm pressure zones', label: 'Envelope overlay', aspect: 'aspect-[16/9]', caption: 'Blue: thumb sweep. Orange: palm contact and pressure zone.' },
          flip: true,
        },
        {
          kind: 'steps',
          id: 'observations',
          eyebrow: 'Observations',
          heading: 'Seven things the hands kept telling us',
          body: 'Found through sustained personal use and informal conversations with friends who play handhelds, then grouped into recurring pain points. This is first-hand and small-sample, so it is treated as a source of hypotheses to design against, not as validated research.',
          steps: [
            { title: 'Limited palm support', body: 'The rear grip supports little of the lower palm, so pressure concentrates on a small area.' },
            { title: 'Straight side grips', body: 'Near-straight walls resist the hand’s natural curve and force extra finger flexion.' },
            { title: 'Shallow rear grip', body: 'Little palm engagement lowers grip confidence, so users squeeze harder over long play.' },
            { title: 'Smooth trackpads', body: 'The pads give little guidance, so precise placement needs a look away from the game.' },
            { title: 'Cross D-pad', body: 'The raised cross invites thumb lifts, so diagonals and rolling inputs feel less fluid.' },
            { title: 'Asymmetric layout', body: 'The two sides are arranged differently, so the eye adapts to two layouts instead of one.' },
            { title: 'Cumulative fatigue', body: 'Discomfort rises with session length across grip posture, thumb travel and palm pressure.' },
          ],
        },
        {
          kind: 'gallery',
          id: 'ideation',
          eyebrow: 'Ideation',
          heading: 'From the benchmark to a resolved direction',
          body: 'Five directions were carried forward: baseline proportions, alternative silhouettes, rear-grip sections, pad and D-pad options, and the resolved form.',
          columns: 3,
          images: [
            { src: `${steamDeckBase}/ideation-01.jpg`, alt: 'Pencil sketch tracing the current Steam Deck proportions', caption: 'Baseline proportions traced from the existing product.', aspect: 'aspect-[4/5]' },
            { src: `${steamDeckBase}/ideation-02.jpg`, alt: 'Pencil sketches of three alternative handheld silhouettes', caption: 'Wide-grip, wing-grip and slim-slab silhouettes.', aspect: 'aspect-[4/5]' },
            { src: `${steamDeckBase}/ideation-03.jpg`, alt: 'Pencil sketches of rear grip section studies', caption: 'Section studies of the rear volume and palm bulge.', aspect: 'aspect-[4/5]' },
            { src: `${steamDeckBase}/ideation-04.jpg`, alt: 'Pencil sketches of trackpad and D-pad options', caption: 'Raised, textured and concave pads; cross, disc and faceted D-pads.', aspect: 'aspect-[4/5]' },
            { src: `${steamDeckBase}/ideation-05.jpg`, alt: 'Rendered front and rear views of the resolved redesign', caption: 'The resolved direction.', aspect: 'aspect-[4/5]' },
          ],
        },
        {
          kind: 'gallery',
          id: 'grips',
          eyebrow: 'Refinement 01',
          heading: 'Curved side grips',
          body: 'A C-shaped side profile, rotated about 6° outward and 5 mm deeper, adds roughly 10–12% palm contact area. It follows the hand’s resting posture, and stays subtle enough to remain a single-draw injection-molded part.',
          columns: 2,
          images: [
            { src: `${steamDeckBase}/grips-before-front.jpg`, alt: 'The current white Steam Deck from the front at an angle', label: 'Before', aspect: 'aspect-[16/9]' },
            { src: `${steamDeckBase}/grips-after.jpg`, alt: 'The redesigned dark Steam Deck annotated with a 6 degree outward wall rotation and 5 mm grip depth increase', label: 'After', aspect: 'aspect-[16/9]' },
          ],
        },
        {
          kind: 'gallery',
          id: 'rearGrip',
          eyebrow: 'Refinement 02',
          heading: 'A deeper rear grip',
          body: 'Rear volume is up 8 mm and the palm bulge drops 10 mm, with a roughly 20 mm blend into the trigger shelf. Load moves off the fingertips and onto the pad of muscle at the base of the palm, which is built to carry it.',
          columns: 2,
          images: [
            { src: `${steamDeckBase}/rear-before.jpg`, alt: 'Close side view of the current rear grip volume', label: 'Before', aspect: 'aspect-[4/3]' },
            { src: `${steamDeckBase}/rear-after.jpg`, alt: 'Close side view of the revised, deeper rear grip volume', label: 'After', aspect: 'aspect-[4/3]' },
          ],
        },
        {
          kind: 'gallery',
          id: 'trackpads',
          eyebrow: 'Refinement 03',
          heading: 'Semi-textured trackpads',
          body: 'A shallow micro-dot field, 1.2 mm pitch and 0.3 mm high, gives the finger tactile guidance without disturbing capacitive sensing. It also holds up better with damp or warm hands.',
          columns: 2,
          images: [
            { src: `${steamDeckBase}/pad-before.jpg`, alt: 'Macro photograph of the current smooth gloss trackpad', label: 'Before', aspect: 'aspect-square' },
            { src: `${steamDeckBase}/pad-after.jpg`, alt: 'Macro render of the proposed micro-dot textured trackpad', label: 'After', aspect: 'aspect-square' },
          ],
        },
        {
          kind: 'gallery',
          id: 'dpad',
          eyebrow: 'Refinement 04',
          heading: 'A faceted disc D-pad',
          body: 'The raised cross becomes a low-profile disc about 27–30 mm across, with eight faceted directions. The thumb rolls from one direction to the next without lifting, so diagonals are easier and registration is more reliable.',
          columns: 2,
          images: [
            { src: `${steamDeckBase}/dpad-before.jpg`, alt: 'Macro photograph of the current raised cross-shaped D-pad', label: 'Before', aspect: 'aspect-[4/3]' },
            { src: `${steamDeckBase}/dpad-after.jpg`, alt: 'Macro render of the proposed faceted disc D-pad', label: 'After', aspect: 'aspect-[4/3]' },
          ],
        },
        {
          kind: 'gallery',
          id: 'layout',
          eyebrow: 'Layout',
          heading: 'A symmetrical control layout',
          body: 'The goal is still physical: thumb reach and comfort. Mirroring the two sides also puts both sticks on one shared axis with secondary inputs beneath, so each side teaches the other and the eye searches less.',
          columns: 2,
          images: [
            { src: `${steamDeckBase}/layout-current.jpg`, alt: 'Diagram of the current, unmirrored control layout', label: 'Current', aspect: 'aspect-[16/11]', fit: 'contain' },
            { src: `${steamDeckBase}/layout-redesigned.jpg`, alt: 'Diagram of the redesigned, mirrored control layout', label: 'Redesigned', aspect: 'aspect-[16/11]', fit: 'contain' },
          ],
        },
        {
          kind: 'feature',
          id: 'finalRendition',
          eyebrow: 'The outcome',
          heading: 'Same device. Held better.',
          body: 'Refined, balanced and built for extended play. Every change sits inside the original 298 × 117 mm envelope and the original control inventory.',
          bullets: [
            'Improved grip curves and more balanced weight distribution',
            'A symmetrical layout for faster recognition',
            'Every change aimed at the fatigue curve, not the spec sheet',
          ],
          image: { src: `${steamDeckBase}/final-angled.jpg`, alt: 'Three-quarter view render of the redesigned Steam Deck', aspect: 'aspect-[16/10]', fit: 'contain' },
        },
        {
          kind: 'gallery',
          eyebrow: 'Final rendition',
          heading: 'Front and rear',
          columns: 2,
          images: [
            { src: `${steamDeckBase}/final-front.jpg`, alt: 'Front view render of the redesigned Steam Deck', label: 'Front', aspect: 'aspect-[16/9]', fit: 'contain' },
            { src: `${steamDeckBase}/final-rear.jpg`, alt: 'Rear view render of the redesigned Steam Deck showing the rear paddles', label: 'Rear', aspect: 'aspect-[16/9]', fit: 'contain' },
          ],
        },
        {
          kind: 'gallery',
          eyebrow: 'In the hand',
          heading: 'The test that matters',
          body: 'The redesigned body held two-handed, in the seated and reclined postures the hand data was drawn from.',
          columns: 3,
          images: [
            { src: `${steamDeckBase}/hand-01.jpg`, alt: 'A person holding the redesigned Steam Deck two-handed while playing an action game', aspect: 'aspect-[16/10]' },
            { src: `${steamDeckBase}/hand-02.jpg`, alt: 'A person holding the redesigned Steam Deck while playing a driving game near a window', aspect: 'aspect-[16/10]' },
            { src: `${steamDeckBase}/hand-03.jpg`, alt: 'A person holding the redesigned Steam Deck in a dimly lit room', aspect: 'aspect-[16/10]' },
          ],
        },
        {
          kind: 'closing',
          eyebrow: 'In short',
          heading: 'A better hold, not a bigger spec sheet.',
          body: 'Curved grips, a deeper back, a textured pad and a disc D-pad, each argued from hand data, all inside the body Valve already made.',
        },
      ],
    },
    story: [
      {
        act: 'The brief',
        line: 'The Steam Deck is already excellent.',
        aside: 'Which made it the hardest kind of brief: nothing broken to fix — only a comfort ceiling to raise.',
        image: { src: `${steamDeckBase}/original-front.jpg`, alt: 'The current Steam Deck OLED' },
      },
      {
        act: 'The tension',
        line: 'After a long session, the hands start to complain.',
        aside: 'Grip fatigue. Thumb strain. Pressure in the palm.',
      },
      {
        act: 'The principle',
        line: 'Design for every hand — not just mine.',
        aside: 'From the smallest to the largest hands that will hold it.',
        image: { src: `${steamDeckBase}/hand-01.jpg`, alt: 'The redesigned handheld held two-handed' },
      },
      {
        act: 'The idea',
        line: 'Let the device follow the hand’s own curve.',
        aside: 'Grips that curve outward, a deeper back for the palm, a D-pad the thumb can roll across.',
        image: { src: `${steamDeckBase}/grips-after.jpg`, alt: 'The redesigned curved side grips' },
      },
      {
        act: 'The outcome',
        line: 'Same device. Held better.',
        aside: 'Every change fits inside the original body and controls.',
        image: { src: `${steamDeckBase}/final-angled.jpg`, alt: 'Final rendition of the redesign', fit: 'contain' },
      },
    ],
    overview: {
      question: 'How might a benchmark handheld be held more comfortably, for longer?',
      branches: [
        {
          label: 'Brief',
          points: ['A refined device with a comfort ceiling.', 'Grip fatigue, thumb strain, palm pressure.'],
          image: { src: `${steamDeckBase}/original-front.jpg`, alt: 'The current Steam Deck OLED' },
          sectionId: 'brief',
        },
        {
          label: 'Hand data',
          points: ['Designed for the 5th-percentile female to 95th-percentile male hand.', 'Grip kept inside a 30–45 mm band.'],
          image: { src: `${steamDeckBase}/anthro-zones.jpg`, alt: 'Anthropometric grip zones on the device' },
          sectionId: 'anthropometry',
        },
        {
          label: 'Issues',
          points: ['7 issues found — from limited palm support to a cross D-pad that breaks thumb motion.'],
          sectionId: 'observations',
        },
        {
          label: 'Grip redesign',
          points: ['Curved side grips, ≈ 6° outward.', 'Rear grip deepened + 8 mm.'],
          image: { src: `${steamDeckBase}/grips-after.jpg`, alt: 'Redesigned curved side grips' },
          sectionId: 'grips',
        },
        {
          label: 'Controls',
          points: ['Micro-dot textured trackpads.', 'Faceted 8-way disc D-pad.'],
          image: { src: `${steamDeckBase}/dpad-after.jpg`, alt: 'Faceted disc D-pad' },
          sectionId: 'dpad',
        },
        {
          label: 'Outcome',
          points: ['Same 298 × 117 mm envelope and controls — held better.'],
          image: { src: `${steamDeckBase}/final-angled.jpg`, alt: 'Final rendition of the redesign', fit: 'contain' },
          sectionId: 'finalRendition',
        },
      ],
    },
    meta: [
      { label: 'Programme', value: 'M.Des Interaction Design, UPES' },
      { label: 'Guidance', value: 'Dr. Samrat Dev' },
    ],
    sections: [
      {
        id: 'brief',
        heading: 'The Brief',
        type: 'imageRow',
        wide: true,
        columns: 2,
        body: 'The Steam Deck OLED runs a desktop-class library on a 7.4″ HDR OLED panel. An open platform, dual trackpads, rear paddles and a genuinely controller-first form factor made it the benchmark for handheld PC gaming — this is already a well-resolved object. But prolonged sessions still introduce grip fatigue, thumb strain and palm pressure. A refined product with an unresolved comfort ceiling is exactly the kind of brief worth taking: there is no obvious flaw to fix, only a threshold to move.',
        images: [
          {
            src: `${steamDeckBase}/original-front.jpg`,
            alt: 'The current Steam Deck OLED photographed at an angle on a teal background, screen showing the Steam library',
            label: 'Current product',
            aspect: 'aspect-[16/10]',
            caption: 'Product photography: Valve Corporation.',
          },
          {
            src: `${steamDeckBase}/original-side.jpg`,
            alt: 'Low side view of the current Steam Deck OLED showing its near-vertical side walls and shallow grip volume',
            label: 'Current profile',
            aspect: 'aspect-[16/10]',
            caption: 'The shallow lateral volume this proposal sets out to deepen.',
          },
        ],
      },
      {
        id: 'specification',
        heading: 'Product Specification',
        type: 'specs',
        wide: true,
        columns: 1,
        body: 'A baseline teardown of the current product — the envelope every proposed change has to stay inside. The control inventory is deliberately left intact: dual analog sticks, an ABXY cluster, a D-pad, two capacitive trackpads, analog triggers, shoulder buttons and four rear paddles. This is a comfort proposal, not a feature proposal.',
        specGroups: [
          {
            title: 'Dimensions',
            items: [
              { label: 'Length', value: '298 mm' },
              { label: 'Height', value: '117 mm' },
              { label: 'Thickness', value: '49 mm' },
              { label: 'Weight', value: '≈640 g', note: 'OLED model' },
            ],
          },
          {
            title: 'Material system',
            items: [
              { label: 'Body', value: 'GF-ABS', note: 'Glass-fibre reinforced' },
              { label: 'Grips', value: 'Textured ABS' },
              { label: 'Trackpads', value: 'Capacitive', note: 'Etched surface' },
              { label: 'Sticks', value: 'Overmould', note: 'Rubber' },
              { label: 'Buttons', value: 'Moulded', note: 'Injection-moulded plastic' },
            ],
          },
          {
            title: 'System',
            items: [
              { label: 'Display', value: '7.4″ OLED', note: 'HDR, laminated glass' },
              { label: 'Speakers', value: 'Stereo' },
              { label: 'Microphones', value: 'Dual' },
              { label: 'Port', value: 'USB-C' },
              { label: 'Cooling', value: 'Rear array' },
            ],
          },
        ],
        images: [
          {
            src: `${steamDeckBase}/spec-topology.jpg`,
            alt: 'Annotated front elevation line drawing of the Steam Deck OLED labelling the D-pad, select button, thumbsticks, microphones, touchscreen, ABXY cluster, trackpads, speakers, Steam button and quick-access button',
            label: 'Front elevation · control topology',
            aspect: 'aspect-[16/10]',
            fit: 'contain',
            caption: '1:1 reference drawing used to hold every control inside its original position.',
          },
        ],
      },
      {
        id: 'anthropometry',
        heading: 'Anthropometric Basis',
        type: 'specs',
        wide: true,
        columns: 1,
        body: 'Percentile hand data for two-handed handheld devices, mapped onto the existing control envelope. Designing to the 5th-percentile female hand at one end and the 95th-percentile male hand at the other is what keeps the proposal from being tuned to the designer’s own grip.',
        specGroups: [
          {
            title: 'Hand breadth',
            items: [
              { label: '5th %ile', value: '≈74 mm', note: 'Female' },
              { label: '50th %ile', value: '≈84 mm' },
              { label: '95th %ile', value: '≈96 mm', note: 'Male' },
            ],
          },
          {
            title: 'Grip & reach',
            items: [
              { label: 'Palm breadth', value: '80–95 mm', note: 'Across metacarpals' },
              { label: 'Grip diameter', value: '30–45 mm', note: 'Comfortable power grip' },
              { label: 'Thumb reach', value: '55–75 mm', note: 'Seated, two-handed' },
            ],
          },
          {
            title: 'Posture targets',
            items: [
              { label: 'Grip angle', value: '5°–8°', note: 'Recommended' },
              { label: 'Wrist extension', value: '0°–15°', note: 'Comfortable range' },
              { label: 'Forearm', value: 'Neutral', note: 'Target posture' },
            ],
          },
        ],
        images: [
          {
            src: `${steamDeckBase}/anthro-zones.jpg`,
            alt: 'The Steam Deck OLED overlaid with dashed blue circles marking the primary thumb sweep around each stick cluster and orange ellipses marking the palm contact and pressure zones at each grip',
            label: 'Envelope overlay',
            aspect: 'aspect-[16/9]',
            caption:
              'Blue: primary thumb sweep, 55–75 mm. Orange: palm contact and pressure zone. Dashed datum: neutral wrist, 0–15°.',
          },
        ],
        bulletsHeading: 'Applied to the redesign',
        bullets: [
          'Grip cross-section held inside the 30–45 mm comfort band.',
          'Side walls rotated 6° outward to sit within the 5–8° grip-angle target.',
          'Rear volume deepened so load transfers to the hypothenar eminence rather than the fingertips.',
          'All primary controls kept inside the 5th-percentile thumb arc.',
        ],
      },
      {
        id: 'observations',
        heading: 'Observations & Issue Identification',
        type: 'observations',
        wide: true,
        note: 'Identified through sustained personal use of the Steam Deck OLED and informal discussions with friends who regularly use handheld devices, then consolidated into recurring pain points. This is first-hand and small-sample — treated as a source of hypotheses to design against, not as validated research.',
        observations: [
          {
            title: 'Limited palm support in long sessions',
            body: 'The rear grip supports little of the lower palm, concentrating pressure on a small area and driving fatigue.',
          },
          {
            title: 'Straight side grips fight hand posture',
            body: 'Near-straight walls resist the hand’s natural curve, forcing extra finger flexion just to hold the device securely.',
          },
          {
            title: 'Shallow rear grip cuts stability',
            body: 'Little palm engagement lowers grip confidence, so users compensate by squeezing harder over long play.',
          },
          {
            title: 'Smooth trackpads lack tactile feedback',
            body: 'The capacitive pads give minimal guidance, so precise placement needs a visual check away from the game.',
          },
          {
            title: 'Cross D-pad breaks thumb motion',
            body: 'The raised cross invites repeated thumb lifts, so diagonals and rolling inputs feel less fluid than they should.',
          },
          {
            title: 'Asymmetric layout raises visual search',
            body: 'The right stick sits below ABXY while the left sits above the D-pad — the two sides differ, so the eye adapts to two layouts.',
          },
          {
            title: 'Cumulative hand fatigue over time',
            body: 'Use and feedback showed discomfort rising with session length, compounding across grip posture, thumb travel and palm pressure.',
          },
        ],
        bulletsHeading: 'These pain points define the redesign brief',
        bullets: [
          'Curved side grips',
          'Deepened rear grip',
          'Semi-textured trackpads',
          'Faceted disc D-pad',
          'Symmetric control layout',
        ],
      },
      {
        id: 'ideation',
        heading: 'Design Exploration',
        type: 'imageRow',
        wide: true,
        columns: 5,
        body: 'Benchmark, early concepts, form iteration, control iteration, resolved direction. Five directions were carried forward; four ergonomic refinements survived into the final proposal.',
        images: [
          {
            src: `${steamDeckBase}/ideation-01.jpg`,
            alt: 'Pencil sketch tracing the current Steam Deck proportions, annotated “Current Steamdeck”',
            label: 'ID 01',
            aspect: 'aspect-[4/5]',
            caption: 'Baseline proportions traced from the existing product to establish the control envelope.',
          },
          {
            src: `${steamDeckBase}/ideation-02.jpg`,
            alt: 'Pencil sketches of three alternative handheld body silhouettes',
            label: 'ID 02',
            aspect: 'aspect-[4/5]',
            caption: 'Wide-grip, wing-grip and slim-slab silhouettes tested against a two-handed hold.',
          },
          {
            src: `${steamDeckBase}/ideation-03.jpg`,
            alt: 'Pencil sketches headed “Rear Grip ideations” showing section studies through the rear grip volume',
            label: 'ID 03',
            aspect: 'aspect-[4/5]',
            caption: 'Section studies of rear volume, palm bulge and the transition into the trigger shelf.',
          },
          {
            src: `${steamDeckBase}/ideation-04.jpg`,
            alt: 'Pencil sketches of raised, textured and concave trackpad options alongside cross, disc and disc-diagonal directional pads',
            label: 'ID 04',
            aspect: 'aspect-[4/5]',
            caption: 'Raised, textured and concave pads; cross, disc and disc-diagonal directional pads.',
          },
          {
            src: `${steamDeckBase}/ideation-05.jpg`,
            alt: 'Rendered front and rear views of the resolved dark grey Steam Deck redesign',
            label: 'ID 05',
            aspect: 'aspect-[4/5]',
            caption: 'Curved side grips, deepened rear volume, semi-textured pads and a faceted disc D-pad.',
          },
        ],
      },
      {
        id: 'grips',
        heading: 'Improvement A · Curved Side Grips',
        type: 'beforeAfter',
        wide: true,
        body: 'A C-shaped side profile, rotated gently outward and deepened through the palm, borrowed from full-size ergonomic controllers — and kept subtle enough to remain a single-draw injection-moulded part, so the change costs nothing in tooling complexity.',
        images: [
          {
            src: `${steamDeckBase}/grips-before-front.jpg`,
            alt: 'The current white Steam Deck OLED viewed from the front at an angle',
            label: 'Before · current product',
            aspect: 'aspect-[16/9]',
          },
          {
            src: `${steamDeckBase}/grips-after.jpg`,
            alt: 'Render of the redesigned dark Steam Deck annotated with a 6 degree outward wall rotation and a 5 millimetre grip depth increase',
            label: 'After · proposed profile',
            aspect: 'aspect-[16/9]',
          },
        ],
        extras: [
          {
            src: `${steamDeckBase}/grips-before-side.jpg`,
            alt: 'Low side view of the current Steam Deck showing near-vertical side walls',
            label: 'Before · side profile',
            aspect: 'aspect-[16/9]',
            caption: 'Near-vertical side walls, shallow lateral volume.',
          },
        ],
        metrics: [
          { value: '≈ 6°', label: 'Outward curvature' },
          { value: '+ 5 mm', label: 'Grip depth increase' },
          { value: '+ 10–12 %', label: 'Palm contact area' },
        ],
        bulletsHeading: 'Design rationale',
        bullets: [
          'Follows the natural resting posture of the hand.',
          'Improves grip stability and lateral retention.',
          'Reduces finger flexion during long holds.',
          'Lowers cumulative fatigue in extended sessions.',
        ],
      },
      {
        id: 'rearGrip',
        heading: 'Improvement B · Deepened Rear Grip',
        type: 'beforeAfter',
        wide: true,
        body: 'Rear volume increased and the palm bulge lowered, so load transfers off the fingertips and onto the hypothenar eminence — the pad of muscle at the base of the palm that is built to carry it.',
        images: [
          {
            src: `${steamDeckBase}/rear-before.jpg`,
            alt: 'Close side view of the current rear grip volume with red dashed lines marking its depth',
            label: 'Before · current rear volume',
            aspect: 'aspect-[4/3]',
          },
          {
            src: `${steamDeckBase}/rear-after.jpg`,
            alt: 'Close side view of the revised rear grip volume with green dashed lines marking the increased depth',
            label: 'After · revised rear volume',
            aspect: 'aspect-[4/3]',
          },
        ],
        extras: [
          {
            src: `${steamDeckBase}/rear-section-current.jpg`,
            alt: 'Ghosted section profile through the current rear grip',
            label: 'Section · current',
            aspect: 'aspect-[16/10]',
            fit: 'contain',
          },
          {
            src: `${steamDeckBase}/rear-section-proposed.jpg`,
            alt: 'Ghosted section profile through the proposed rear grip, showing a fuller lower volume',
            label: 'Section · proposed',
            aspect: 'aspect-[16/10]',
            fit: 'contain',
          },
        ],
        metrics: [
          {
            value: '+ 8 mm',
            label: 'Rear grip depth',
            note: 'Measured at the deepest point of the rear volume.',
          },
          {
            value: '+ 10 mm',
            label: 'Lower palm bulge',
            note: 'Bulge dropped toward the base of the palm.',
          },
          {
            value: '≈ 20 mm',
            label: 'Transition radius',
            note: 'Blend from rear volume into the trigger shelf.',
          },
        ],
        bulletsHeading: 'Outcome',
        bullets: [
          'Fuller palm support along the rear face.',
          'Load spread across the hypothenar area.',
          'Less localised fatigue over long sessions.',
        ],
      },
      {
        id: 'trackpads',
        heading: 'Improvement C · Semi-Textured Trackpads',
        type: 'beforeAfter',
        wide: true,
        body: 'A shallow micro-dot field etched into the pad surface — tactile guidance without compromising capacitive sensing. The texture is deep enough for the finger to read a boundary and shallow enough that the sensing layer never notices it.',
        images: [
          {
            src: `${steamDeckBase}/pad-before.jpg`,
            alt: 'Macro photograph of the current smooth gloss trackpad',
            label: 'Before · smooth gloss pad',
            aspect: 'aspect-square',
          },
          {
            src: `${steamDeckBase}/pad-after.jpg`,
            alt: 'Macro render of the proposed trackpad covered in a fine micro-dot texture field',
            label: 'After · micro-dot field',
            aspect: 'aspect-square',
          },
        ],
        extras: [
          {
            src: `${steamDeckBase}/pad-microdot.jpg`,
            alt: 'Diagram of the micro-dot field magnified twenty times, dimensioned at 1.2 millimetre pitch',
            label: 'Surface detail · 20×',
            aspect: 'aspect-[5/4]',
            fit: 'contain',
          },
          {
            src: `${steamDeckBase}/pad-section.jpg`,
            alt: 'Section diagram through the pad surface dimensioning the micro-texture height at 0.3 millimetres',
            label: 'Section through pad',
            aspect: 'aspect-[7/3]',
            fit: 'contain',
          },
        ],
        metrics: [
          { value: '1.2 mm', label: 'Dot pitch' },
          { value: '0.3 mm', label: 'Micro-texture height' },
          {
            value: 'Unchanged',
            label: 'Capacitive sensing',
            note: 'Texture stays shallow enough not to interfere with the sensing layer.',
          },
        ],
        bulletsHeading: 'Why it performs better',
        bullets: [
          'The finger reads pad boundaries without looking down.',
          'Consistent micro-friction across the full pad area.',
          'Grip retained with damp or warm hands.',
          'Finer, more repeatable cursor and camera input.',
          'Texture reinforces the haptic pulse of the pad.',
        ],
      },
      {
        id: 'dpad',
        heading: 'Improvement D · Faceted Disc D-Pad',
        type: 'beforeAfter',
        wide: true,
        body: 'The cross D-pad replaced by a low-profile circular disc with a faceted directional surface, matching current Xbox practice. The pad is swept, not stepped: eight-way registration without a raised cross, so the thumb never has to lift and re-plant to change direction.',
        images: [
          {
            src: `${steamDeckBase}/dpad-before.jpg`,
            alt: 'Macro photograph of the current raised cross-shaped D-pad beside the left thumbstick',
            label: 'Before · raised cross D-pad',
            aspect: 'aspect-[4/3]',
          },
          {
            src: `${steamDeckBase}/dpad-after.jpg`,
            alt: 'Macro render of the proposed low-profile faceted disc D-pad beside the left thumbstick',
            label: 'After · faceted disc D-pad',
            aspect: 'aspect-[4/3]',
          },
        ],
        extras: [
          {
            src: `${steamDeckBase}/dpad-proposal.jpg`,
            alt: 'The faceted disc D-pad shown in place on the dark textured body of the final proposal',
            label: 'On the proposal',
            aspect: 'aspect-[4/3]',
            caption: 'The disc as it sits on the final body.',
          },
        ],
        metrics: [
          { value: '≈ 27–30 mm', label: 'Disc diameter' },
          { value: 'Low-profile', label: 'Disc height' },
          { value: '8-way', label: 'Faceted directional surface' },
        ],
        bulletsHeading: 'Why it performs better',
        bullets: [
          'Smoother thumb rolling across directions.',
          'Easier, more reliable diagonal input.',
          'Reduced thumb strain over long sessions.',
          'Improved directional accuracy and registration.',
          'More natural thumb articulation — no lift needed.',
          'Consistent with established controller convention.',
        ],
      },
      {
        id: 'layout',
        heading: 'Symmetrical Control Layout',
        type: 'imageRow',
        wide: true,
        columns: 2,
        body: 'The primary goal stays physical — thumb reach and comfort. But mirroring the two sides adds a secondary cognitive benefit: both analog sticks land on one shared axis with secondary inputs beneath, so each side teaches the other instead of asking the eye to learn two arrangements.',
        images: [
          {
            src: `${steamDeckBase}/layout-current.jpg`,
            alt: 'Diagram of the current control layout with the left joystick above the D-pad and the right joystick below the ABXY cluster, showing the two sides are not mirrored',
            label: 'Current layout',
            // contain, not cover: these are annotated diagrams whose callout
            // chips sit hard against the edges and get sliced by a crop.
            aspect: 'aspect-[16/11]',
            fit: 'contain',
            caption: 'Groups arranged differently — the two sides are not mirrored.',
          },
          {
            src: `${steamDeckBase}/layout-redesigned.jpg`,
            alt: 'Diagram of the redesigned control layout with both joysticks on a shared upper axis and the disc D-pad and ABXY cluster beneath them',
            label: 'Redesigned layout',
            aspect: 'aspect-[16/11]',
            fit: 'contain',
            caption: 'Both sticks on a shared axis, secondary inputs beneath.',
          },
        ],
        bulletsHeading: 'Human factors principle',
        bullets: [
          'Improved spatial compatibility — both sticks share one visual level, so there is a single mental model.',
          'Reduced visual search — predictable, grouped controls are located faster on each side.',
          'Better recognition — the mirrored layout identifies matching controls with less conscious effort.',
          'Improved hand–eye coordination — a consistent hierarchy speeds transitions between sticks and secondary inputs.',
        ],
      },
      {
        id: 'finalRendition',
        heading: 'Final Rendition',
        type: 'imageRow',
        wide: true,
        columns: 3,
        body: 'Refined, balanced and built for extended play. Every change is contained within the original 298 × 117 mm envelope and the original control inventory — the device is the same product, held better.',
        images: [
          {
            src: `${steamDeckBase}/final-front.jpg`,
            alt: 'Front view render of the redesigned dark Steam Deck with blue edge lighting, faceted disc D-pad and textured grips',
            label: 'Front',
            aspect: 'aspect-[16/9]',
            fit: 'contain',
          },
          {
            src: `${steamDeckBase}/final-angled.jpg`,
            alt: 'Three-quarter angled view render of the redesigned Steam Deck',
            label: 'Angled',
            aspect: 'aspect-[16/9]',
            fit: 'contain',
          },
          {
            src: `${steamDeckBase}/final-rear.jpg`,
            alt: 'Rear view render of the redesigned Steam Deck showing the L4, L5, R4 and R5 paddles, Valve wordmark and central ventilation',
            label: 'Rear',
            aspect: 'aspect-[16/9]',
            fit: 'contain',
          },
          {
            src: `${steamDeckBase}/final-top.jpg`,
            alt: 'Top edge view render of the redesigned Steam Deck showing the ventilation array, USB-C port and shoulder buttons',
            label: 'Top edge',
            aspect: 'aspect-[4/1]',
            fit: 'contain',
          },
          {
            src: `${steamDeckBase}/final-bottom.jpg`,
            alt: 'Bottom edge view render of the redesigned Steam Deck',
            label: 'Bottom edge',
            aspect: 'aspect-[4/1]',
            fit: 'contain',
          },
        ],
        bulletsHeading: 'What the proposal claims',
        bullets: [
          'Ergonomic comfort — improved grip curves and more balanced weight distribution.',
          'Intuitive control layout — symmetrical arrangement for faster recognition.',
          'Enhanced durability — reinforced build in the same material system.',
          'Designed for extended play — every change aimed at the fatigue curve, not the spec sheet.',
        ],
      },
      {
        id: 'inHand',
        heading: 'In the Hand',
        type: 'imageRow',
        wide: true,
        columns: 3,
        body: 'The test that matters: the redesigned body held two-handed, across the seated and reclined postures the anthropometric targets were drawn from.',
        images: [
          {
            src: `${steamDeckBase}/hand-01.jpg`,
            alt: 'A person holding the redesigned Steam Deck two-handed while playing an action game indoors',
            aspect: 'aspect-[16/10]',
          },
          {
            src: `${steamDeckBase}/hand-02.jpg`,
            alt: 'A person holding the redesigned Steam Deck two-handed while playing a driving game near a window',
            aspect: 'aspect-[16/10]',
          },
          {
            src: `${steamDeckBase}/hand-03.jpg`,
            alt: 'A person holding the redesigned Steam Deck two-handed in a dimly lit room while playing an action game',
            aspect: 'aspect-[16/10]',
          },
        ],
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

  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  // With only two case studies the wrap-around makes prev and next the same
  // project — offer it once, as "next", rather than twice in both directions.
  return prev.slug === next.slug ? { next } : { prev, next }
}
