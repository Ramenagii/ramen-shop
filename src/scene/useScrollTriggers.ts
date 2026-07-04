import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCameraContext } from "./CameraContext";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollTriggers() {
  const { goToStop, currentStop } = useCameraContext();
  const lastStop = useRef("hero");

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    lastStop.current = currentStop;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const next = self.progress > 0.5 ? "about" : "hero";
        if (next !== lastStop.current) {
          lastStop.current = next;
          goToStop(next);
        }
      },
    });

    return () => trigger.kill();
  }, [goToStop, currentStop]);
}
