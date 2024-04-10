import { Card } from '@nextui-org/react';
import { useEffect } from 'react';
import api from '../../../http/base_api';

import { Cube, CubeImageUrls, ImageKey } from '../../../types/CubeTypes';

const CubeCard = ({ cube }: { cube: Cube }) => {
	const keys: Array<string> = ['side1', 'side2', 'side3', 'side4', 'side5', 'side6'];

	useEffect(() => {
		let _imageUrls: CubeImageUrls = {};
		keys.map(async (key) => {
			if (cube[`${key as ImageKey}`]) {
				const image: Blob = await api.get('cube_images/' + cube[`${key as ImageKey}`], {
					responseType: 'blob',
				});
				_imageUrls[`${key as ImageKey}`] = URL.createObjectURL(image);
			}
		});
		console.log(_imageUrls);
	}, []);

	return (
		<Card
			style={{
				width: '500px',
			}}
		></Card>
	);
};
export default CubeCard;
