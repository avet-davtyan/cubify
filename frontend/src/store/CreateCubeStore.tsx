import { create } from 'zustand';

type Base64 = string | ArrayBuffer | null;

interface CreateCubeState {
	sides: { side1?: File; side2?: File; side3?: File; side4?: File; side5?: File; side6?: File };
	previewImages: {
		image1?: Base64;
		image2?: Base64;
		image3?: Base64;
		image4?: Base64;
		image5?: Base64;
		image6?: Base64;
	};
	backgroundColor: string;
	cubeName: string | null;
	cubeDescription: string | null;
	setSide: (sideIndex: number, file: File) => void;
	setPreviewImage: (imageIndex: number, base64String: Base64) => void;
	setColor: (color: string) => void;
	setCubeName: (cubeName: string) => void;
	setCubeDescription: (cubeDescription: string) => void;
}

const useCreateCubeStore = create<CreateCubeState>((set) => ({
	sides: {},
	backgroundColor: 'rgb(0,0,255)',
	previewImages: {},
	cubeName: null,
	cubeDescription: null,
	setSide: (sideIndex, file) => {
		set((state) => ({
			sides: {
				...state.sides,
				[`side${sideIndex}`]: file,
			},
		}));
	},
	setPreviewImage: (imageIndex, base64String) => {
		set((state) => ({
			previewImages: {
				...state.previewImages,
				[`image${imageIndex}`]: base64String,
			},
		}));
	},
	setColor(color) {
		set(() => ({
			backgroundColor: color,
		}));
	},
	setCubeDescription(cubeDescription) {
		set(() => ({
			cubeDescription,
		}));
	},

	setCubeName(cubeName) {
		set(() => ({
			cubeName,
		}));
	},
}));

export default useCreateCubeStore;
