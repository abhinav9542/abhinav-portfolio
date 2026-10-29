import { useMemo, useRef, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * The "Cosmos" theme's sculpture: a Schwarzschild black hole with a thin
 * accretion disk, seen nearly edge-on — modelled on NASA Goddard's 2019
 * visualisation (Jeremy Schnittman).
 *
 * Rendered by ray tracing in a fragment shader on one camera-facing plane.
 * Each pixel's light ray is traced backwards from a virtual camera and bent
 * by the black hole's gravity (the standard photon-orbit acceleration
 * a = -1.5·h²·r̂/r⁴ in units where the Schwarzschild radius is 1), until it
 * falls into the horizon or escapes. Wherever it crosses the disk plane it
 * picks up the disk's light. So the lensed arch over the top, the photon
 * ring underneath and their joins to the flat disk are not drawn — they are
 * the same disk, seen along curved paths, exactly as in the reference.
 *
 * Disk texture follows the NASA description: bright knots sheared into light
 * and dark lanes by differential (Keplerian) rotation, plus relativistic
 * Doppler beaming that brightens the approaching (left) side.
 */

// --- Physical setup, in Schwarzschild radii (rs = 1) -------------------------
const RS_INNER = 3 // innermost stable orbit
// Disk half-width ≈ 5.5× the shadow radius (2.6 rs), as in the reference.
const RS_OUTER = 14
const CAM_DIST = 34
/** Camera height above the disk plane, as an angle — nearly edgewise. */
const INCLINATION = 0.1

// --- Mapping to the sculpture's local space ---------------------------------
/** Local units per rs on the image plane through the black hole. */
const SCALE = 2.3 / RS_OUTER
const PLANE_W = 5.0
const PLANE_H = 3.4
/** In-plane roll: left end down, right end up (radians, counter-clockwise). */
const ROLL = 0.17

// Apparent sizes in local units, for the effects that hand off to the disk
// (spaghettified dust in LogoMorph, orbit rings in Electrons).
/** The shadow's apparent radius is ≈ 2.6 rs (√27/2). */
export const HORIZON = 2.6 * SCALE
export const DISK_INNER = RS_INNER * SCALE
export const DISK_OUTER = RS_OUTER * SCALE
export const DISK_TILT = INCLINATION
/** Radius of the photon ring — where the Contact orbit rings are born. */
export const PHOTON_RING = 2.65 * SCALE

/** Steps per ray. Fewer on small/mobile GPUs. */
const stepsFor = (isMobile: boolean) => (isMobile ? 90 : 150)

const vertex = /* glsl */ `
  varying vec2 vPos;
  void main() {
    vPos = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragment = (steps: number) => /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  uniform float uEnergy;
  uniform float uDisk;
  uniform float uPhoton;
  varying vec2 vPos;

  #define STEPS ${steps}
  const float R_IN = ${RS_INNER.toFixed(2)};
  const float R_OUT = ${RS_OUTER.toFixed(2)};
  const float CAM = ${CAM_DIST.toFixed(2)};
  const float INC = ${INCLINATION.toFixed(4)};
  const float SCALE = ${SCALE.toFixed(5)};
  const float ROLL = ${ROLL.toFixed(4)};

  // Sin-free hash: the classic sin() hash loses precision on many GPUs and
  // turns into per-pixel speckle.
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
  // Band-limited fbm: octaves finer than the pixel footprint ('fp', in
  // noise units) fade to their mean instead of aliasing into grain/flicker.
  float fbm(vec2 p, float fp) {
    float v = 0.0, a = 0.5, f = 1.0;
    for (int k = 0; k < 4; k++) {
      float keep = 1.0 - smoothstep(0.3, 0.75, fp * f);
      v += a * mix(0.5, noise(p), keep);
      p *= 2.07; f *= 2.07; a *= 0.5;
    }
    return v;
  }

  // Disk emission where the ray crosses the disk plane, at radius r, angle
  // phi, travelling along 'dir'. Returns rgb and density (in .a).
  // fpR: pixel footprint in disk radius (rs) at this hit.
  vec4 diskLight(float r, float phi, vec3 dir, float fpR) {
    float t = (r - R_IN) / (R_OUT - R_IN);
    if (t < 0.0 || t > 1.0) return vec4(0.0);

    // Keplerian shear: angular speed ∝ r^-1.5. Knots advected at their own
    // radius' speed are smeared along the orbit into lanes.
    float omega = 2.2 * pow(R_IN / r, 1.5) * (1.0 + uEnergy * 1.8);
    float a = phi + omega * uTime;
    vec2 o = vec2(cos(a), sin(a));
    float lanes = fbm(vec2(r * 7.5, 0.0) + o * 1.4, fpR * 7.5);
    float fine = fbm(vec2(r * 15.0, 3.1) + o * 0.9, fpR * 15.0);
    float knots = fbm(vec2(r * 2.2, 9.7) + o * 3.0, fpR * 2.2);
    float density = pow(clamp(lanes * 0.75 + fine * 0.55 + knots * 0.35 - 0.3, 0.0, 1.0), 1.1);

    // Hottest at the inner edge, fading outward; soft edges.
    float temp = pow(R_IN / r, 1.15);
    float edge = smoothstep(0.0, 0.03, t) * (1.0 - smoothstep(0.55, 1.0, t));

    // Doppler beaming: the side moving toward the camera is boosted.
    vec3 gasVel = normalize(vec3(-sin(phi), 0.0, cos(phi)));
    float beta = clamp(0.62 / sqrt(r), 0.0, 0.6);
    float approach = dot(gasVel, -dir);
    float doppler = pow(1.0 / (1.0 - beta * approach), 2.2) * (1.0 - beta * beta);

    float I = density * temp * edge * doppler * 5.5;
    // Deep red -> orange -> amber; the hottest knots stay orange, never white.
    vec3 col = mix(vec3(0.45, 0.03, 0.0), vec3(1.0, 0.2, 0.015), smoothstep(0.0, 0.6, I));
    col = mix(col, vec3(1.0, 0.42, 0.08), smoothstep(0.8, 1.8, I));
    return vec4(col * I, clamp(I * 0.8, 0.0, 0.92));
  }

  void main() {
    // Camera slightly above the disk plane (y up), looking at the hole.
    vec3 camPos = vec3(0.0, CAM * sin(INC), -CAM * cos(INC));
    vec3 fwd = normalize(-camPos);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);
    // This pixel's point on the image plane through the hole, in rs.
    // Undo the roll so the black hole is traced level, then shown tilted.
    float cr = cos(ROLL), sr = sin(ROLL);
    vec2 q = mat2(cr, -sr, sr, cr) * vPos / SCALE;
    vec3 dir = normalize(fwd * CAM + right * q.x + up * q.y);

    vec3 pos = camPos;
    vec3 h = cross(pos, dir);
    float h2 = dot(h, h);

    // Trace first, shade after. The ray only records where it crosses the
    // disk plane (up to 3 times: flat disk, lensed arch / ring, higher-order
    // image). Shading happens outside the loop, in uniform control flow, so
    // fwidth() can measure each image's true on-screen texture rate — the
    // lensed images are squashed by different amounts at every point.
    vec3 hit0 = vec3(0.0), hit1 = vec3(0.0), hit2 = vec3(0.0);
    vec3 dir0 = vec3(0.0, 0.0, 1.0), dir1 = dir0, dir2 = dir0;
    float under0 = 0.0, under1 = 0.0, under2 = 0.0;
    int crossings = 0;
    bool captured = false;

    for (int i = 0; i < STEPS; i++) {
      float r2 = dot(pos, pos);
      float r = sqrt(r2);
      if (r < 1.0) { captured = true; break; }
      // Big steps far away, small ones near the hole.
      float dt = clamp(0.09 * r, 0.03, 2.5);
      vec3 prev = pos;
      vec3 acc = -1.5 * h2 * pos / (r2 * r2 * r);
      dir += acc * dt;
      pos += dir * dt;

      if (prev.y * pos.y < 0.0) {
        vec3 hit = mix(prev, pos, prev.y / (prev.y - pos.y));
        // Ray crossing upward = light from the disk's underside (lower ring).
        float under = pos.y > prev.y ? 1.0 : 0.0;
        if (crossings == 0) { hit0 = hit; dir0 = normalize(dir); under0 = under; }
        else if (crossings == 1) { hit1 = hit; dir1 = normalize(dir); under1 = under; }
        else { hit2 = hit; dir2 = normalize(dir); under2 = under; }
        crossings++;
        if (crossings >= 3) break;
      }
      if (r > CAM * 1.3 && dot(pos, dir) > 0.0) break;
    }

    float rA = length(hit0.xz), rB = length(hit1.xz), rC = length(hit2.xz);
    // Footprint in disk radius per pixel. Where the image itself ends (a
    // neighbour hit a different surface) fwidth spikes; cap it there.
    float fpA = min(fwidth(rA), 0.6);
    float fpB = min(fwidth(rB), 0.6);
    float fpC = min(fwidth(rC), 0.6);

    vec3 col = vec3(0.0);
    float alpha = 0.0;
    if (crossings > 0) {
      vec4 d = diskLight(rA, atan(hit0.z, hit0.x), dir0, fpA) * mix(1.0, 0.6, under0);
      col += d.rgb * uDisk; alpha += d.a * uDisk;
    }
    if (crossings > 1) {
      vec4 d = diskLight(rB, atan(hit1.z, hit1.x), dir1, fpB) * mix(1.0, 0.6, under1);
      float w = 1.0 - alpha; col += w * d.rgb * uDisk; alpha += w * d.a * uDisk;
    }
    if (crossings > 2) {
      vec4 d = diskLight(rC, atan(hit2.z, hit2.x), dir2, fpC) * mix(1.0, 0.6, under2);
      float w = 1.0 - alpha; col += w * d.rgb * uDisk; alpha += w * d.a * uDisk;
    }

    // Fell into the hole: what's left of this pixel is pure black.
    if (captured) alpha = 1.0;

    // Faint photon-ring sheen just outside the shadow (multiply-orbited light).
    float ring = exp(-pow((length(q) - 2.63) / 0.05, 2.0)) * (1.0 - alpha);
    col += vec3(1.0, 0.45, 0.15) * ring * 0.35 * uPhoton;
    alpha = max(alpha, ring * 0.35 * uPhoton);

    // Gentle tone curve so dense lanes stay detailed instead of clipping.
    col = col / (1.0 + col * 0.35);
    float a = clamp(max(alpha, max(col.r, max(col.g, col.b))), 0.0, 1.0);
    gl_FragColor = vec4(col * uOpacity, a * uOpacity);
  }
`

interface BlackHoleProps {
  /** 0–1 visibility, written each frame by the sculpture (fades behind text). */
  fadeRef: RefObject<number>
  /** 0–1 "hold to blast" energy: the disk spins faster and brighter. */
  energyRef: RefObject<number>
  /** 0–1 Contact finale: the disk is drawn out into the logo as this rises. */
  formRef: RefObject<number>
  /** 0–1 Contact finale: the photon ring hands over to the orbit rings. */
  splitRef: RefObject<number>
  reducedMotion: boolean
}

export function BlackHole({ fadeRef, energyRef, formRef, splitRef, reducedMotion }: BlackHoleProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const material = useMemo(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    return new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment(stepsFor(isMobile)),
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 1 },
        uEnergy: { value: 0 },
        uDisk: { value: 1 },
        uPhoton: { value: 1 },
      },
      transparent: true,
      premultipliedAlpha: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    })
  }, [])

  useFrame((_, delta) => {
    const u = material.uniforms
    // The disk's matter is what gets spaghettified into the logo, so it thins
    // out as the finale runs — and spins up as it's torn away.
    const consumed = THREE.MathUtils.smoothstep(formRef.current ?? 0, 0.05, 0.6)
    if (!reducedMotion) u.uTime.value += delta * (1 + consumed * 2)
    u.uOpacity.value = fadeRef.current ?? 1
    u.uEnergy.value = energyRef.current ?? 0
    u.uDisk.value = 1 - consumed
    u.uPhoton.value = 1 - (splitRef.current ?? 0)

    // Always face the viewer squarely: undo the parent's pointer tilt so the
    // ray-traced view never skews.
    const mesh = meshRef.current
    if (mesh?.parent) mesh.parent.getWorldQuaternion(mesh.quaternion).invert()
  })

  return (
    <mesh ref={meshRef} material={material} renderOrder={4}>
      <planeGeometry args={[PLANE_W, PLANE_H]} />
    </mesh>
  )
}
