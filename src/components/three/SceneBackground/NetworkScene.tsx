import { type RefObject, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { SceneQuality } from "@/components/three/SceneBackground/useSceneQuality";
import { createNodeTexture } from "@/components/three/SceneBackground/nodeTexture";

const ACCENT_COLOR = "#00c896";

type PolyhedronKind = "icosahedron" | "octahedron" | "tetrahedron";

const POLYHEDRA: {
  position: [number, number, number];
  geometry: PolyhedronKind;
  scale: number;
  speed: number;
}[] = [
  {
    position: [1.6, 0.5, -0.5],
    geometry: "icosahedron",
    scale: 0.55,
    speed: 0.09,
  },
  {
    position: [2.4, -0.7, -2.2],
    geometry: "octahedron",
    scale: 0.4,
    speed: 0.14,
  },
  {
    position: [0.6, 1.3, -1.6],
    geometry: "tetrahedron",
    scale: 0.35,
    speed: 0.2,
  },
  {
    position: [-1.4, -1.1, -3.4],
    geometry: "icosahedron",
    scale: 0.7,
    speed: 0.06,
  },
  {
    position: [1.1, -1.6, -4.2],
    geometry: "octahedron",
    scale: 0.5,
    speed: 0.11,
  },
];

function SpinningPolyhedron({
  position,
  geometry,
  scale,
  speed,
}: {
  position: [number, number, number];
  geometry: PolyhedronKind;
  scale: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * speed;
    meshRef.current.rotation.y += delta * speed * 0.6;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
      {geometry === "tetrahedron" && <tetrahedronGeometry args={[1, 0]} />}
      <meshBasicMaterial
        color={ACCENT_COLOR}
        wireframe
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

const NODE_COUNT_BY_QUALITY: Record<SceneQuality, number> = {
  full: 140,
  light: 60,
};

type Edge = [number, number];

function buildNetwork(nodeCount: number) {
  const basePositions = new Float32Array(nodeCount * 3);
  const points: THREE.Vector3[] = [];

  for (let i = 0; i < nodeCount; i++) {
    const x = THREE.MathUtils.randFloatSpread(7) + 1;
    const y = THREE.MathUtils.randFloatSpread(5);
    const z = THREE.MathUtils.randFloatSpread(9) - 2;
    basePositions[i * 3] = x;
    basePositions[i * 3 + 1] = y;
    basePositions[i * 3 + 2] = z;
    points.push(new THREE.Vector3(x, y, z));
  }

  const MAX_DISTANCE = 1.8;
  const NEIGHBORS_PER_NODE = 2;
  const edges: Edge[] = [];

  for (let i = 0; i < points.length; i++) {
    const nearest = points
      .map((point, index) => ({ index, distance: points[i].distanceTo(point) }))
      .filter((entry) => entry.index !== i && entry.distance < MAX_DISTANCE)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, NEIGHBORS_PER_NODE);

    for (const { index } of nearest) {
      edges.push([i, index]);
    }
  }

  return { basePositions, edges };
}

const BACKGROUND_COLOR = "#060a12";

const CAMERA_KEYFRAMES: {
  t: number;
  position: [number, number, number];
  fogDensity: number;
  opacity: number;
}[] = [
  { t: 0.0, position: [1.6, 0.2, 5.4], fogDensity: 0.045, opacity: 0.95 }, // Hero
  { t: 0.18, position: [0.3, 0.5, 7.4], fogDensity: 0.085, opacity: 0.3 }, // Skillsへ
  { t: 0.42, position: [-0.7, -0.3, 8.6], fogDensity: 0.105, opacity: 0.18 }, // Blog
  { t: 0.68, position: [0.7, -0.5, 8.2], fogDensity: 0.105, opacity: 0.18 }, // About
  { t: 1.0, position: [0, 0.1, 4.4], fogDensity: 0.05, opacity: 0.5 }, // Contact — 再収束
];

function sampleKeyframes(t: number) {
  const clamped = Math.min(1, Math.max(0, t));
  let start = CAMERA_KEYFRAMES[0];
  let end = CAMERA_KEYFRAMES[CAMERA_KEYFRAMES.length - 1];

  for (let i = 0; i < CAMERA_KEYFRAMES.length - 1; i++) {
    if (
      clamped >= CAMERA_KEYFRAMES[i].t &&
      clamped <= CAMERA_KEYFRAMES[i + 1].t
    ) {
      start = CAMERA_KEYFRAMES[i];
      end = CAMERA_KEYFRAMES[i + 1];
      break;
    }
  }

  const span = end.t - start.t;
  const localT = span > 0 ? (clamped - start.t) / span : 0;

  return {
    position: [
      THREE.MathUtils.lerp(start.position[0], end.position[0], localT),
      THREE.MathUtils.lerp(start.position[1], end.position[1], localT),
      THREE.MathUtils.lerp(start.position[2], end.position[2], localT),
    ] as [number, number, number],
    fogDensity: THREE.MathUtils.lerp(start.fogDensity, end.fogDensity, localT),
    opacity: THREE.MathUtils.lerp(start.opacity, end.opacity, localT),
  };
}

function Rig({
  basePositions,
  edges,
  nodeCount,
  pulseCount,
  groupRef,
  linesGeometryRef,
  pointsGeometryRef,
  pulsesGeometryRef,
  linesMaterialRef,
  pointsMaterialRef,
  pulsesMaterialRef,
  scrollProgressRef,
  pointerRef,
}: {
  basePositions: Float32Array;
  edges: Edge[];
  nodeCount: number;
  pulseCount: number;
  groupRef: RefObject<THREE.Group | null>;
  linesGeometryRef: RefObject<THREE.BufferGeometry | null>;
  pointsGeometryRef: RefObject<THREE.BufferGeometry | null>;
  pulsesGeometryRef: RefObject<THREE.BufferGeometry | null>;
  linesMaterialRef: RefObject<THREE.LineBasicMaterial | null>;
  pointsMaterialRef: RefObject<THREE.PointsMaterial | null>;
  pulsesMaterialRef: RefObject<THREE.PointsMaterial | null>;
  scrollProgressRef: RefObject<number>;
  pointerRef: RefObject<{ x: number; y: number; active: boolean }>;
}) {
  const { scene } = useThree();
  const parallax = useRef({ x: 0, y: 0 });

  const livePositions = useRef(new Float32Array(basePositions));
  const linePositions = useRef(new Float32Array(edges.length * 6));
  const pulses = useRef(createPulses(edges, pulseCount));
  const pulsePositions = useRef(new Float32Array(pulseCount * 3));

  const raycaster = useRef(new THREE.Raycaster());
  const groundPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const pointerNDC = useRef(new THREE.Vector2());
  const mouseWorld = useRef(new THREE.Vector3());
  const localMouse = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const { position, fogDensity, opacity } = sampleKeyframes(
      scrollProgressRef.current,
    );

    parallax.current.x = THREE.MathUtils.damp(
      parallax.current.x,
      pointerRef.current.x,
      3,
      delta,
    );
    parallax.current.y = THREE.MathUtils.damp(
      parallax.current.y,
      pointerRef.current.y,
      3,
      delta,
    );

    state.camera.position.set(
      position[0] + parallax.current.x * 0.3,
      position[1] - parallax.current.y * 0.2,
      position[2],
    );
    state.camera.lookAt(0, 0, 0);

    if (scene.fog instanceof THREE.FogExp2) {
      scene.fog.density = fogDensity;
    }

    if (pointerRef.current.active && groupRef.current) {
      pointerNDC.current.set(pointerRef.current.x, -pointerRef.current.y);
      raycaster.current.setFromCamera(pointerNDC.current, state.camera);
      const hit = raycaster.current.ray.intersectPlane(
        groundPlane.current,
        mouseWorld.current,
      );
      if (hit) {
        localMouse.current.copy(mouseWorld.current);
        groupRef.current.worldToLocal(localMouse.current);
      }
    }

    const live = livePositions.current;
    for (let i = 0; i < nodeCount; i++) {
      const bi = i * 3;
      let px = basePositions[bi];
      let py = basePositions[bi + 1];
      let pz = basePositions[bi + 2];

      if (pointerRef.current.active) {
        const dx = px - localMouse.current.x;
        const dy = py - localMouse.current.y;
        const dz = pz - localMouse.current.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < REPULSION_RADIUS && dist > 0.0001) {
          const falloff = 1 - dist / REPULSION_RADIUS;
          const push = (falloff * falloff * REPULSION_STRENGTH) / dist;
          px += dx * push;
          py += dy * push;
          pz += dz * push;
        }
      }
      live[bi] = px;
      live[bi + 1] = py;
      live[bi + 2] = pz;
    }

    const lines = linePositions.current;
    for (let e = 0; e < edges.length; e++) {
      const [a, b] = edges[e];
      const li = e * 6;
      lines[li] = live[a * 3];
      lines[li + 1] = live[a * 3 + 1];
      lines[li + 2] = live[a * 3 + 2];
      lines[li + 3] = live[b * 3];
      lines[li + 4] = live[b * 3 + 1];
      lines[li + 5] = live[b * 3 + 2];
    }

    // 接続線の上を流れる光のパルス。ループするたびに別の辺へ乗り換える
    const pulsePos = pulsePositions.current;
    for (let p = 0; p < pulses.current.length; p++) {
      const pulse = pulses.current[p];
      pulse.t += delta * pulse.speed;
      if (pulse.t > 1) {
        pulse.t -= 1;
        pulse.edge = randomEdge(edges);
      }
      const [a, b] = pulse.edge;
      const ai = a * 3;
      const bi2 = b * 3;
      const pi = p * 3;
      pulsePos[pi] = THREE.MathUtils.lerp(live[ai], live[bi2], pulse.t);
      pulsePos[pi + 1] = THREE.MathUtils.lerp(
        live[ai + 1],
        live[bi2 + 1],
        pulse.t,
      );
      pulsePos[pi + 2] = THREE.MathUtils.lerp(
        live[ai + 2],
        live[bi2 + 2],
        pulse.t,
      );
    }

    if (pointsGeometryRef.current) {
      const attr = pointsGeometryRef.current.attributes.position;
      (attr.array as Float32Array).set(live);
      attr.needsUpdate = true;
    }
    if (linesGeometryRef.current) {
      const attr = linesGeometryRef.current.attributes.position;
      (attr.array as Float32Array).set(lines);
      attr.needsUpdate = true;
    }
    if (pulsesGeometryRef.current) {
      const attr = pulsesGeometryRef.current.attributes.position;
      (attr.array as Float32Array).set(pulsePos);
      attr.needsUpdate = true;
    }

    if (linesMaterialRef.current)
      linesMaterialRef.current.opacity = opacity * 0.5;
    if (pointsMaterialRef.current) pointsMaterialRef.current.opacity = opacity;
    if (pulsesMaterialRef.current)
      pulsesMaterialRef.current.opacity = Math.min(1, opacity * 1.4);

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.025;
    }
  });

  return null;
}

export function NetworkScene({
  quality,
  scrollProgressRef,
  pointerRef,
}: {
  quality: SceneQuality;
  scrollProgressRef: RefObject<number>;
  pointerRef: RefObject<{ x: number; y: number; active: boolean }>;
}) {
  const nodeCount = NODE_COUNT_BY_QUALITY[quality];
  const pulseCount = PULSE_COUNT_BY_QUALITY[quality];
  const nodeTexture = useMemo(() => createNodeTexture(), []);
  const { basePositions, edges } = useMemo(
    () => buildNetwork(nodeCount),
    [nodeCount],
  );
  const linePositions = useMemo(() => {
    const array = new Float32Array(edges.length * 6);
    for (let e = 0; e < edges.length; e++) {
      const [a, b] = edges[e];
      array.set(
        [
          basePositions[a * 3],
          basePositions[a * 3 + 1],
          basePositions[a * 3 + 2],
        ],
        e * 6,
      );
      array.set(
        [
          basePositions[b * 3],
          basePositions[b * 3 + 1],
          basePositions[b * 3 + 2],
        ],
        e * 6 + 3,
      );
    }
    return array;
  }, [basePositions, edges]);
  const initialPulsePositions = useMemo(
    () => new Float32Array(pulseCount * 3),
    [pulseCount],
  );

  const groupRef = useRef<THREE.Group>(null);
  const linesGeometryRef = useRef<THREE.BufferGeometry>(null);
  const pointsGeometryRef = useRef<THREE.BufferGeometry>(null);
  const pulsesGeometryRef = useRef<THREE.BufferGeometry>(null);
  const linesMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  const pointsMaterialRef = useRef<THREE.PointsMaterial>(null);
  const pulsesMaterialRef = useRef<THREE.PointsMaterial>(null);

  return (
    <>
      <fogExp2 attach="fog" args={[BACKGROUND_COLOR, 0.06]} />

      <group ref={groupRef}>
        {POLYHEDRA.map((polyhedron, index) => (
          <SpinningPolyhedron key={index} {...polyhedron} />
        ))}

        <lineSegments>
          <bufferGeometry ref={linesGeometryRef}>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            ref={linesMaterialRef}
            color={ACCENT_COLOR}
            transparent
            opacity={0.3}
          />
        </lineSegments>

        <points>
          <bufferGeometry ref={pointsGeometryRef}>
            <bufferAttribute
              attach="attributes-position"
              args={[basePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            ref={pointsMaterialRef}
            map={nodeTexture}
            size={0.12}
            color={ACCENT_COLOR}
            transparent
            opacity={0.9}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        <points>
          <bufferGeometry ref={pulsesGeometryRef}>
            <bufferAttribute
              attach="attributes-position"
              args={[initialPulsePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            ref={pulsesMaterialRef}
            map={nodeTexture}
            size={0.22}
            color="#ffffff"
            transparent
            opacity={0.9}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      <Rig
        basePositions={basePositions}
        edges={edges}
        nodeCount={nodeCount}
        pulseCount={pulseCount}
        groupRef={groupRef}
        linesGeometryRef={linesGeometryRef}
        pointsGeometryRef={pointsGeometryRef}
        pulsesGeometryRef={pulsesGeometryRef}
        linesMaterialRef={linesMaterialRef}
        pointsMaterialRef={pointsMaterialRef}
        pulsesMaterialRef={pulsesMaterialRef}
        scrollProgressRef={scrollProgressRef}
        pointerRef={pointerRef}
      />
    </>
  );
}

const REPULSION_RADIUS = 1.7;
const REPULSION_STRENGTH = 1.15;

const PULSE_COUNT_BY_QUALITY: Record<SceneQuality, number> = {
  full: 26,
  light: 12,
};

type Pulse = { edge: Edge; t: number; speed: number };

function randomEdge(edges: Edge[]): Edge {
  return edges[Math.floor(Math.random() * edges.length)];
}

function createPulses(edges: Edge[], count: number): Pulse[] {
  return Array.from({ length: count }, () => ({
    edge: randomEdge(edges),
    t: Math.random(),
    speed: THREE.MathUtils.randFloat(0.25, 0.55),
  }));
}
