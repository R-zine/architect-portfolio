import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Component, Suspense, useCallback, useState } from "react";
import type { ReactNode } from "react";

import { Model } from "./Model";

interface SceneErrorBoundaryProps {
  children: ReactNode;
}

interface SceneErrorBoundaryState {
  failed: boolean;
}

class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override render() {
    if (this.state.failed) {
      return null;
    }
    return this.props.children;
  }
}

function ContactScene() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const handleModelLoad = useCallback(() => setModelLoaded(true), []);

  return (
    <SceneErrorBoundary>
      <div
        className="Contact"
        role="img"
        aria-label="Interactive 3D furniture model"
        data-model-loaded={modelLoaded}
      >
        <Canvas shadows camera={{ fov: 50 }}>
          <Suspense fallback={null}>
            <Stage
              preset="rembrandt"
              intensity={5}
              adjustCamera={1.25}
              environment={null}
              shadows="contact"
            >
              <Model scale={0.002} onLoad={handleModelLoad} />
              <OrbitControls
                makeDefault
                autoRotate
                autoRotateSpeed={1.5}
                target={[0, 0, 0]}
                enablePan={false}
                enableZoom={false}
                maxPolarAngle={1.2}
              />
            </Stage>
          </Suspense>
        </Canvas>
      </div>
    </SceneErrorBoundary>
  );
}

export default ContactScene;
