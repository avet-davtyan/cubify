import { useEffect, useState } from 'react';
import CubeCard from './components/CubeCard';
import api from '../../http/base_api';
import { Cube } from '../../types/CubeTypes';
import { Button, Input, Pagination, Skeleton, Tab, Tabs } from '@nextui-org/react';
import { SearchOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import useCubeStore from '../../store/CubeStore';

const Cubes = () => {
	const [cubes, setCubes] = useState<null | Cube[]>(null);
	const cubeStore = useCubeStore();
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get('page');
	const pageSize = searchParams.get('pageSize');
	const [selected, setSelected] = useState<'most' | 'last'>('last');
	const handleSelectionChange = (newSelection: any) => {
		const selection = newSelection as 'most' | 'last';
		if (selection === 'most') {
			fetchMostLiked(page, pageSize);
		} else if (selection === 'last') {
			fetchRecentlyPublished(page, pageSize);
		}
		setSelected(newSelection);
	};

	const fetchMostLiked = async (
		page?: string | number | null,
		pageSize?: string | number | null,
	) => {
		const fetchedCubes = (
			await api.get(`/cube/most-liked?page=${page || 1}&pageSize=${pageSize || 9}`)
		).data;
		setCubes(fetchedCubes);
	};

	const fetchRecentlyPublished = async (
		page?: string | number | null,
		pageSize?: string | number | null,
	) => {
		const fetchedCubes = (await api.get(`/cube/latest?page=${page || 1}&pageSize=${pageSize || 9}`))
			.data;
		setCubes(fetchedCubes);
	};

	const handlePageChange = (page: number) => {
		setSearchParams({ page: page.toString() });
		if (selected === 'most') {
			fetchMostLiked(page);
		} else if (selected === 'last') {
			fetchRecentlyPublished(page);
		}
	};

	useEffect(() => {
		if (selected === 'most') {
			fetchMostLiked(page, pageSize);
		} else if (selected === 'last') {
			fetchRecentlyPublished(page, pageSize);
		}
	}, []);
	return (
		<div>
			<div className="flex gap-5 my-5">
				<Tabs
					variant="underlined"
					aria-label="Tabs variants"
					selectedKey={selected}
					onSelectionChange={handleSelectionChange}
				>
					<Tab
						key="most"
						title="Most Liked"
					/>
					<Tab
						key="last"
						title="Recently published"
					/>
				</Tabs>
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
						color="success"
						radius="none"
						variant="light"
					/>
				</Skeleton>
			</div>
		</div>
	);
};

export default Cubes;
