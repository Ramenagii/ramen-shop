import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";
import { useCameraContext, type BBoxInfo, type CameraStop } from "./CameraContext";

const DEFAULT_STOPS: Record<string, CameraStop> = {
  hero: { position: [0, 1.5, 6], target: [0, 0, 0] },
  about: { position: [3, 2, 3], target: [0, 0, 0] },
  projects: { position: [-3, 3, 3], target: [0, 0, 0] },
  contact: { position: [2, 1.5, 4], target: [0, 0, 0] },
};

function computeStops(bbox: BBoxInfo): Record<string, CameraStop> {
  const [cx, _cy, cz] = bbox.center;
  const [w, h, d] = bbox.size;
  const [, minY] = bbox.min;
  const [, _maxY] = bbox.max;

  return {
    hero: {
      position: [cx, minY + h * 0.4, cz + d * 0.8],
      target: [cx, minY + h * 0.4, cz],
      // ADJUST_ME: entrance — in front of shop facing center
    },
    about: {
      position: [cx + w * 0.5, minY + h * 0.4, cz],
      target: [cx, minY + h * 0.4, cz],
      // ADJUST_ME: counter — right side, facing center
    },
    projects: {
      position: [cx - w * 0.5, minY + h * 0.7, cz],
      target: [cx, minY + h * 0.6, cz],
      // ADJUST_ME: menu — left side, elevated, looking at upper wall
    },
    contact: {
      position: [cx + w * 0.2, minY + h * 0.3, cz + d * 0.5],
      target: [cx + w * 0.15, minY + h * 0.3, cz],
      // ADJUST_ME: register — tight shot near right-back counter
    },
  };
}

export default function CameraRig() {
  const { camera } = useThree();
  const { currentStop, controlsRef, modelBounds } = useCameraContext();
  const proxy = useRef({ x: 0, y: 0, z: 0 });
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const stopsRef = useRef<Record<string, CameraStop>>(DEFAULT_STOPS);

  useEffect(() => {
    if (modelBounds) {
      const computed = computeStops(modelBounds);
      stopsRef.current = computed;
      console.log("[CameraRig] computed stops from model bounds");
    }
  }, [modelBounds]);

  useEffect(() => {
    const stop = stopsRef.current[currentStop];
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
    if (controlsRef.current) {
      controlsRef.current.target.copy(target.current);
      controlsRef.current.update();
    }
  });

  return null;
}
