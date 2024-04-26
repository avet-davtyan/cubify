import { useParams } from 'react-router-dom';
import api from '../../http/base_api';
import { useEffect, useState } from 'react';
import { Cube } from '../../types/CubeTypes';
import CubeCanvas from './components/CubeCanvas';

const CubePage: React.FC = () => {
	const { cubeId } = useParams();
	const [cube, SetCube] = useState<Cube | null>(null);
	const [, setCubeLoaded] = useState<boolean>(false);
	const fetch = async () => {
		try {
			console.log('here');
			const cubeData = (await api.get(`cube/specific/${cubeId}/`)).data;
			SetCube(cubeData);
		} catch {
			// setErrorText(`This page isn't available`);
		}
	};

	useEffect(() => {
		fetch();
	}, []);
	return (
		<>
			<div className="h-full w-full flex justify-center items-center">
				<div
					style={{
						height: '100%',
						width: '100%',
					}}
				>
					{cube && (
						<CubeCanvas
							cube={cube}
							setCubeLoaded={setCubeLoaded}
						/>
					)}
				</div>
			</div>
		</>
	);
};
export default CubePage;
