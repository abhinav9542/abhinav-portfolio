import { useSyncExternalStore } from 'react'

/**
 * Whether the Work section's sculpture has been "opened" to show the case
 * studies. Lives outside React so the R3F scene (double-click on the mesh)
 * and the DOM (branches, cards, fallback button) share one source of truth.
 */
let revealed = false
const listeners = new Set<() => void>()

export const sculptureStore = {
  get: () => revealed,
  set(next: boolean) {
    if (next === revealed) return
    revealed = next
    listeners.forEach((listener) => listener())
  },
  toggle() {
    sculptureStore.set(!revealed)
  },
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}

/**
 * Where the sculpture's core currently sits on screen (viewport px), written
 * by the scene every frame. Pointer input is hit-tested against this in the
 * DOM rather than through R3F raycasting, so it works no matter which page
 * element is under the pointer.
 */
export const sculptureHit = {
  x: 0,
  y: 0,
  radius: 0,
  mode: 'none' as 'press' | 'reveal' | 'none',
  pressed: false,
  contains(clientX: number, clientY: number) {
    return this.radius > 0 && Math.hypot(clientX - this.x, clientY - this.y) <= this.radius
  },
}

export function useWorkRevealed(): boolean {
  return useSyncExternalStore(sculptureStore.subscribe, sculptureStore.get)
}
