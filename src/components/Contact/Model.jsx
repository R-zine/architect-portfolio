import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

export function Model(props) {
  const { scene } = useGLTF("/model.glb");
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
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
