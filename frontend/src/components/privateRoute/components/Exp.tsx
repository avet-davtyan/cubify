import { Environment, OrbitControls, useTexture } from '@react-three/drei';
import { Texture } from 'three';
import texture from '../../../assets/cubifyAv.png';

const Experience = ({ image }: { image: any }) => {
	const texture1 = useTexture(image ? (image as string) : texture) as Texture;
	return (
		<>
			<OrbitControls />
			<Environment preset="city" />

			<mesh
				scale={[3, 3, 3]}
				position={[0, 0, 0]}
			>
				<boxGeometry />
				<meshStandardMaterial map={texture1} />
			</mesh>
		</>
	);
};
export default Experience;
