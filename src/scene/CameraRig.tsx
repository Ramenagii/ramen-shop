import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";
import { useCameraContext, STOPS } from "./CameraContext";

export default function CameraRig() {
  const { camera } = useThree();
  const { currentStop } = useCameraContext();
  const proxy = useRef({ x: 0, y: 0, z: 0 });
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const stop = STOPS[currentStop];
    if (!stop) return;

    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(proxy.current);

    gsap.to(camera.position, {
      x: stop.position[0],
      y: stop.position[1],
      z: stop.position[2],
      duration: 1.2,
      ease: "power2.inOut",
      overwrite: "auto",
    });

    gsap.to(proxy.current, {
      x: stop.target[0],
      y: stop.target[1],
      z: stop.target[2],
      duration: 1.2,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  }, [currentStop, camera]);

  useFrame(() => {
    target.current.set(proxy.current.x, proxy.current.y, proxy.current.z);
    camera.lookAt(target.current);
  });

  return null;
}
