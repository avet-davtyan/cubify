import { useEffect, useState } from 'react';
import CubeCard from './components/CubeCard';
import api from '../../http/base_api';
import { Cube } from '../../types/CubeTypes';
import { Input, Pagination, Skeleton, Tab, Tabs } from '@nextui-org/react';
import { SearchOutlined } from '@ant-design/icons';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import useCubeStore from '../../store/CubeStore';

const Cubes = () => {
	const [cubes, setCubes] = useState<null | Cube[]>(null);
	const cubeStore = useCubeStore();
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get('page');
	const pageSize = searchParams.get('pageSize');

	const [fetchLoading, setFetchLoading] = useState(true);

	const fetchMostLiked = async (
		page?: string | number | null,
		pageSize?: string | number | null,
	) => {
		const fetchedCubes = (
			await api.get(`/cube/most-liked?page=${page || 1}&pageSize=${pageSize || 9}`)
		).data;
		setCubes(fetchedCubes);
	};

	const handlePageChange = (page: number) => {
		setSearchParams({ page: page.toString() });
		fetchMostLiked(page);
	};

	useEffect(() => {
		fetchMostLiked(page, pageSize);
	}, []);
	return (
		<div>
			<div className="flex gap-5 my-5">
				<Tabs
					variant="underlined"
					aria-label="Tabs variants"
				>
					<Tab
						key="photos"
						title="Most Liked"
					/>
					<Tab
						key="music"
						title="Last "
					/>
				</Tabs>
				<Input
					placeholder="Type to search..."
					size="sm"
					startContent={<SearchOutlined />}
					type="search"
				/>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
				{cubes &&
					cubes.map((_cube) => (
						<CubeCard
							cube={_cube}
							key={_cube.id}
						/>
					))}
			</div>
			<div
				style={{
					width: '100%',

					display: 'flex',
					justifyContent: 'center',
				}}
				className="my-5"
			>
				<Skeleton isLoaded={cubeStore.cubeCount !== null}>
					<Pagination
						disableCursorAnimation
						showControls
						total={
							cubeStore.cubeCount ? Math.ceil(cubeStore.cubeCount / (Number(pageSize) || 9)) : 0
						}
						initialPage={Number(page) || 1}
						onChange={handlePageChange}
						className="gap-2 rounded"
						radius="none"
						color="danger"
						variant="light"
					/>
				</Skeleton>
			</div>
		</div>
	);
};

export default Cubes;
