import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

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

export function NetworkScene() {
  return (
    <>
      {POLYHEDRA.map((polyhedron, index) => (
        <SpinningPolyhedron key={index} {...polyhedron} />
      ))}
    </>
  );
}
