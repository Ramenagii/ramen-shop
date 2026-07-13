import { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useCameraContext } from "../scene/CameraContext";

export default function Chef({ position = [0, 0, 0] as [number, number, number] }) {
  const { scene: penguinScene } = useGLTF("/models/penguin-final.glb");
  const { scene: hatScene } = useGLTF("/models/chef-hat-final.glb");
  const { modelBounds } = useCameraContext();
  const [scaleY, setScaleY] = useState(1);
  const [scaleXZ, setScaleXZ] = useState(1);
  const [hatPosY, setHatPosY] = useState(2.5);

  useEffect(() => {
    [penguinScene, hatScene].forEach((s) => {
      s?.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    });
  }, [penguinScene, hatScene]);

  useEffect(() => {
    if (!penguinScene || !modelBounds) return;

    const box = new THREE.Box3().setFromObject(penguinScene);
    const size = new THREE.Vector3();
    box.getSize(size);

    const shopHeight = modelBounds.size[1];
    const targetHeight = shopHeight * 0.50;
    const sY = size.y > 0 ? targetHeight / size.y : 1;
    const sXZ = sY * 0.5;

    setScaleY(sY);
    setScaleXZ(sXZ);
    setHatPosY(box.max.y * sY - 0.35 * sY);

  }, [penguinScene, modelBounds]);

  return (
    <group position={position}>
      <primitive object={penguinScene} scale={[scaleXZ, scaleY, scaleXZ]} />
      <primitive
        object={hatScene}
        scale={[0.27 * scaleXZ, 0.27 * scaleY, 0.27 * scaleXZ]}
        position={[0, hatPosY, -0.08 * scaleXZ]}
      />
    </group>
  );
}

useGLTF.preload("/models/penguin-final.glb");
useGLTF.preload("/models/chef-hat-final.glb");
