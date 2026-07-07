import Experience from "./scene/Experience";
import Nav from "./ui/Nav";
import IntroSequence from "./scene/IntroSequence";
import { CameraProvider } from "./scene/CameraContext";
import { ProgressProvider } from "./scene/ProgressContext";

export default function App() {
  return (
    <ProgressProvider>
    <CameraProvider>
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Experience />
      </div>
      <div
        id="scroll-container"
        style={{ height: "400vh", position: "relative", zIndex: 1, pointerEvents: "none" }}
      />
      <Nav />
      <IntroSequence />
    </CameraProvider>
    </ProgressProvider>
  );
}
