import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { MindSculpture } from '@/three/MindSculpture'
import { sceneConfig } from '@/three/sceneConfig'
import { sculptureHit, sculptureStore } from '@/three/sculptureStore'
import { useMediaQuery } from '@/hooks/useMediaQuery'

/**
 * Pointer input for the sculpture, hit-tested in the DOM against the circle
 * the scene publishes each frame. Listening on window means it works whatever
 * page element happens to sit under the pointer.
 */
function useSculpturePointer() {
  useEffect(() => {
    let hovering = false
    const setHover = (next: boolean) => {
      if (next === hovering) return
      hovering = next
      document.body.style.cursor = next ? 'pointer' : ''
    }

    const onMove = (event: PointerEvent) =>
      setHover(sculptureHit.mode === 'reveal' && sculptureHit.contains(event.clientX, event.clientY))
    const onDown = (event: PointerEvent) => {
      if (sculptureHit.mode !== 'none' && sculptureHit.contains(event.clientX, event.clientY)) {
        sculptureHit.pressed = true
      }
    }
    const onUp = () => {
      sculptureHit.pressed = false
    }
    const onDoubleClick = (event: MouseEvent) => {
      if (sculptureHit.mode === 'reveal' && sculptureHit.contains(event.clientX, event.clientY)) {
        sculptureStore.toggle()
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    window.addEventListener('pointercancel', onUp, { passive: true })
    window.addEventListener('dblclick', onDoubleClick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      window.removeEventListener('dblclick', onDoubleClick)
      setHover(false)
      sculptureHit.pressed = false
      sculptureHit.radius = 0
    }
  }, [])
}

/**
 * One full-viewport canvas for the whole home page, so the sculpture can
 * travel between sections. The canvas itself never takes pointer events, so
 * text and links underneath stay clickable; R3F reads the pointer from #root
 * only to drive the tilt.
 * z-[5]: above section content, below the hero copy (z-10) and nav (z-50).
 */
export function SculptureCanvas() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  useSculpturePointer()

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[5]">
      <Canvas
        eventSource={document.getElementById('root') ?? undefined}
        eventPrefix="client"
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{ alpha: true, antialias: !isMobile }}
        camera={{ fov: sceneConfig.camera.fov, position: sceneConfig.camera.position }}
      >
        <ambientLight intensity={1.1} color={sceneConfig.colors.cream} />
        {/* Warm key light lifts the terracotta out of the muddy range */}
        <directionalLight position={[3, 3, 5]} intensity={1.6} color="#ffe3cd" />
        <pointLight position={[4, 1, 3]} intensity={1.2} color={sceneConfig.colors.sand} />
        {/* Cool rim from behind-left for depth against the cream field */}
        <pointLight position={[-5, -1, -3]} intensity={1.6} color={sceneConfig.colors.rimBlue} />
        <MindSculpture />
      </Canvas>
    </div>
  )
}
