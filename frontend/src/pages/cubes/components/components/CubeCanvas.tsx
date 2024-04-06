import { OrbitControls, Environment, useTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Cube } from '../../../../types/CubeTypes';
import { Dispatch, useEffect, useState } from 'react';
import api from '../../../../http/base_api';
import { AxiosResponse } from 'axios';
import { Texture } from 'three';
import CubeEnvironment from './CubeEnvironment';

const CubeCanvas = ({
	cube,
	setCubeLoaded,
}: {
	cube: Cube;
	setCubeLoaded: Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<Canvas
			shadows
			camera={{ position: [60, 60, 60], fov: 1 }}
		>
			<color
				attach="background"
				args={['black']}
			/>
			<CubeEnvironment
				cube={cube}
				setCubeLoaded={setCubeLoaded}
			/>
		</Canvas>
	);
};

export default CubeCanvas;
