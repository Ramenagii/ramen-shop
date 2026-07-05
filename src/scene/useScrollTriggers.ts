import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCameraContext } from "./CameraContext";

gsap.registerPlugin(ScrollTrigger);

const STOP_ORDER = ["hero", "about", "projects", "contact"];

export default function useScrollTriggers() {
  const { goToStop } = useCameraContext();
  const lastStop = useRef("hero");

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const idx = Math.min(Math.floor(self.progress * STOP_ORDER.length), STOP_ORDER.length - 1);
        const next = STOP_ORDER[idx];
        if (next !== lastStop.current) {
          lastStop.current = next;
          goToStop(next);
        }
      },
    });

    return () => trigger.kill();
  }, [goToStop]);
}
