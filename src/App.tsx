import Experience from "./scene/Experience";
import Nav from "./ui/Nav";
import IntroSequence from "./scene/IntroSequence";
import { CameraProvider, useCameraContext } from "./scene/CameraContext";
import { ProgressProvider } from "./scene/ProgressContext";

function AppInner() {
  const { introComplete } = useCameraContext();
  return (
    <>
      {/* 3D canvas renders in background during intro so it's fully loaded when entering */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Experience />
      </div>
      <div
        id="scroll-container"
        style={{ height: "400vh", position: "relative", zIndex: 1, pointerEvents: "none" }}
      />
      {introComplete && <Nav />}
      {/* Intro overlays on top — blocks view until user enters */}
      <IntroSequence />
    </>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <CameraProvider>
        <AppInner />
      </CameraProvider>
    </ProgressProvider>
  );
}
