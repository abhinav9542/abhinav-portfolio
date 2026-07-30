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
