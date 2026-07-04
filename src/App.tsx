import Experience from "./scene/Experience";
import Nav from "./ui/Nav";

export default function App() {
  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Experience />
      </div>
      <div
        id="scroll-container"
        style={{ height: "200vh", position: "relative", zIndex: 1, pointerEvents: "none" }}
      />
      <Nav />
    </>
  );
}
