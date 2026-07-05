import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";
import { useCameraContext, type CameraStop } from "./CameraContext";

const STOPS: Record<string, CameraStop> = {
  hero: {
    position: [-18.978531589463344, 14.86646572495541, -5.396512193812706],
    target: [0, 0, 0],
  },
  about: {
    position: [22.917892074365806, 12.712317307210997, -6.568087422942933],
    target: [0, 0, 0],
  },
  projects: {
    position: [14.860383468064484, 8.47142450912663, 23.18762374970191],
    target: [0, 0, 0],
  },
  contact: {
    position: [17.297848238404487, 13.548435905991992, 17.26461734057462],
    target: [14.834236, 6.713016, 5.857694],
  },
};

export default function CameraRig() {
  const { camera } = useThree();
  const { currentStop, controlsRef } = useCameraContext();
  const proxy = useRef({ x: 0, y: 0, z: 0 });
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const isTransitioning = useRef(false);

  useEffect(() => {
    const stop = STOPS[currentStop];
    if (!stop) return;

    isTransitioning.current = true;

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
      onComplete: () => {
        isTransitioning.current = false;
      },
    });
  }, [currentStop, camera]);

  useFrame(() => {
    if (!isTransitioning.current) return;

    target.current.set(proxy.current.x, proxy.current.y, proxy.current.z);
    if (controlsRef.current) {
      controlsRef.current.target.copy(target.current);
      controlsRef.current.update();
    }
  });

  return null;
}
