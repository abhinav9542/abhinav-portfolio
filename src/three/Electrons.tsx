import { useMemo, useRef, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { sceneConfig } from './sceneConfig'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Contact finale: the core splits into small "electrons" that orbit the logo
 * on tilted rings, like the classic atom — the logo is the nucleus.
 * Units are the sculpture's local space (core radius 1.4, wire shell ≈ 1.9).
 */
const COUNT = 5
const CORE_RADIUS = 1.4
/** Final electron size as a fraction of the core. */
const ELECTRON_SCALE = 0.08
/** Tilt of every ring away from the screen plane; spread evenly around z. */
const RING_TILT = 0.68
const RING_OPACITY = 0.18
const RING_SEGMENTS = 96

const ORBITS = Array.from({ length: COUNT }, (_, i) => ({
  radius: 2.55 + (i % 3) * 0.12,
  speed: 0.9 + ((i * 7) % 5) * 0.14,
  phase: (i / COUNT) * Math.PI * 2,
  // 'ZYX': tilt the ring first, then spin it around the view axis — the
  // classic criss-crossing atom rosette.
  rotation: new THREE.Euler(RING_TILT, 0, (i / COUNT) * Math.PI, 'ZYX'),
}))

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

interface ElectronsProps {
  /** 0 = whole core, 1 = fully split into orbiting electrons. */
  splitRef: RefObject<number>
  /** The travel group (world offset + scale), for perspective compensation. */
  travelRef: RefObject<THREE.Group | null>
}

/**
 * The atom sits off the screen centre, so perspective would skew each tilted
 * ring (near side pushed outward, far side inward) and swing electrons across
 * the logo. Re-project a local point so it lands where an orthographic view
 * would put it — the ellipses then keep their designed minor axes exactly.
 */
function flatten(v: THREE.Vector3, tx: number, ty: number, s: number, camZ: number) {
  const k = v.z / camZ
  v.x = v.x * (1 - s * k) - tx * k
  v.y = v.y * (1 - s * k) - ty * k
  return v
}

export function Electrons({ splitRef, travelRef }: ElectronsProps) {
  const reducedMotion = useReducedMotion()
  const electronRefs = useRef<(THREE.Mesh | null)[]>([])
  const ringRefs = useRef<(THREE.LineLoop | null)[]>([])
  const anglesRef = useRef(ORBITS.map((orbit) => orbit.phase))

  const { ringGeometries, ringMaterial, quaternions } = useMemo(() => {
    return {
      // Rewritten every frame (radius, spread and perspective compensation).
      ringGeometries: ORBITS.map(() => {
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(new Float32Array(RING_SEGMENTS * 3), 3).setUsage(THREE.DynamicDrawUsage),
        )
        return geometry
      }),
      ringMaterial: new THREE.LineBasicMaterial({
        color: sceneConfig.colors.navy,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
      quaternions: ORBITS.map((orbit) => new THREE.Quaternion().setFromEuler(orbit.rotation)),
    }
  }, [])

  const scratch = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    const split = splitRef.current ?? 0
    const travel = travelRef.current
    const tx = travel?.position.x ?? 0
    const ty = travel?.position.y ?? 0
    const ts = travel?.scale.x ?? 1
    const camZ = state.camera.position.z
    const visible = split > 0.001
    const spread = easeOutCubic(split)
    ringMaterial.opacity = RING_OPACITY * THREE.MathUtils.smoothstep(split, 0.3, 1)

    ORBITS.forEach((orbit, i) => {
      if (!reducedMotion) anglesRef.current[i] += delta * orbit.speed * (0.3 + 0.7 * split)
      const angle = anglesRef.current[i]
      const radius = orbit.radius * spread

      const electron = electronRefs.current[i]
      if (electron) {
        electron.visible = visible
        // Pieces start large and overlapping (the core breaking apart), then
        // shrink to small electrons as they fly out to their rings.
        electron.scale.setScalar(THREE.MathUtils.lerp(0.5, ELECTRON_SCALE, spread))
        scratch.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0).applyQuaternion(quaternions[i])
        electron.position.copy(flatten(scratch, tx, ty, ts, camZ))
      }

      const ring = ringRefs.current[i]
      if (ring) {
        ring.visible = visible
        if (visible) {
          const attr = ringGeometries[i].attributes.position as THREE.BufferAttribute
          for (let k = 0; k < RING_SEGMENTS; k++) {
            const a = (k / RING_SEGMENTS) * Math.PI * 2
            scratch.set(Math.cos(a) * radius, Math.sin(a) * radius, 0).applyQuaternion(quaternions[i])
            flatten(scratch, tx, ty, ts, camZ)
            attr.setXYZ(k, scratch.x, scratch.y, scratch.z)
          }
          attr.needsUpdate = true
        }
      }
    })
  })

  return (
    <group>
      {ORBITS.map((_, i) => (
        <group key={i}>
          <lineLoop
            ref={(el) => {
              ringRefs.current[i] = el
            }}
            geometry={ringGeometries[i]}
            material={ringMaterial}
            frustumCulled={false}
            visible={false}
          />
          <mesh
            ref={(el) => {
              electronRefs.current[i] = el
            }}
            visible={false}
          >
            <sphereGeometry args={[CORE_RADIUS, 32, 32]} />
            <meshStandardMaterial
              color={sceneConfig.colors.terracottaGlow}
              emissive={sceneConfig.colors.emberCore}
              emissiveIntensity={0.55}
              roughness={0.28}
              metalness={0.05}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
