import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { sceneConfig } from './sceneConfig'

const COUNT = 1400
const LOGO_URL = '/brand/logo-mark.webp'
/** Logo half-width in world units (core radius is 1.4). */
const LOGO_SCALE = 0.95
/** Just in front of the core's surface, so the mark sits on the ball's face. */
const LOGO_Z = 1.7

/**
 * Samples the logo's dark strokes into COUNT points, normalised so the
 * longest side spans -1..1 (y up). Reading the real image keeps the mark
 * exact without hand-tracing it.
 */
async function sampleLogo(url: string, count: number): Promise<Float32Array> {
  const image = new Image()
  image.src = url
  await image.decode()
  const size = 240
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) throw new Error('no 2d context')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, size, size)
  ctx.drawImage(image, 0, 0, size, size)
  const { data } = ctx.getImageData(0, 0, size, size)

  const dark: number[] = []
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      if (data[i] + data[i + 1] + data[i + 2] < 384) dark.push(x, y)
    }
  }
  if (dark.length === 0) throw new Error('logo has no dark pixels')

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (let i = 0; i < dark.length; i += 2) {
    minX = Math.min(minX, dark[i]); maxX = Math.max(maxX, dark[i])
    minY = Math.min(minY, dark[i + 1]); maxY = Math.max(maxY, dark[i + 1])
  }
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  const half = Math.max(maxX - minX, maxY - minY) / 2 || 1

  const pixels = dark.length / 2
  const out = new Float32Array(count * 3)
  for (let k = 0; k < count; k++) {
    // Even spread over the stroke pixels (deterministic), with sub-pixel jitter.
    const p = Math.floor((k / count) * pixels) * 2
    out[k * 3] = (dark[p] - cx + Math.random() - 0.5) / half
    out[k * 3 + 1] = -(dark[p + 1] - cy + Math.random() - 0.5) / half
    out[k * 3 + 2] = 0
  }
  return out
}

/**
 * The same logo as a crisp texture: navy strokes with alpha taken from the
 * artwork's darkness (keeps its anti-aliased edges), cropped to the same
 * square the dust is normalised to, so the two line up exactly.
 */
async function buildLogoTexture(url: string, maxAnisotropy: number): Promise<THREE.CanvasTexture> {
  const image = new Image()
  image.src = url
  await image.decode()
  const w = image.naturalWidth
  const h = image.naturalHeight
  const src = document.createElement('canvas')
  src.width = w
  src.height = h
  const sctx = src.getContext('2d', { willReadFrequently: true })
  if (!sctx) throw new Error('no 2d context')
  sctx.fillStyle = '#fff'
  sctx.fillRect(0, 0, w, h)
  sctx.drawImage(image, 0, 0)
  const pixels = sctx.getImageData(0, 0, w, h)
  const d = pixels.data
  const navy = new THREE.Color(sceneConfig.colors.navy)
  const [r, g, b] = [navy.r, navy.g, navy.b].map((c) => Math.round(THREE.MathUtils.clamp(c, 0, 1) * 255))
  let minX = w, maxX = 0, minY = h, maxY = 0
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4
      const alpha = 255 - (d[i] + d[i + 1] + d[i + 2]) / 3
      d[i] = r
      d[i + 1] = g
      d[i + 2] = b
      d[i + 3] = alpha
      if (alpha > 127) {
        minX = Math.min(minX, x); maxX = Math.max(maxX, x)
        minY = Math.min(minY, y); maxY = Math.max(maxY, y)
      }
    }
  }
  sctx.putImageData(pixels, 0, 0)

  const side = Math.max(maxX - minX, maxY - minY)
  const out = document.createElement('canvas')
  out.width = 1024
  out.height = 1024
  const octx = out.getContext('2d')
  if (!octx) throw new Error('no 2d context')
  octx.drawImage(src, (minX + maxX - side) / 2, (minY + maxY - side) / 2, side, side, 0, 0, 1024, 1024)

  const texture = new THREE.CanvasTexture(out)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = maxAnisotropy
  return texture
}

/** Evenly spaced points along the edges of the wire shell's icosahedron. */
function sampleShellEdges(count: number, radius: number): Float32Array {
  const geometry = new THREE.IcosahedronGeometry(radius, 1)
  const pos = geometry.attributes.position
  const seen = new Set<string>()
  const edges: [THREE.Vector3, THREE.Vector3][] = []
  const key = (v: THREE.Vector3) => `${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`
  for (let i = 0; i < pos.count; i += 3) {
    const tri = [0, 1, 2].map((j) => new THREE.Vector3().fromBufferAttribute(pos, i + j))
    for (const [a, b] of [[0, 1], [1, 2], [2, 0]]) {
      const k = [key(tri[a]), key(tri[b])].sort().join('|')
      if (seen.has(k)) continue
      seen.add(k)
      edges.push([tri[a], tri[b]])
    }
  }
  geometry.dispose()

  const lengths = edges.map(([a, b]) => a.distanceTo(b))
  const total = lengths.reduce((sum, l) => sum + l, 0)
  const out = new Float32Array(count * 3)
  const v = new THREE.Vector3()
  let edge = 0
  let walked = 0
  for (let k = 0; k < count; k++) {
    const target = ((k + 0.5) / count) * total
    while (edge < edges.length - 1 && walked + lengths[edge] < target) walked += lengths[edge++]
    v.lerpVectors(edges[edge][0], edges[edge][1], (target - walked) / lengths[edge])
    v.toArray(out, k * 3)
  }
  return out
}

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

interface LogoMorphProps {
  /** 0 = intact wire shell, 1 = fully formed logo. Written by the sculpture each frame. */
  formRef: RefObject<number>
  /** The rotating core group and wire shell, so dust starts exactly where the wire was. */
  groupRef: RefObject<THREE.Group | null>
  wireRef: RefObject<THREE.Mesh | null>
  /** The travel group, for perspective compensation (see useFrame). */
  travelRef: RefObject<THREE.Group | null>
  shellRadius: number
}

/**
 * The wire shell's dissolve: as `form` rises the shell breaks into dust that
 * drifts outward, then settles onto the front of the core as the logo.
 * Scroll-driven, so scrolling back up reverses it.
 */
export function LogoMorph({ formRef, groupRef, wireRef, travelRef, shellRadius }: LogoMorphProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  const planeRef = useRef<THREE.Mesh>(null)
  const planeMaterialRef = useRef<THREE.MeshBasicMaterial>(null)
  const [logo, setLogo] = useState<Float32Array | null>(null)
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null)
  const maxAnisotropy = useThree((state) => state.gl.capabilities.getMaxAnisotropy())

  useEffect(() => {
    let alive = true
    let loaded: THREE.CanvasTexture | null = null
    sampleLogo(LOGO_URL, COUNT)
      .then((points) => alive && setLogo(points))
      .catch(() => {
        // Without the logo the shell simply stays intact.
      })
    buildLogoTexture(LOGO_URL, maxAnisotropy)
      .then((tex) => {
        loaded = tex
        if (alive) setTexture(tex)
        else tex.dispose()
      })
      .catch(() => {
        // The dust version still shows if the texture can't be built.
      })
    return () => {
      alive = false
      loaded?.dispose()
    }
  }, [maxAnisotropy])

  const data = useMemo(() => {
    const shell = sampleShellEdges(COUNT, shellRadius)
    const scatter = new Float32Array(COUNT * 3)
    const delay = new Float32Array(COUNT)
    const dir = new THREE.Vector3()
    for (let i = 0; i < COUNT; i++) {
      dir.randomDirection().multiplyScalar(0.3 + Math.random() * 0.9)
      dir.toArray(scatter, i * 3)
      delay[i] = Math.random() * 0.35
    }
    return { shell, scatter, delay, positions: new Float32Array(COUNT * 3) }
  }, [shellRadius])

  // The logo floats LOGO_Z in front of the core; off-centre, perspective would
  // push it outward from the ball. Shift it back so it projects onto the
  // ball's centre (local offset = -T·z / cameraZ, independent of scale).
  const logoOffset = (travel: THREE.Group, camZ: number) => ({
    ox: (-travel.position.x * LOGO_Z) / camZ,
    oy: (-travel.position.y * LOGO_Z) / camZ,
  })
  const placePlane = (plane: THREE.Mesh, state: { camera: THREE.Camera }) => {
    const travel = travelRef.current
    if (!travel) return
    const { ox, oy } = logoOffset(travel, state.camera.position.z)
    plane.position.set(ox, oy, LOGO_Z)
  }

  const scratch = useMemo(() => ({ v: new THREE.Vector3(), q: new THREE.Quaternion() }), [])

  useFrame((state) => {
    const points = pointsRef.current
    const material = materialRef.current
    const group = groupRef.current
    const wire = wireRef.current
    const travel = travelRef.current
    if (!points || !material || !group || !wire || !travel || !logo) return

    const form = formRef.current ?? 0
    // The dust carries the motion; once it has settled, the crisp texture
    // takes over so the finished mark is sharp rather than dotted.
    const crisp = texture ? THREE.MathUtils.smoothstep(form, 0.82, 0.97) : 0
    const plane = planeRef.current
    if (plane && planeMaterialRef.current) {
      plane.visible = crisp > 0.001
      planeMaterialRef.current.opacity = crisp
    }
    points.visible = form > 0.001 && crisp < 0.999
    if (!points.visible) {
      if (plane && form > 0.001) placePlane(plane, state)
      return
    }
    material.opacity = 0.9 * THREE.MathUtils.smoothstep(form, 0, 0.12) * (1 - crisp)
    // While dust is in flight it passes behind the ball; once the mark has
    // settled, draw it over the core so surface bumps can't nick the strokes.
    material.depthTest = form < 0.9

    // Dust starts on the wire as currently rotated and scaled.
    const { v, q } = scratch
    q.copy(group.quaternion).multiply(wire.quaternion)
    const s = group.scale.x
    const { shell, scatter, delay, positions } = data
    const { ox, oy } = logoOffset(travel, state.camera.position.z)
    if (plane) placePlane(plane, state)
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      const local = THREE.MathUtils.clamp((form - delay[i]) / 0.65, 0, 1)
      const e = easeInOutCubic(local)
      const lift = Math.sin(Math.PI * e)
      v.fromArray(shell, i3).applyQuaternion(q).multiplyScalar(s)
      positions[i3] = v.x * (1 - e) + (logo[i3] * LOGO_SCALE + ox) * e + scatter[i3] * lift
      positions[i3 + 1] = v.y * (1 - e) + (logo[i3 + 1] * LOGO_SCALE + oy) * e + scatter[i3 + 1] * lift
      positions[i3 + 2] = v.z * (1 - e) + LOGO_Z * e + scatter[i3 + 2] * lift
    }
    points.geometry.attributes.position.needsUpdate = true
  })

  return (
    <>
      {/* renderOrder: the core is also transparent and sits at the same depth, so
          without this three.js may draw it *after* the dust and paint over it. */}
      <points ref={pointsRef} frustumCulled={false} visible={false} renderOrder={10}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[data.positions, 3]}
          usage={THREE.DynamicDrawUsage}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color={sceneConfig.colors.navy}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0}
        depthWrite={false}
      />
    </points>
      {texture && (
        <mesh ref={planeRef} visible={false} renderOrder={11}>
          <planeGeometry args={[2 * LOGO_SCALE, 2 * LOGO_SCALE]} />
          <meshBasicMaterial
            ref={planeMaterialRef}
            map={texture}
            transparent
            opacity={0}
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}
    </>
  )
}
