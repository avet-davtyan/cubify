import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { User } from '../../types/UserTypes';
import api from '../../http/base_api';
import { Cube } from '../../types/CubeTypes';
import CubeCard from './components/CubeCard';
import { Avatar, Button, Card, CardHeader, Image, Pagination, Skeleton } from '@nextui-org/react';
import { GeneralUser } from '../../types/AuthTypes';
import useAuthStore from '../../store/AuthStore';

const UserPage: React.FC = () => {
	const { username } = useParams();
	const authStore = useAuthStore();
	const [user, setUser] = useState<GeneralUser | null>(null);
	const [errorText, setErrorText] = useState<string | null>(null);
	const [cubes, setCubes] = useState<null | Cube[]>(null);
	const [cubeCount, setCubeCount] = useState<null | number>(null);

	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get('page');
	const pageSize = searchParams.get('pageSize');

	const personal: boolean = user?.id === authStore.user?.id;

	const fetchMyCubes = async (page?: string | number | null, pageSize?: string | number | null) => {
		const fetchedCubes = (
			await api.get(`/cube/user/${user?.id}?page=${page || 1}&pageSize=${pageSize || 9}`)
		).data;
		setCubes(fetchedCubes);
	};

	const fetchCount = async () => {
		try {
			const fethedCount = (await api.get(`/cube/count/${user?.id}`)).data;
			setCubeCount(fethedCount);
		} catch {}
	};

	const handlePageChange = (page: number) => {
		setSearchParams({ page: page.toString() });
		fetchCount();
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
				<div
					style={{
						minWidth: cubeCount == 0 ? '1000px' : '',
					}}
				>
					<div
						style={{
							padding: '30px',
							width: '100%',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							background: personal ? 'linear-gradient(to right, #8360c3, #2ebf91)' : '',
						}}
						className="rounded mt-4"
					>
						<div className="flex gap-5 cursor-pointer">
							<Avatar
								radius="full"
								size="md"
								isBordered
								src={user?.avatar}
							/>
							<div className="flex flex-col gap-1 items-start justify-center">
								<h4 className="text-small font-semibold leading-none text-default-600">
									{user?.fullName}
								</h4>
								<h5 className="text-small ">{user?.username}</h5>
							</div>
						</div>

						{cubeCount !== null && cubeCount !== 0 && <p>{cubeCount} Cubes</p>}
					</div>
					{cubeCount !== 0 ? (
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
										showControls
										isCompact
										total={cubeCount ? Math.ceil(cubeCount / (Number(pageSize) || 9)) : 0}
										// initialPage={Number(page) || 1}

										onChange={handlePageChange}
									/>
								</Skeleton>
							</div>
						</div>
					) : (
						<div
							style={{
								width: '100%',
								height: '80vh',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<p>No</p>
							<img src="/empty.gif" />
							<p>Cubes</p>
						</div>
					)}
				</div>
			)}
		</>
	);
};
export default UserPage;
