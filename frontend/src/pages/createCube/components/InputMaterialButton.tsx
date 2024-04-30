import { Html } from '@react-three/drei';
import { useRef } from 'react';
import useCreateCubeStore from '../../../store/CreateCubeStore';
import { toast, Flip } from 'react-toastify';

const InputMaterialButton = ({
	index,
	position,
}: {
	index: 1 | 2 | 3 | 4 | 5 | 6;
	position: any;
}) => {
	const { previewImages, setPreviewImage, setSide } = useCreateCubeStore();
	const hiddenFileInput = useRef<any>(null);
	const handleClick = () => {
		hiddenFileInput.current.click();
	};

	const extensions = ['png', 'jpg', 'jpeg', 'webp'];

	const handleFileInputChange = (e: any) => {
		const file = e.target.files[0];

		const extension = file.name.match(/\.[0-9a-z]+$/i)[0].substring(1);
		if (!extensions.includes(extension)) {
			toast.error('wrong type', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
				transition: Flip,
			});
			return;
		}

		if (file.size > 1024 * 1024) {
			toast.error('Image is too large', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
				transition: Flip,
			});
			return;
		}
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
