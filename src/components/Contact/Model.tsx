import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { Mesh } from "three";

interface ModelProps {
  scale?: number;
  onLoad?: () => void;
}

export function Model({ onLoad, ...props }: ModelProps) {
  const { scene } = useGLTF("/model.glb");
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    onLoad?.();
  }, [onLoad]);

  return (
    <primitive {...props} object={model} rotation={[-Math.PI / 2, 0, 0]} />
  );
}
