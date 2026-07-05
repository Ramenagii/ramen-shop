import { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useCameraContext } from "../scene/CameraContext";

export default function Chef({ position = [0, 0, 0] as [number, number, number] }) {
  const { scene: penguinScene } = useGLTF("/models/penguin-final.glb");
  const { scene: hatScene } = useGLTF("/models/chef-hat-final.glb");
  const { modelBounds } = useCameraContext();
  const [penguinScale, setPenguinScale] = useState(1);
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
    const targetHeight = shopHeight * 0.175;
    const scale = size.y > 0 ? targetHeight / size.y : 1;

    setPenguinScale(scale);
    setHatPosY(box.max.y * scale + 0.15 * scale);

    console.log("[Chef] modelBounds.size[1]:", shopHeight);
    console.log("[Chef] penguin scale:", scale);
  }, [penguinScene, modelBounds]);

  return (
    <group position={position}>
      <primitive object={penguinScene} scale={penguinScale} />
      <primitive
        object={hatScene}
        scale={0.27 * penguinScale}
        position={[0, hatPosY, -0.08 * penguinScale]}
      />
    </group>
  );
}

useGLTF.preload("/models/penguin-final.glb");
useGLTF.preload("/models/chef-hat-final.glb");
