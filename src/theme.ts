/**
 * Site-wide colour theme. 'classic' is the original cream / terracotta /
 * navy; 'blueprint' is the cobalt engineering-drawing look; 'risograph' is a
 * two-ink printed-zine look (fluoro pink + teal on paper); 'deepspace' is a
 * near-black cosmos with a drifting starfield and an orange planet;
 * 'pinktide' is warm cream with deep-teal type and a pink sphere;
 * 'sunflower' is the Coolors "Sunflower Fields" palette — charcoal field,
 * light-grey type, gold and lemon accents. Switching this one value
 * re-themes the page (via a class on <html>, see globals.css) and the 3D
 * scene (see three/sceneConfig.ts). 'cosmos' builds on Deep space: a dim
 * Milky Way glow behind the stars, and a black hole in place of the orb.
 */
export type SiteTheme = 'classic' | 'blueprint' | 'risograph' | 'deepspace' | 'pinktide' | 'sunflower' | 'cosmos'

const DEFAULT_THEME: SiteTheme = 'cosmos'

/** VITE_THEME (set when starting the dev server) previews another theme side by side. */
const override = import.meta.env.VITE_THEME as SiteTheme | undefined

export const SITE_THEME: SiteTheme = override ?? DEFAULT_THEME

/** Classes put on <html>; a theme can layer on another (cosmos = deepspace + extras). */
export const THEME_CLASSES: Record<SiteTheme, string[]> = {
  classic: [],
  blueprint: ['theme-blueprint'],
  risograph: ['theme-risograph'],
  deepspace: ['theme-deepspace'],
  pinktide: ['theme-pinktide'],
  sunflower: ['theme-sunflower'],
  cosmos: ['theme-deepspace', 'theme-cosmos'],
}

/** Which 3D sculpture travels the page. */
export const SCULPTURE_STYLE: 'orb' | 'blackhole' = SITE_THEME === 'cosmos' ? 'blackhole' : 'orb'
