import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { sceneConfig } from './sceneConfig'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const COUNT = 140

/** Slowly drifting points orbiting the sculpture — adds depth without weight. */
export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const reducedMotion = useReducedMotion()

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      // Shell distribution around the sculpture (radius 2.2 – 3.6)
      const radius = 2.2 + Math.random() * 1.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = radius * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    const points = pointsRef.current
    if (!points || reducedMotion) return
    points.rotation.y += delta * 0.02
    points.rotation.x = THREE.MathUtils.lerp(points.rotation.x, state.pointer.y * 0.1, 0.02)
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={sceneConfig.colors.navySoft}
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  )
}
