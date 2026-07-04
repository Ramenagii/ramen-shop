import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface CameraStop {
  position: [number, number, number];
  target: [number, number, number];
}

export const STOPS: Record<string, CameraStop> = {
  hero: { position: [0, 1.5, 6], target: [0, 0, 0] },
  about: { position: [4, 2.5, 4], target: [-0.5, 0.3, 0] },
};

interface CameraContextValue {
  currentStop: string;
  goToStop: (stop: string) => void;
}

const CameraContext = createContext<CameraContextValue | null>(null);

export function useCameraContext() {
  const ctx = useContext(CameraContext);
  if (!ctx) throw new Error("useCameraContext must be used within CameraProvider");
  return ctx;
}

export function CameraProvider({ children }: { children: ReactNode }) {
  const [currentStop, setCurrentStop] = useState("hero");
  const goToStop = useCallback((stop: string) => setCurrentStop(stop), []);
  return (
    <CameraContext.Provider value={{ currentStop, goToStop }}>
      {children}
    </CameraContext.Provider>
  );
}
