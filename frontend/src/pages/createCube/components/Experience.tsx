import { Environment, OrbitControls, useTexture, Html } from '@react-three/drei';
import { Texture } from 'three';
import texture from '../../../assets/cubecube.png';
import InputMaterialButton from './InputMaterialButton';
import useCreateCubeStore from '../../../store/CreateCubeStore';

const Experience = () => {
	const { previewImages } = useCreateCubeStore();

	const texture1 = useTexture(
		previewImages.image1 ? (previewImages.image1 as string) : texture,
	) as Texture;
	const texture2 = useTexture(
		previewImages.image2 ? (previewImages.image2 as string) : texture,
	) as Texture;
	const texture3 = useTexture(
		previewImages.image3 ? (previewImages.image3 as string) : texture,
	) as Texture;
	const texture4 = useTexture(
		previewImages.image4 ? (previewImages.image4 as string) : texture,
	) as Texture;
	const texture5 = useTexture(
		previewImages.image5 ? (previewImages.image5 as string) : texture,
	) as Texture;
	const texture6 = useTexture(
		previewImages.image6 ? (previewImages.image6 as string) : texture,
	) as Texture;

	return (
		<>
			<OrbitControls />
			<Environment preset="city" />

			<mesh
				scale={[1, 1, 1]}
				position={[0, 0, 0]}
			>
				<boxGeometry />
				<meshStandardMaterial
					map={texture1}
					attach={'material-0'}
				/>
				<meshStandardMaterial
					map={texture2}
					attach={'material-1'}
				/>
				<meshStandardMaterial
					map={texture3}
					attach={'material-2'}
				/>
				<meshStandardMaterial
					map={texture4}
					attach={'material-3'}
				/>
				<meshStandardMaterial
					map={texture5}
					attach={'material-4'}
				/>
				<meshStandardMaterial
					map={texture6}
					attach={'material-5'}
				/>
			</mesh>
			<InputMaterialButton
				position={[0.5, 0, 0]}
				index={1}
			/>
			<InputMaterialButton
				position={[-0.5, 0, 0]}
				index={2}
			/>
			<InputMaterialButton
				position={[0, 0.5, 0]}
				index={3}
			/>
			<InputMaterialButton
				position={[0, -0.5, 0]}
				index={4}
			/>
			<InputMaterialButton
				position={[0, 0, 0.5]}
				index={5}
			/>
			<InputMaterialButton
				position={[0, 0, -0.5]}
				index={6}
			/>
		</>
	);
};
export default Experience;
