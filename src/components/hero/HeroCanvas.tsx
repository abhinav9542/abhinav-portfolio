import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import type { MotionValue } from 'framer-motion'
import { MindSculpture } from '@/three/MindSculpture'
import { ParticleField } from '@/three/ParticleField'
import { sceneConfig } from '@/three/sceneConfig'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { HeroFallback } from './HeroFallback'

interface HeroCanvasProps {
  scrollProgress: MotionValue<number>
}

export function HeroCanvas({ scrollProgress }: HeroCanvasProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div className="absolute inset-y-0 right-0 w-full md:w-[72%] lg:w-[60%]">
      <Suspense fallback={<HeroFallback />}>
        <Canvas
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
          <MindSculpture scrollProgress={scrollProgress} />
          <ParticleField />
        </Canvas>
      </Suspense>
    </div>
  )
}
