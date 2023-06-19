import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
	const { nodes, materials } = useGLTF('/model.gltf');
	return (
		<group {...props} dispose={null} rotation={[-Math.PI / 2, 0, 0]}>
			<mesh
				castShadow
				receiveShadow
				geometry={
					nodes['Interior_-_Furniture__Paint_-_Light_Gray_SMOOTH_PART'].geometry
				}
				material={materials['Paint_-_Light_Gray']}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={
					nodes['Interior_-_Furniture__Paint_-_Glossy_White_SMOOTH_PART']
						.geometry
				}
				material={materials['Paint_-_Glossy_White']}
			/>
		</group>
	);
}

useGLTF.preload('/model.gltf');
