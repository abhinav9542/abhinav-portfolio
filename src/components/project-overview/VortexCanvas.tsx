import { useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * The gravity well's black hole: seen face-on, a black disc with filaments
 * of orange light spiralling inward around it — a whirlpool, as in the
 * reference art. One full-canvas fragment shader.
 *
 * The spiral pattern rotates rigidly while its texture streams inward along
 * the arms, so it never winds itself up over time.
 */
const vertex = /* glsl */ `
  void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`

const fragment = /* glsl */ `
  precision highp float;
  uniform vec2 uRes;      // drawing-buffer size (px)
  uniform vec2 uCenter;   // hole centre, 0..1 of the canvas (origin bottom-left)
  uniform float uR;       // hole radius, as a fraction of canvas height
  uniform float uTime;

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int k = 0; k < 4; k++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 p = (gl_FragCoord.xy - uCenter * uRes) / (uR * uRes.y);
    float r = length(p);
    float a = atan(p.y, p.x);
    float lr = log(max(r, 0.001));
    float t = uTime;

    // Logarithmic spiral coordinate, rotating slowly as a whole. A steeper
    // pitch near the hole makes the arms wrap tighter, like a whirlpool.
    float phi = a + 2.8 * lr - t * 0.12;
    vec2 ring = vec2(cos(phi), sin(phi));
    // Along-arm coordinate that streams inward over time.
    float flow = lr * 3.0 + t * 0.25;
    float n1 = fbm(ring * 1.7 + vec2(flow, 0.0));
    float n2 = fbm(ring * 3.3 + vec2(flow * 1.8, 4.2));
    // Thin filaments (integer frequencies keep the spiral seamless), torn
    // into strands that start and stop along each arm.
    float f1 = pow(0.5 + 0.5 * sin(phi * 17.0 + n1 * 9.0), 8.0);
    float f2 = pow(0.5 + 0.5 * sin(phi * 41.0 + n2 * 12.0), 10.0);
    float tear1 = smoothstep(0.32, 0.72, fbm(ring * 2.4 + vec2(flow * 2.2, 9.1)));
    float tear2 = smoothstep(0.35, 0.75, fbm(ring * 4.1 + vec2(flow * 3.1, 2.7)));
    float fil = f1 * tear1 * 1.1 + f2 * tear2 * 0.9 + n1 * 0.12;

    // Bright rim hugging the horizon, light falling away outward.
    float outside = smoothstep(0.985, 1.015, r);
    float env = outside * exp(-(r - 1.0) * 1.35);
    float rim = outside * exp(-pow((r - 1.06) / 0.07, 2.0)) * 1.4;
    // The strip of panels feeds in from the left: brighter streams there.
    float da = abs(atan(sin(a - 3.14159), cos(a - 3.14159)));
    float feed = exp(-pow(da / 0.9, 2.0)) * outside * exp(-(r - 1.0) * 0.7);

    float I = env * (0.15 + 1.1 * fil) + rim * (0.9 + 0.5 * n1) + feed * fil * 0.6;
    I *= 1.0 - smoothstep(2.4, 3.6, r);
    // Soft edges where the canvas ends, so it never shows a hard border.
    vec2 uv = gl_FragCoord.xy / uRes;
    I *= smoothstep(0.0, 0.18, uv.y) * smoothstep(0.0, 0.18, 1.0 - uv.y) * smoothstep(0.0, 0.08, uv.x);

    // Deep red -> orange -> gold at the hottest rim.
    vec3 col = mix(vec3(0.35, 0.03, 0.0), vec3(1.0, 0.33, 0.04), smoothstep(0.0, 0.5, I));
    col = mix(col, vec3(1.0, 0.72, 0.36), smoothstep(0.75, 1.5, I));
    col *= I;

    float hole = 1.0 - smoothstep(0.98, 1.0, r);
    float alpha = clamp(max(hole, max(col.r, max(col.g, col.b))), 0.0, 1.0);
    gl_FragColor = vec4(col * (1.0 - hole), alpha);
  }
`

interface VortexProps {
  /** Hole centre as a fraction of the canvas (x from left, y from top). */
  center: [number, number]
  /** Hole radius as a fraction of the canvas height. */
  radius: number
  paused: boolean
}

function Vortex({ center, radius, paused }: VortexProps) {
  const size = useThree((s) => s.size)
  const dpr = useThree((s) => s.viewport.dpr)
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          uRes: { value: new THREE.Vector2(1, 1) },
          uCenter: { value: new THREE.Vector2(0.5, 0.5) },
          uR: { value: 0.3 },
          uTime: { value: 0 },
        },
        transparent: true,
        premultipliedAlpha: true,
        depthTest: false,
        depthWrite: false,
      }),
    [],
  )

  useFrame((_, delta) => {
    const u = material.uniforms
    u.uRes.value.set(size.width * dpr, size.height * dpr)
    u.uCenter.value.set(center[0], 1 - center[1])
    u.uR.value = radius
    if (!paused) u.uTime.value += delta
  })

  return (
    <mesh material={material} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  )
}

export function VortexCanvas(props: VortexProps) {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: false }} style={{ pointerEvents: 'none' }}>
      <Vortex {...props} />
    </Canvas>
  )
}
