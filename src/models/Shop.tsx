import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useCameraContext } from "../scene/CameraContext";

export default function Shop() {
  const { scene } = useGLTF("/models/shop-final.glb");
  const { setModelBounds } = useCameraContext();
  const scaleRef = useRef(1);

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const box = new THREE.Box3().setFromObject(scene);
    const rawSize = new THREE.Vector3();
    box.getSize(rawSize);
    const maxDim = Math.max(rawSize.x, rawSize.y, rawSize.z);
    const scaleFactor = maxDim > 50 || maxDim < 0.5 ? 10 / maxDim : 1;
    scaleRef.current = scaleFactor;

    const scaledMin = box.min.clone().multiplyScalar(scaleFactor);
    const scaledMax = box.max.clone().multiplyScalar(scaleFactor);
    const scaledSize = rawSize.clone().multiplyScalar(scaleFactor);
    const scaledCenter = scaledMin.clone().add(scaledMax).multiplyScalar(0.5);

    console.log("[Shop] raw size:", rawSize);
    console.log("[Shop] scaleFactor:", scaleFactor);
    console.log("[Shop] scaled size:", scaledSize);
    console.log("[Shop] scaled center:", scaledCenter);

    setModelBounds({
      min: [scaledMin.x, scaledMin.y, scaledMin.z],
      max: [scaledMax.x, scaledMax.y, scaledMax.z],
      center: [scaledCenter.x, scaledCenter.y, scaledCenter.z],
      size: [scaledSize.x, scaledSize.y, scaledSize.z],
      scaleFactor,
    });
  }, [scene, setModelBounds]);

  return <primitive object={scene} scale={scaleRef.current} position={[0, 0, 0]} />;
}

useGLTF.preload("/models/shop-final.glb");
