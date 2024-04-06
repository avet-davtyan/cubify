import { Canvas } from '@react-three/fiber';
import Experience from './components/Experience';
import React from 'react';
import { Button, Input, Textarea } from '@nextui-org/react';

import { Toaster } from 'react-hot-toast';

import useCreateCubeStore from '../../store/CreateCubeStore';
import api from '../../http/base_api';
const CreateCube: React.FC = () => {
	const { setCubeDescription, setCubeName, sides } = useCreateCubeStore();
	return (
		<div className="w-full h-full absolute flex justify-center items-center">
			<div
				className="lg:flex sm:flex-row "
				style={{
					height: '100%',
					width: '100%',
				}}
			>
				<div
					style={{
						height: '100%',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<div
						style={{
							display: 'flex',
							gap: '30px',
							flexDirection: 'column',
						}}
					>
						<Input
							label="Name"
							placeholder="Enter cube name"
							variant="underlined"
							size="lg"
							onChange={(e) => {
								setCubeName(e.target.value);
							}}
						/>
						<Textarea
							label="Description"
							placeholder="Enter your description"
							variant="underlined"
							size="lg"
							onChange={(e) => {
								setCubeDescription(e.target.value);
							}}
						/>
						<Button
							variant="shadow"
							color="primary"
							onPress={async () => {
								const formData = new FormData();
								sides.side1 && formData.append('image1', sides.side1);
								sides.side2 && formData.append('image2', sides.side2);
								sides.side3 && formData.append('image3', sides.side3);
								sides.side4 && formData.append('image4', sides.side4);
								sides.side5 && formData.append('image5', sides.side5);
								sides.side6 && formData.append('image6', sides.side6);
								formData.append('name', 'test_cube');
								formData.append('description', '...');
								try {
									const response = await api.post('cube/create_cube', formData);
									console.log(response.data);
								} catch (error) {
									console.log(error);
								}
							}}
							// isDisabled={Object.keys(sides).length !== 6}
						>
							Send to backend
						</Button>
						<Toaster />
					</div>
				</div>
				<div
					style={{
						height: '100%',
						width: '100%',
						borderLeft: '1px solid gray',
					}}
				>
					<Canvas
						shadows
						camera={{ position: [90, 90, 90], fov: 1 }}
					>
						<color
							attach="background"
							args={['black']}
						/>
						<Experience />
					</Canvas>
				</div>
			</div>
		</div>
	);
};
export default CreateCube;
