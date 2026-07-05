import { Suspense, useEffect, useCallback } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Environment } from "@react-three/drei";
import * as THREE from "three";
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

function ContactOverlay() {
  const { currentStop } = useCameraContext();
  if (currentStop !== "contact") return null;

  return (
    <Html position={[15.718297386512695, 8.04920273453015, 0.6466230168302107]} center>
      <div
        style={{
          width: 240,
          background: "#f5f0e8",
          color: "#1a120a",
          padding: "20px 16px 16px",
          borderRadius: 2,
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: 13,
          lineHeight: 1.6,
          boxShadow: "4px 4px 0 rgba(0,0,0,0.25)",
          border: "1px solid #c8bca8",
        }}
      >
        <div style={{ textAlign: "center", fontWeight: 700, fontSize: 15, letterSpacing: 2, marginBottom: 12 }}>
          ┌─ ORDER SLIP ─┐
        </div>

        <div style={{ borderTop: "1px dashed #8a7e6a", marginBottom: 10 }} />

        <div style={{ marginBottom: 6 }}>
          <span style={{ color: "#8a7e6a" }}>NAME</span><br />
          <span style={{ letterSpacing: 1 }}>____________________</span>
        </div>

        <div style={{ marginBottom: 6 }}>
          <span style={{ color: "#8a7e6a" }}>EMAIL</span><br />
          <span style={{ letterSpacing: 1 }}>____________________</span>
        </div>

        <div style={{ marginBottom: 10 }}>
          <span style={{ color: "#8a7e6a" }}>WHAT CAN I GET</span><br />
          <span style={{ color: "#8a7e6a" }}>STARTED FOR YOU?</span><br />
          <span style={{ letterSpacing: 1 }}>________________________</span>
        </div>

        <div style={{ borderTop: "1px dashed #8a7e6a", marginBottom: 8 }} />

        <div style={{ textAlign: "right", marginBottom: 12, fontSize: 12, color: "#555" }}>
          TOTAL: 1 NEW MESSAGE
        </div>

        <button
          style={{
            width: "100%",
            padding: "8px 0",
            background: "#d4693b",
            color: "#fff",
            border: "none",
            borderRadius: 2,
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1,
            cursor: "pointer",
          }}
          onClick={() => console.log("[Contact] PLACE ORDER clicked")}
        >
          SEND TO KITCHEN
        </button>
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

function SurfaceCapture() {
  const { camera, gl, raycaster, scene } = useThree();
  const handler = useCallback((event: PointerEvent) => {
    if (!event.shiftKey) return;

    const rect = gl.domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    const meshes: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) meshes.push(child);
    });

    const hits = raycaster.intersectObjects(meshes, false);
    if (hits.length > 0) {
      const p = hits[0].point;
      console.log("SURFACE POINT:", [p.x, p.y, p.z]);
    }
  }, [camera, gl, raycaster, scene]);

  useEffect(() => {
    const el = gl.domElement;
    el.addEventListener("pointerdown", handler);
    return () => el.removeEventListener("pointerdown", handler);
  }, [gl, handler]);

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
      <Environment preset="sunset" />
      <Shop />
      <Chef position={[19.924294976753323, 0.5007008137690914, -8.975348972894503]} />
      <CameraRig />
      <CameraTriggers />
      <CameraDebug />
      <SurfaceCapture />
      <AboutOverlay />
      <ContactOverlay />
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
