import { useRef, useState, type ComponentRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import type { MotionValue } from 'framer-motion'
import { sceneConfig } from './sceneConfig'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface MindSculptureProps {
  scrollProgress: MotionValue<number>
}

type DistortMaterialInstance = ComponentRef<typeof MeshDistortMaterial>

export function MindSculpture({ scrollProgress }: MindSculptureProps) {
  const groupRef = useRef<THREE.Group>(null)
  const materialRef = useRef<DistortMaterialInstance>(null)
  const wireRef = useRef<THREE.Mesh>(null)
  const [pressed, setPressed] = useState(false)
  const reducedMotion = useReducedMotion()

  useFrame((state, delta) => {
    const group = groupRef.current
    const wire = wireRef.current
    if (!group || !wire) return

    const progress = scrollProgress.get()

    if (!reducedMotion) {
      group.rotation.y += delta * 0.12
      const targetTiltX = state.pointer.y * 0.35
      const targetTiltZ = -state.pointer.x * 0.25
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetTiltX, 0.05)
      group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, targetTiltZ, 0.05)
    }

    wire.rotation.y -= delta * 0.05
    wire.rotation.x += delta * 0.02

    if (materialRef.current) {
      const settledDistort = Math.max(0.15, 0.35 - progress * 0.2)
      const distortTarget = reducedMotion ? 0.2 : pressed ? 0.85 : settledDistort
      materialRef.current.distort = THREE.MathUtils.lerp(
        materialRef.current.distort,
        distortTarget,
        0.08,
      )
    }

    const scaleTarget = (pressed ? 1.15 : 1) * (1 - progress * 0.45)
    const nextScale = THREE.MathUtils.lerp(group.scale.x, scaleTarget, 0.08)
    group.scale.setScalar(nextScale)

    group.position.y = THREE.MathUtils.lerp(group.position.y, -progress * 1.4, 0.08)
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      sceneConfig.camera.position[2] + progress * 2.5,
      0.08,
    )
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, progress * 0.8, 0.08)
    state.camera.lookAt(0, group.position.y * 0.3, 0)
  })

  return (
    <Float
      speed={reducedMotion ? 0 : 1.4}
      rotationIntensity={reducedMotion ? 0 : 0.25}
      floatIntensity={reducedMotion ? 0 : 0.6}
    >
      <group
        ref={groupRef}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
      >
        <mesh>
          <icosahedronGeometry args={[1.4, 8]} />
          <MeshDistortMaterial
            ref={materialRef}
            color={sceneConfig.colors.terracottaGlow}
            emissive={sceneConfig.colors.emberCore}
            emissiveIntensity={0.55}
            distort={0.35}
            speed={2.2}
            roughness={0.28}
            metalness={0.05}
          />
        </mesh>
        <mesh ref={wireRef} scale={1.35}>
          <icosahedronGeometry args={[1.4, 1]} />
          <meshBasicMaterial color={sceneConfig.colors.navy} wireframe transparent opacity={0.22} />
        </mesh>
      </group>
    </Float>
  )
}
