import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Bowl() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/bowl-final.glb");

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return <primitive ref={groupRef} object={scene} scale={1} position={[0, 0, 0]} />;
}

useGLTF.preload("/models/bowl-final.glb");
