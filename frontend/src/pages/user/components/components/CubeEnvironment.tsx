import { OrbitControls, Environment, useTexture } from '@react-three/drei';
import { Cube } from '../../../../types/CubeTypes';
import { Mesh, Texture } from 'three';
import { AxiosResponse } from 'axios';
import { Dispatch, useEffect, useRef, useState } from 'react';
import defaultTexture from '../../../../assets/cubifyAv.png';
import api from '../../../../http/base_api';
import { useFrame } from '@react-three/fiber';

const CubeEnvironment = ({
	cube,
	setCubeLoaded,
}: {
	cube: Cube;
	setCubeLoaded: Dispatch<React.SetStateAction<boolean>>;
}) => {
	const cubeRef = useRef<Mesh>(null!);
	useFrame(() => {
		// cubeRef.current.rotation.y += 0.005;
	});
	const [side1, setSide1] = useState<null | string>(null);
	const [side2, setSide2] = useState<null | string>(null);
	const [side3, setSide3] = useState<null | string>(null);
	const [side4, setSide4] = useState<null | string>(null);
	const [side5, setSide5] = useState<null | string>(null);
	const [side6, setSide6] = useState<null | string>(null);

	const texture1 = useTexture(side1 ? (side1 as string) : defaultTexture) as Texture;
	const texture2 = useTexture(side2 ? (side2 as string) : defaultTexture) as Texture;
	const texture3 = useTexture(side3 ? (side3 as string) : defaultTexture) as Texture;
	const texture4 = useTexture(side4 ? (side4 as string) : defaultTexture) as Texture;
	const texture5 = useTexture(side5 ? (side5 as string) : defaultTexture) as Texture;
	const texture6 = useTexture(side6 ? (side6 as string) : defaultTexture) as Texture;

	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const fetchSidesWithPromises = () => {
		const promises = [];

		if (cube.side1) {
			promises.push(
				api
					.get<Blob>('cube_images/' + cube.side1, { responseType: 'blob' })
					.then((response: AxiosResponse<Blob>) => {
						setSide1(URL.createObjectURL(response.data));
					})
					.catch(),
			);
		}

		if (cube.side2) {
			promises.push(
				api
					.get<Blob>('cube_images/' + cube.side2, { responseType: 'blob' })
					.then((response: AxiosResponse<Blob>) => {
						setSide2(URL.createObjectURL(response.data));
					})
					.catch(),
			);
		}
		if (cube.side3) {
			promises.push(
				api
					.get<Blob>('cube_images/' + cube.side3, { responseType: 'blob' })
					.then((response: AxiosResponse<Blob>) => {
						setSide3(URL.createObjectURL(response.data));
					})
					.catch(),
			);
		}
		if (cube.side4) {
			promises.push(
				api
					.get<Blob>('cube_images/' + cube.side4, { responseType: 'blob' })
					.then((response: AxiosResponse<Blob>) => {
						setSide4(URL.createObjectURL(response.data));
					})
					.catch(),
			);
		}
		if (cube.side5) {
			promises.push(
				api
					.get<Blob>('cube_images/' + cube.side5, { responseType: 'blob' })
					.then((response: AxiosResponse<Blob>) => {
						setSide5(URL.createObjectURL(response.data));
					})
					.catch(),
			);
		}
		if (cube.side6) {
			promises.push(
				api
					.get<Blob>('cube_images/' + cube.side6, { responseType: 'blob' })
					.then((response: AxiosResponse<Blob>) => {
						setSide6(URL.createObjectURL(response.data));
					})
					.catch(),
			);
		}

		Promise.all(promises)
			.then(() => {
				setCubeLoaded(true);
				setIsLoaded(true);
			})
			.catch(() => {});
	};

	useEffect(() => {
		fetchSidesWithPromises();
	}, []);
	return (
		<>
			<OrbitControls enableZoom={false} />
			<Environment preset="city" />

			<mesh
				scale={[1, 1, 1]}
				position={[0, 0, 0]}
				ref={cubeRef}
			>
				{isLoaded && <boxGeometry />}

				{side1 && (
					<meshStandardMaterial
						map={texture1}
						attach={'material-0'}
					/>
				)}
				{side2 && (
					<meshStandardMaterial
						map={texture2}
						attach={'material-1'}
					/>
				)}
				{side3 && (
					<meshStandardMaterial
						map={texture3}
						attach={'material-2'}
					/>
				)}
				{side4 && (
					<meshStandardMaterial
						map={texture4}
						attach={'material-3'}
					/>
				)}
				{side5 && (
					<meshStandardMaterial
						map={texture5}
						attach={'material-4'}
					/>
				)}
				{side6 && (
					<meshStandardMaterial
						map={texture6}
						attach={'material-5'}
					/>
				)}
			</mesh>
		</>
	);
};

export default CubeEnvironment;
