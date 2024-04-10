import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { User } from '../../types/UserTypes';
import api from '../../http/base_api';
import { Cube } from '../../types/CubeTypes';
import CubeCard from './components/CubeCard';
import { Pagination, Skeleton } from '@nextui-org/react';

const UserPage: React.FC = () => {
	const { username } = useParams();
	const [user, setUser] = useState<User | null>(null);
	const [errorText, setErrorText] = useState<string | null>(null);
	const [cubes, setCubes] = useState<null | Cube[]>(null);
	const [cubeCount, setCubeCount] = useState<null | number>(null);

	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get('page');
	const pageSize = searchParams.get('pageSize');

	const fetchMyCubes = async (page?: string | number | null, pageSize?: string | number | null) => {
		const fetchedCubes = (
			await api.get(`/cube/user/${user?.id}?page=${page || 1}&pageSize=${pageSize || 9}`)
		).data;
		setCubes(fetchedCubes);
	};

	const fetchCount = async () => {
		const fethedCount = (await api.get(`/cube/count/${user?.id}`)).data;
		setCubeCount(fethedCount);
	};

	const handlePageChange = (page: number) => {
		setSearchParams({ page: page.toString() });
		fetchMyCubes(page);
	};

	const fetch = async () => {
		try {
			const userData = (await api.get(`user/find/${username}/`)).data;
			setUser(userData);
			const fethedCount = (await api.get(`/cube/count/${userData?.id}`)).data;
			setCubeCount(fethedCount);
			const fetchedCubes = (
				await api.get(`/cube/user/${userData?.id}?page=${page || 1}&pageSize=${pageSize || 9}`)
			).data;
			setCubes(fetchedCubes);
		} catch {
			setErrorText(`This page isn't available`);
		}
	};

	useEffect(() => {
		fetch();
	}, []);
	return (
		<>
			{errorText && (
				<div
					style={{
						height: '100%',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					{errorText}
				</div>
			)}
			{user && !errorText && (
				<div>
					<div
						style={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								border: '1px solid rgba(255,255,255,0.2)',

								padding: '40px',
								margin: '20px',
							}}
						>
							<p>{user.fullName}</p>
							<p
								style={{
									opacity: '50%',
									fontSize: '13px',
								}}
							>
								{user.username}
							</p>
						</div>
					</div>
					<div>
						<div className="flex gap-5 "></div>
						<div
							className="grid grid-cols-1 lg:grid-cols-3 gap-0 "
							style={{
								transition: 'all 0.3s',
							}}
						>
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
							<Skeleton isLoaded={cubeCount !== null}>
								<Pagination
									disableCursorAnimation
									showControls
									total={cubeCount ? Math.ceil(cubeCount / (Number(pageSize) || 9)) : 0}
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
				</div>
			)}
		</>
	);
};
export default UserPage;
