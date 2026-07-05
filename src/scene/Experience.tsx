import { Suspense, useEffect, useCallback } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import LoadingScreen from "./LoadingScreen";
import { useCameraContext, CameraContext } from "./CameraContext";
import CameraRig from "./CameraRig";
import useScrollTriggers from "./useScrollTriggers";
import Shop from "../models/Shop";
import Chef from "../models/Chef";

function AboutOverlay() {
  const { modelBounds, currentStop } = useCameraContext();

  if (!modelBounds || currentStop !== "about") return null;

  const [, minY] = modelBounds.min;
  const [, , h] = modelBounds.size;
  const [cx, , cz] = modelBounds.center;

  return (
    <Html position={[cx, minY + h * 0.4, cz]} center>
      <div
        style={{
          background: "rgba(20, 12, 8, 0.85)",
          backdropFilter: "blur(6px)",
          color: "#f0d5b0",
          padding: "12px 20px",
          borderRadius: 8,
          fontFamily: "system-ui, sans-serif",
          fontSize: 14,
          lineHeight: 1.5,
          maxWidth: 200,
          textAlign: "center",
          border: "1px solid rgba(212, 105, 59, 0.3)",
        }}
      >
        About section placeholder
      </div>
    </Html>
  );
}

function CameraTriggers() {
  useScrollTriggers();
  return null;
}

function CameraDebug() {
  const { camera } = useThree();
  useEffect(() => {
    console.log("[Camera] near:", camera.near, "far:", camera.far);
  }, [camera]);
  return null;
}

function CameraLogger() {
  const { camera } = useThree();
  const { controlsRef } = useCameraContext();

  const capture = useCallback(() => {
    const p = camera.position;
    const t = controlsRef.current?.target;
    console.log("STOP CAPTURED:", {
      position: [p.x, p.y, p.z],
      target: t ? [t.x, t.y, t.z] : null,
    });
  }, [camera, controlsRef]);

  return (
    <Html fullscreen>
      <div style={{ position: "fixed", top: 72, right: 16, zIndex: 200 }}>
        <button
          onClick={capture}
          style={{
            padding: "6px 14px",
            background: "rgba(212, 105, 59, 0.85)",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontFamily: "system-ui, sans-serif",
            fontSize: 13,
            fontWeight: 600,
            backdropFilter: "blur(4px)",
          }}
        >
          Capture Position
        </button>
      </div>
    </Html>
  );
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
      <Environment preset="sunset" />
      <Shop />
      <Chef position={[22.917892074365806, 12.712317307210997, -6.568087422942933]} />
      <CameraRig />
      <CameraTriggers />
      <CameraDebug />
      <CameraLogger />
      <AboutOverlay />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        minDistance={1}
        maxDistance={50}
        enableZoom={true}
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
    <Canvas
      camera={{ position: [0, 1.5, 6], fov: 50 }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
      shadows
    >
      <CameraContext.Provider value={contextValue}>
        <color attach="background" args={["#1a0f0a"]} />
        <Suspense fallback={<LoadingScreen />}>
          <Scene />
        </Suspense>
      </CameraContext.Provider>
    </Canvas>
  );
}
