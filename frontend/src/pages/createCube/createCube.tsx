import { Canvas } from '@react-three/fiber';
import Experience from './components/Experience';
import React, { useState } from 'react';
import { Button, Image, Input, Textarea, image } from '@nextui-org/react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import toast, { Toaster } from 'react-hot-toast';
import { HexColorPicker } from 'react-colorful';
import useCreateCubeStore from '../../store/CreateCubeStore';
const CreateCube: React.FC = () => {
	const { backgroundColor, setColor, setCubeDescription, setCubeName, sides } =
		useCreateCubeStore();
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
							onPress={() => {
								toast('hi');
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
					}}
				>
					<div
						style={{
							position: 'absolute',
							zIndex: '1',
						}}
					>
						<HexColorPicker
							style={{
								width: '150px',
								height: '150px',
								left: '10px',
								top: '10px',
							}}
							color={backgroundColor}
							onChange={setColor}
						/>
					</div>
					<Canvas
						shadows
						camera={{ position: [90, 90, 90], fov: 1 }}
					>
						<color
							attach="background"
							args={[backgroundColor]}
						/>
						<Experience />
					</Canvas>
				</div>
			</div>
		</div>
	);
};
export default CreateCube;
