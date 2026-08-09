import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
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

export function NetworkScene({ quality }: { quality: SceneQuality }) {
  const nodeCount = NODE_COUNT_BY_QUALITY[quality];
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

  return (
    <>
      {POLYHEDRA.map((polyhedron, index) => (
        <SpinningPolyhedron key={index} {...polyhedron} />
      ))}

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={ACCENT_COLOR} transparent opacity={0.3} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[basePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={nodeTexture}
          size={0.12}
          color={ACCENT_COLOR}
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}
