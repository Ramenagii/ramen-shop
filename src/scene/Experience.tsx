import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import LoadingScreen from "./LoadingScreen";
import { CameraProvider } from "./CameraContext";
import CameraRig from "./CameraRig";
import useScrollTriggers from "./useScrollTriggers";

function Bowl() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  const points: THREE.Vector2[] = [];
  const segments = 16;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = t * Math.PI;
    const r = Math.sin(angle) * 2.0 + 0.3;
    const y = Math.cos(angle) * 1.2;
    points.push(new THREE.Vector2(r, y));
  }

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <latheGeometry args={[points, 32]} />
      <meshStandardMaterial color="#d4693b" roughness={0.5} metalness={0.3} />
    </mesh>
  );
}

function AboutObject() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group position={[-0.5, 0.3, 0]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#e8b84b" roughness={0.4} metalness={0.1} />
      </mesh>
      <Html position={[0, 1.2, 0]} center>
        <div
          style={{
            background: "rgba(20, 12, 8, 0.85)",
            backdropFilter: "blur(6px)",
            color: "#f0d5b0",
            padding: "12px 20px",
            borderRadius: 8,
            fontFamily: "system-ui, sans-serif",
            fontSize: 14,
            lineHeight: 1.5,
            maxWidth: 200,
            textAlign: "center",
            border: "1px solid rgba(212, 105, 59, 0.3)",
          }}
        >
          About section placeholder
        </div>
      </Html>
    </group>
  );
}

function CameraTriggers() {
  useScrollTriggers();
  return null;
}

function Scene({ controlsRef }: { controlsRef: React.RefObject<OrbitControlsImpl | null> }) {
  return (
    <>
      <ambientLight intensity={0.3} color="#ffd6b0" />
      <pointLight position={[5, 8, 5]} intensity={60} color="#ff9944" />
      <pointLight position={[-4, 3, -3]} intensity={30} color="#ff6633" />
      <Bowl />
      <AboutObject />
      <CameraRig />
      <CameraTriggers />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        minDistance={3}
        maxDistance={15}
        enableZoom={false}
      />
    </>
  );
}

export default function Experience() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  return (
    <CameraProvider controlsRef={controlsRef}>
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 50 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#1a0f0a"]} />
        <Suspense fallback={<LoadingScreen />}>
          <Scene controlsRef={controlsRef} />
        </Suspense>
      </Canvas>
    </CameraProvider>
  );
}
