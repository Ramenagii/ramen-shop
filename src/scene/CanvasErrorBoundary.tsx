import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("[Canvas Error]", error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <div style={{
        position: "fixed", inset: 0,
        background: "#1a0f0a", color: "#f0d5b0",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "system-ui, sans-serif", fontSize: 14, padding: 24,
        textAlign: "center",
      }}>
        <div>
          <p style={{ fontSize: 32, margin: "0 0 8px" }}>⚠</p>
          <p>Failed to load 3D scene. Reload the page or check your connection.</p>
        </div>
      </div>;
    }
    return this.props.children;
  }
}
