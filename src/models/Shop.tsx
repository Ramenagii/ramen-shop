import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Shop() {
  const { scene } = useGLTF("/models/shop-final.glb");

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

  return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
}

useGLTF.preload("/models/shop-final.glb");
