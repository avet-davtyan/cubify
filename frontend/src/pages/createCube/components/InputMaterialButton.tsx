import { Button } from '@nextui-org/react';
import { Html } from '@react-three/drei';
import { useRef } from 'react';
import useCreateCubeStore from '../../../store/CreateCubeStore';

const InputMaterialButton = ({
	index,
	position,
}: {
	index: 1 | 2 | 3 | 4 | 5 | 6;
	position: any;
}) => {
	const { previewImages, setPreviewImage, setSide } = useCreateCubeStore();
	const hiddenFileInput = useRef<any>(null);
	const handleClick = (event: any) => {
		hiddenFileInput.current.click();
	};

	const handleFileInputChange = (e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			setSide(index, file);
			setPreviewImage(index, reader.result);
		};
		reader.readAsDataURL(file);
	};

	return (
		<Html position={position}>
			<div
				onClick={handleClick}
				style={{
					width: '40px',
					height: '40px',

					transform: 'translate(-50%,-50%)',
					borderRadius: '70%',
					transition: '0.3s all',
					backgroundColor: `${
						previewImages[`image${index}`] ? 'rgba(0,255,0,0.1)' : 'rgba(0,0,255ex,0.1)'
					}`,
					// opacity: '0.4',
					border: `3px solid ${previewImages[`image${index}`] ? '#17C964' : '#006FEE'}`,
				}}
			></div>
			<input
				ref={hiddenFileInput}
				style={{ display: 'none' }}
				type="file"
				onChange={(e) => handleFileInputChange(e)}
			/>
		</Html>
	);
};

export default InputMaterialButton;
