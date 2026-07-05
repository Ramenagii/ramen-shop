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

      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      box.getSize(size);
      console.log("[Shop] bounding box min:", box.min);
      console.log("[Shop] bounding box max:", box.max);
      console.log("[Shop] bounding box size:", size);
    }
  }, [scene]);

  return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
}

useGLTF.preload("/models/shop-final.glb");
