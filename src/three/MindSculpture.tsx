import { useEffect, useMemo, useRef, type ComponentRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import * as THREE from 'three'
import { sceneConfig } from './sceneConfig'
import { ParticleField, PARTICLE_OPACITY } from './ParticleField'
import { sculptureHit } from './sculptureStore'
import { LogoMorph } from './LogoMorph'
import { Electrons } from './Electrons'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { SculptureMode } from '@/components/sculpture/SculptureStop'

type DistortMaterialInstance = ComponentRef<typeof MeshDistortMaterial>

const CORE_RADIUS = 1.4
const SHELL_SCALE = 1.35
/** The wire shell's diameter is what gets fitted to each stop's box. */
const SHELL_DIAMETER = 2 * CORE_RADIUS * SHELL_SCALE
const WIRE_OPACITY = 0.22
/** Per-frame easing toward the scroll target — soft follow without lag. */
const FOLLOW = 0.18

/**
 * The "swoosh": fading streaks left behind as the sculpture travels between
 * sections — one broad warm wake through the core, two fine lines off the rim.
 * Anchored to the travel group (outside Float) so idle bobbing leaves no trail;
 * a trail only has length while the sculpture is actually moving.
 */
const TRAILS = [
  { offset: [0, 0, 0], width: 0.24, opacity: 0.16, color: sceneConfig.colors.terracotta },
  { offset: [0, CORE_RADIUS * 0.9, 0], width: 0.07, opacity: 0.25, color: sceneConfig.colors.navySoft },
  { offset: [0, -CORE_RADIUS * 0.9, 0], width: 0.07, opacity: 0.25, color: sceneConfig.colors.navySoft },
] as const
/** Points of history per trail (~0.7s at 60fps); older points taper to nothing. */
const TRAIL_POINTS = 40
const taper = (t: number) => t * t * t

interface StopSample {
  x: number
  y: number
  size: number
  opacity: number
  particles: number
  form: number
  mode: SculptureMode
}

function readStop(el: HTMLElement): StopSample {
  const rect = el.getBoundingClientRect()
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
    size: Math.min(rect.width, rect.height),
    opacity: Number(el.dataset.opacity ?? 1),
    particles: Number(el.dataset.particles ?? 0),
    form: Number(el.dataset.form ?? 0),
    mode: (el.dataset.mode as SculptureMode | undefined) ?? 'none',
  }
}

/**
 * Where the sculpture belongs this frame, in viewport pixels. Between two
 * stops it rides with the first for the opening 20% of the scroll gap, glides
 * across the middle, then settles onto the next — so each section gets a
 * moment where the sculpture is clearly "its" own.
 */
function sampleStops(viewportHeight: number): StopSample | null {
  const elements = document.querySelectorAll<HTMLElement>('[data-sculpture-stop]')
  if (elements.length === 0) return null
  const stops = Array.from(elements, readStop)
  const mid = viewportHeight / 2
  // Scroll left before the page ends — a stop near the bottom may never reach
  // the viewport middle, so the reference line is lowered by the shortfall.
  const scrollLeft = document.documentElement.scrollHeight - (window.scrollY + viewportHeight)

  if (mid <= stops[0].y) return stops[0]
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i]
    const b = stops[i + 1]
    const line = mid + Math.max(0, b.y - mid - scrollLeft)
    if (line > b.y) continue
    const t = (line - a.y) / Math.max(b.y - a.y, 1)
    const e = THREE.MathUtils.smoothstep(t, 0.2, 0.8)
    const lerp = THREE.MathUtils.lerp
    return {
      x: lerp(a.x, b.x, e),
      y: lerp(a.y, b.y, e),
      size: lerp(a.size, b.size, e),
      opacity: lerp(a.opacity, b.opacity, e),
      particles: lerp(a.particles, b.particles, e),
      form: lerp(a.form, b.form, e),
      mode: e < 0.5 ? a.mode : b.mode,
    }
  }
  return stops[stops.length - 1]
}

export function MindSculpture() {
  const travelRef = useRef<THREE.Group>(null)
  const groupRef = useRef<THREE.Group>(null)
  const materialRef = useRef<DistortMaterialInstance>(null)
  const wireRef = useRef<THREE.Mesh>(null)
  const wireMaterialRef = useRef<THREE.MeshBasicMaterial>(null)
  const particleMaterialRef = useRef<THREE.PointsMaterial>(null)
  const placedRef = useRef(false)
  const splitRef = useRef(0)
  const formRef = useRef(0)
  const trails = useMemo(
    () =>
      TRAILS.map((trail) => ({
        offset: new THREE.Vector3(...trail.offset),
        points: new Float32Array(TRAIL_POINTS * 3),
        geometry: new MeshLineGeometry(),
        material: Object.assign(
          new MeshLineMaterial({
            lineWidth: trail.width,
            color: new THREE.Color(trail.color),
            opacity: trail.opacity,
            sizeAttenuation: 1,
            resolution: new THREE.Vector2(1, 1),
          }),
          { transparent: true, depthWrite: false },
        ),
      })),
    [],
  )
  const trailScratch = useMemo(() => new THREE.Vector3(), [])
  useEffect(
    () => () =>
      trails.forEach((trail) => {
        trail.geometry.dispose()
        trail.material.dispose()
      }),
    [trails],
  )
  const reducedMotion = useReducedMotion()

  useFrame((state, delta) => {
    const travel = travelRef.current
    const group = groupRef.current
    const wire = wireRef.current
    if (!travel || !group || !wire) return

    const { width, height } = state.size
    const target = sampleStops(height)
    if (!target) return
    formRef.current = target.form

    // Viewport pixels -> world units on the z=0 plane the sculpture sits in.
    const camera = state.camera as THREE.PerspectiveCamera
    const worldPerPx = (2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) / height
    const x = (target.x - width / 2) * worldPerPx
    const y = -(target.y - height / 2) * worldPerPx
    const scale = (target.size * worldPerPx) / SHELL_DIAMETER
    // Snap on the first frame so the sculpture doesn't fly in from the origin.
    const firstFrame = !placedRef.current
    const follow = firstFrame ? 1 : FOLLOW
    placedRef.current = true
    travel.position.x = THREE.MathUtils.lerp(travel.position.x, x, follow)
    travel.position.y = THREE.MathUtils.lerp(travel.position.y, y, follow)
    travel.scale.setScalar(THREE.MathUtils.lerp(travel.scale.x, scale, follow))

    // Contact finale: once the logo has formed, the core splits into
    // electrons that orbit it (see Electrons); the core itself shrinks away.
    const split = THREE.MathUtils.smoothstep(target.form, 0.55, 0.9)
    splitRef.current = split

    // Trails: push this frame's anchor position onto each history (newest last).
    // On the first frame the whole history starts collapsed at the sculpture.
    travel.updateMatrixWorld()
    for (const trail of trails) {
      trailScratch.copy(trail.offset).applyMatrix4(travel.matrixWorld)
      if (firstFrame) {
        for (let i = 0; i < TRAIL_POINTS; i++) trailScratch.toArray(trail.points, i * 3)
      } else {
        trail.points.copyWithin(0, 3)
        trailScratch.toArray(trail.points, (TRAIL_POINTS - 1) * 3)
      }
      trail.geometry.setPoints(trail.points, taper)
      trail.material.resolution.set(width, height)
    }

    // Publish the core's on-screen circle for DOM hit-testing (see SculptureCanvas).
    const pxPerWorld = 1 / worldPerPx
    sculptureHit.x = width / 2 + travel.position.x * pxPerWorld
    sculptureHit.y = height / 2 - travel.position.y * pxPerWorld
    sculptureHit.radius = CORE_RADIUS * travel.scale.x * group.scale.x * pxPerWorld
    sculptureHit.mode = target.opacity > 0.5 ? target.mode : 'none'
    const pressed = sculptureHit.pressed && sculptureHit.mode !== 'none'

    if (!reducedMotion) {
      group.rotation.y += delta * 0.12
      const targetTiltX = state.pointer.y * 0.35
      const targetTiltZ = -state.pointer.x * 0.25
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetTiltX, 0.05)
      group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, targetTiltZ, 0.05)
    }

    wire.rotation.y -= delta * 0.05
    wire.rotation.x += delta * 0.02

    const pressScale = (pressed ? 1.15 : 1) * (1 - split)
    group.scale.setScalar(THREE.MathUtils.lerp(group.scale.x, pressScale, 0.12))

    if (materialRef.current) {
      const distortTarget = reducedMotion ? 0.2 : pressed ? 0.85 : 0.35
      materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, distortTarget, 0.08)
      materialRef.current.opacity = target.opacity
    }
    // The wire fades less than the core, so a faded sculpture reads as a
    // light line drawing rather than a smudge.
    if (wireMaterialRef.current) {
      // …and dissolves entirely as it turns to dust for the logo.
      const intact = 1 - THREE.MathUtils.smoothstep(target.form, 0, 0.3)
      wireMaterialRef.current.opacity = WIRE_OPACITY * (0.4 + 0.6 * target.opacity) * intact
    }
    if (particleMaterialRef.current) {
      particleMaterialRef.current.opacity = PARTICLE_OPACITY * target.particles
    }
  })

  return (
    <>
    <group ref={travelRef}>
      <Float
        speed={reducedMotion ? 0 : 1.4}
        rotationIntensity={reducedMotion ? 0 : 0.25}
        floatIntensity={reducedMotion ? 0 : 0.6}
      >
        <group ref={groupRef}>
          <mesh>
            <icosahedronGeometry args={[CORE_RADIUS, 8]} />
            <MeshDistortMaterial
              ref={materialRef}
              color={sceneConfig.colors.terracottaGlow}
              emissive={sceneConfig.colors.emberCore}
              emissiveIntensity={0.55}
              distort={0.35}
              speed={2.2}
              roughness={0.28}
              metalness={0.05}
              transparent
            />
          </mesh>
          <mesh ref={wireRef} scale={SHELL_SCALE}>
            <icosahedronGeometry args={[CORE_RADIUS, 1]} />
            <meshBasicMaterial
              ref={wireMaterialRef}
              color={sceneConfig.colors.navy}
              wireframe
              transparent
              opacity={WIRE_OPACITY}
            />
          </mesh>
        </group>
        <Electrons splitRef={splitRef} travelRef={travelRef} />
        {/* Outside the spinning group, so the formed logo always faces the viewer. */}
        <LogoMorph
          formRef={formRef}
          groupRef={groupRef}
          wireRef={wireRef}
          travelRef={travelRef}
          shellRadius={CORE_RADIUS * SHELL_SCALE}
        />
      </Float>
      <ParticleField materialRef={particleMaterialRef} />
    </group>
      {/* World-space siblings of the sculpture, so the streaks stay where it has been. */}
      {!reducedMotion &&
        trails.map((trail, i) => (
          <mesh key={i} geometry={trail.geometry} material={trail.material} frustumCulled={false} />
        ))}
    </>
  )
}
