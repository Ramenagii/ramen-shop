import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useProgress } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useCameraContext, CameraContext } from "./CameraContext";
import CameraRig from "./CameraRig";
import CanvasErrorBoundary from "./CanvasErrorBoundary";
import useScrollTriggers from "./useScrollTriggers";
import { useSetIntroProgress } from "./ProgressContext";
import Shop from "../models/Shop";
import Chef from "../models/Chef";

function CameraTriggers() {
  useScrollTriggers();
  return null;
}

/* Reports real R3F loading progress to the IntroSequence via ProgressContext. */
function ProgressBridge() {
  const { progress } = useProgress();
  const setProgress = useSetIntroProgress();

  useEffect(() => {
    setProgress({ progress, done: progress >= 100 });
  }, [progress, setProgress]);

  return null;
}

function Scene() {
  const { controlsRef } = useCameraContext();
  return (
    <>
      <fogExp2 attach="fog" args={["#1a0f0a", 0.045]} />
      <ambientLight intensity={0.25} color="#ffd6b0" />
      <pointLight
        position={[5, 8, 5]}
        intensity={60}
        color="#ff9944"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight
        position={[-4, 3, -3]}
        intensity={30}
        color="#ff6633"
        castShadow
      />
      <Environment files="/hdri/venice_sunset_1k.hdr" />
      <Shop />
      <Chef position={[19.924294976753323, 0.5007008137690914, -8.975348972894503]} />
      <CameraRig />
      <CameraTriggers />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        minDistance={1}
        maxDistance={50}
        enableZoom={false}
        enableRotate={false}
        enablePan={false}
      />
      <EffectComposer>
        <Bloom
          intensity={0.25}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export default function Experience() {
  const contextValue = useCameraContext();
  return (
    <CanvasErrorBoundary>
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 50 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
        shadows
      >
        <CameraContext.Provider value={contextValue}>
          <color attach="background" args={["#1a0f0a"]} />
          <ProgressBridge />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </CameraContext.Provider>
      </Canvas>
    </CanvasErrorBoundary>
  );
}
