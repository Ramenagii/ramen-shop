import { createContext, useContext, useState, useCallback, useRef, type RefObject, type ReactNode } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export interface CameraStop {
  position: [number, number, number];
  target: [number, number, number];
}

export interface BBoxInfo {
  min: [number, number, number];
  max: [number, number, number];
  center: [number, number, number];
  size: [number, number, number];
  scaleFactor: number;
}

interface CameraContextValue {
  currentStop: string;
  goToStop: (stop: string) => void;
  controlsRef: RefObject<OrbitControlsImpl | null>;
  modelBounds: BBoxInfo | null;
  setModelBounds: (bbox: BBoxInfo) => void;
  introComplete: boolean;
  setIntroComplete: (v: boolean) => void;
  assetsLoaded: boolean;
  setAssetsLoaded: (v: boolean) => void;
}

export const CameraContext = createContext<CameraContextValue | null>(null);

export function useCameraContext() {
  const ctx = useContext(CameraContext);
  if (!ctx) throw new Error("useCameraContext must be used within CameraProvider");
  return ctx;
}

export function CameraProvider({ children }: { children: ReactNode }) {
  const [currentStop, setCurrentStop] = useState("hero");
  const [modelBounds, setModelBounds] = useState<BBoxInfo | null>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const goToStop = useCallback((stop: string) => setCurrentStop(stop), []);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  return (
    <CameraContext.Provider value={{ currentStop, goToStop, controlsRef, modelBounds, setModelBounds, introComplete, setIntroComplete, assetsLoaded, setAssetsLoaded }}>
      {children}
    </CameraContext.Provider>
  );
}
