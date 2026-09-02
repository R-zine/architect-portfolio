import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { Mesh } from "three";

interface ModelProps {
  scale?: number;
}

export function Model(props: ModelProps) {
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

  return (
    <primitive {...props} object={model} rotation={[-Math.PI / 2, 0, 0]} />
  );
}
