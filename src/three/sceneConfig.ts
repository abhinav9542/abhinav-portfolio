import { SITE_THEME } from '@/theme'

const palettes = {
  classic: {
    cream: '#faf6ee',
    terracotta: '#d2603a',
    terracottaGlow: '#e8794f',
    emberCore: '#5a2410',
    sand: '#e7cdab',
    navy: '#1a2440',
    navySoft: '#33415c',
    rimBlue: '#5d7bd4',
  },
  // Lines, logo and orbit rings go white like a drawing; the core stays a warm
  // orange so it pops off the cobalt field.
  blueprint: {
    cream: '#f4f6ff',
    terracotta: '#ff7a45',
    terracottaGlow: '#ff8a55',
    emberCore: '#6a2a10',
    sand: '#ffd166',
    navy: '#f4f6ff',
    navySoft: '#b9c6f5',
    rimBlue: '#8fb0ff',
  },
  // Two riso inks: a fluoro-pink core, and teal for every line (wire, dust,
  // rings, logo) — like a second pass through the printer.
  risograph: {
    cream: '#fff6ee',
    terracotta: '#ff4f8b',
    terracottaGlow: '#ff5a92',
    emberCore: '#7a1238',
    sand: '#ffd0dd',
    navy: '#00868a',
    navySoft: '#3fb0b0',
    rimBlue: '#00a6a6',
  },
  // A warm planet in cool starlight: orange core, pale periwinkle orbit lines
  // (wire, rings, logo) and near-white stardust.
  deepspace: {
    cream: '#eef0ff',
    terracotta: '#ff8a3d',
    terracottaGlow: '#ff8a3d',
    emberCore: '#6b2208',
    sand: '#ffb057',
    navy: '#c3caff',
    navySoft: '#dfe3ff',
    rimBlue: '#6b7bff',
  },
  // Soft pink core; deep teal for every line (wire, rings, logo) so the
  // drawing reads like the headings.
  pinktide: {
    cream: '#fff8f0',
    terracotta: '#e0578a',
    terracottaGlow: '#f06a98',
    emberCore: '#6e1636',
    sand: '#f6d3dc',
    navy: '#0f5f5f',
    navySoft: '#5aa9a3',
    rimBlue: '#2bb3a8',
  },
  // Cosmos: warm starlight lines and logo around the black hole; the
  // Contact electrons glow like embers thrown off the disk.
  cosmos: {
    cream: '#fff1e2',
    terracotta: '#ff7a2e',
    terracottaGlow: '#ff8a3d',
    emberCore: '#7a2400',
    sand: '#ffb070',
    navy: '#ffd9b8',
    navySoft: '#e8d6c8',
    rimBlue: '#ff9a55',
  },
  // Sunflower Fields: a gold core, light-grey linework and logo.
  sunflower: {
    cream: '#f4f4f0',
    terracotta: '#ffd100',
    terracottaGlow: '#ffd100',
    emberCore: '#5a4300',
    sand: '#ffee32',
    navy: '#d6d6d6',
    navySoft: '#9d9f9d',
    rimBlue: '#fff4a0',
  },
}

export const sceneConfig = {
  camera: {
    fov: 45,
    position: [0, 0, 6] as [number, number, number],
  },
  colors: palettes[SITE_THEME],
}
