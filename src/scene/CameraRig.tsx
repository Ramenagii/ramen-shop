import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";
import { useCameraContext, type CameraStop } from "./CameraContext";

const STOPS: Record<string, CameraStop> = {
  hero: {
    position: [-20.918190812685562, 9.135638222005975, -10.058796178995667],
    target: [-11.638874, 7.999952, -6.266558],
  },
  about: {
    position: [25.009170980584393, 20.99272444907956, -5.0008974310957734],
    target: [19.924169, 0.500731, -8.975338],
  },
  projects: {
    position: [14.860383468064484, 8.47142450912663, 23.18762374970191],
    target: [0, 0, 0],
  },
  contact: {
    position: [39.9243396254179, 22.271178212493183, 20.98207697137897],
    target: [14.834236, 6.713016, 5.857694],
  },
};

const HERO = STOPS.hero;

function computeIntroPosition(): [number, number, number] {
  const dx = HERO.position[0] - HERO.target[0];
  const dy = HERO.position[1] - HERO.target[1];
  const dz = HERO.position[2] - HERO.target[2];
  return [
    HERO.target[0] + dx * 1.5,
    HERO.target[1] + dy * 1.5,
    HERO.target[2] + dz * 1.5,
  ];
}

export default function CameraRig() {
  const { camera } = useThree();
  const { currentStop, controlsRef, introComplete } = useCameraContext();
  const proxy = useRef({ x: 0, y: 0, z: 0 });
  const vecTarget = useRef(new THREE.Vector3(0, 0, 0));
  const isTransitioning = useRef(false);
  const snapDone = useRef(false);
  const prevStop = useRef<string | null>(null);
  const cloneAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    cloneAudio.current = new Audio("/audio/clone%20sound.mp3");
    return () => { cloneAudio.current = null; };
  }, []);

  useEffect(() => {
    if (snapDone.current) return;
    const introPos = computeIntroPosition();
    camera.position.set(introPos[0], introPos[1], introPos[2]);
    proxy.current = { x: HERO.target[0], y: HERO.target[1], z: HERO.target[2] };
    vecTarget.current.set(HERO.target[0], HERO.target[1], HERO.target[2]);
    if (controlsRef.current) {
      controlsRef.current.target.copy(vecTarget.current);
      controlsRef.current.update();
    }
    snapDone.current = true;
  }, [camera, controlsRef]);

  useEffect(() => {
    const stop = STOPS[currentStop];
    if (!stop || !introComplete) return;

    /* Play clone sound on tab switch (skip initial entry) */
    if (prevStop.current !== null && prevStop.current !== currentStop) {
      const audio = cloneAudio.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    }
    prevStop.current = currentStop;

    isTransitioning.current = true;

    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(proxy.current);

    const duration = currentStop === "hero" ? 2.5 : 1.2;

    gsap.to(camera.position, {
      x: stop.position[0],
      y: stop.position[1],
      z: stop.position[2],
      duration,
      ease: "power2.inOut",
      overwrite: "auto",
    });

    gsap.to(proxy.current, {
      x: stop.target[0],
      y: stop.target[1],
      z: stop.target[2],
      duration,
      ease: "power2.inOut",
      overwrite: "auto",
      onComplete: () => {
        isTransitioning.current = false;
      },
    });
  }, [currentStop, camera, introComplete]);

  useFrame(() => {
    if (!isTransitioning.current) return;

    vecTarget.current.set(proxy.current.x, proxy.current.y, proxy.current.z);
    if (controlsRef.current) {
      controlsRef.current.target.copy(vecTarget.current);
      controlsRef.current.update();
    }
  });

  return null;
}
