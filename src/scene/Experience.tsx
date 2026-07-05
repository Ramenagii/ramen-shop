import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import LoadingScreen from "./LoadingScreen";
import { useCameraContext, CameraContext } from "./CameraContext";
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
  const segments = 24;
  const maxR = 2.0;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const r = Math.sin(t * Math.PI * 0.5) * maxR + 0.15;
    const y = -1.0 + 2.0 * t;
    points.push(new THREE.Vector2(r, y));
  }
  const last = points[points.length - 1];
  points[points.length - 1] = new THREE.Vector2(last.x + 0.2, last.y + 0.05);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
      <latheGeometry args={[points, 32]} />
      <meshStandardMaterial color="#d4693b" roughness={0.5} metalness={0.3} />
    </mesh>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
      <circleGeometry args={[6, 48]} />
      <meshStandardMaterial color="#2d1a0e" roughness={0.95} />
    </mesh>
  );
}

function Chopsticks() {
  return (
    <group position={[3, 0.3, 0]}>
      <mesh position={[-0.08, 0.3, 0]}>
        <cylinderGeometry args={[0.035, 0.04, 1.0, 6]} />
        <meshStandardMaterial color="#8b6b4a" roughness={0.8} />
      </mesh>
      <mesh position={[0.08, 0.3, 0]}>
        <cylinderGeometry args={[0.035, 0.04, 1.0, 6]} />
        <meshStandardMaterial color="#8b6b4a" roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[0.3, 0.04, 0.12]} />
        <meshStandardMaterial color="#5a3d2b" roughness={0.95} />
      </mesh>
    </group>
  );
}

function SteamWisp() {
  const positions: [number, number, number][] = [
    [0, 0, 0],
    [0.08, 0.15, 0.05],
    [-0.06, 0.3, -0.04],
    [0.04, 0.45, 0.02],
  ];
  return (
    <group position={[3, 0.5, 0]}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.12 - i * 0.02, 8, 8]} />
          <meshStandardMaterial
            color="#f5e6d0"
            transparent
            opacity={0.12 - i * 0.02}
            roughness={0.4}
          />
        </mesh>
      ))}
      <Html position={[0, 0.7, 0]} center>
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

function Scene() {
  const { controlsRef } = useCameraContext();
  return (
    <>
      <fogExp2 attach="fog" args={["#1a0f0a", 0.045]} />
      <ambientLight intensity={0.25} color="#ffd6b0" />
      <pointLight
        position={[5, 8, 5]}
        intensity={60}
        color="#ff9944"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight
        position={[-4, 3, -3]}
        intensity={30}
        color="#ff6633"
        castShadow
      />
      <Environment preset="sunset" />
      <Ground />
      <Bowl />
      <Chopsticks />
      <SteamWisp />
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
      <EffectComposer>
        <Bloom
          intensity={0.25}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export default function Experience() {
  const contextValue = useCameraContext();
  return (
    <Canvas
      camera={{ position: [0, 1.5, 6], fov: 50 }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
      shadows
    >
      <CameraContext.Provider value={contextValue}>
        <color attach="background" args={["#1a0f0a"]} />
        <Suspense fallback={<LoadingScreen />}>
          <Scene />
        </Suspense>
      </CameraContext.Provider>
    </Canvas>
  );
}
