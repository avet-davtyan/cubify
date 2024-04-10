import { Avatar, Divider, Skeleton } from '@nextui-org/react';
import { Cube } from '../../../types/CubeTypes';
import { useEffect, useState } from 'react';
import { User } from '../../../types/UserTypes';
import api from '../../../http/base_api';
import CubeCanvas from './components/CubeCanvas';
import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import useAuthStore from '../../../store/AuthStore';
import { useNavigate } from 'react-router-dom';

const CubeCard = ({ cube }: { cube: Cube }) => {
	const [owner, setOwner] = useState<User | null>(null);
	const [liked, setLiked] = useState<boolean | null>(null);
	const [likeCount, setLikeCount] = useState<number | null>(null);
	const [cubeLoaded, setCubeLoaded] = useState<boolean>(false);
	const { isAuth } = useAuthStore();
	const navigate = useNavigate();

	const getDate = (dateString: string): string => {
		const date = new Date(dateString);

		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();

		return `${day} - ${month} - ${year}`;
	};

	const likeHandler = () => {
		if (!liked) {
			api
				.post('cube/like', { cubeId: cube.id })
				.then(() => {
					setLiked(true);
					likeCount !== null && setLikeCount(1 + likeCount);
				})
				.catch(() => {});
		} else {
			api
				.post('cube/removeLike', { cubeId: cube.id })
				.then(() => {
					setLiked(false);
					likeCount !== null && setLikeCount(likeCount - 1);
				})
				.catch(() => {});
		}
	};

	useEffect(() => {
		api
			.get<User>('/user/' + cube.ownerId)
			.then((response) => {
				setOwner(response.data);
			})
			.catch(() => {
				setOwner({
					id: 0,
					username: '404 Not Found',
					email: '404 Not Found',
					fullName: '404 Not Found',
				});
			});

		api
			.post('/cube/isLiked', { cubeId: cube.id })
			.then((response) => {
				setLiked(response.data);
			})
			.catch(() => {});

		api
			.post('/cube/likeCount', { cubeId: cube.id })
			.then((response) => {
				setLikeCount(response.data);
			})
			.catch(() => {});
	}, []);
	return (
		<>
			<div>
				<div
					style={{
						width: '300px',
						padding: '10px',
						display: 'flex',
						flexDirection: 'column',
						// border: '1px solid rgba(255,255,255,0.2)',
						backgroundColor: '#101010',
						gap: '10px',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '2px',
						}}
					>
						<Skeleton isLoaded={owner ? true : false}>
							<div
								className="flex p-2 gap-4 cursor-pointer"
								onClick={() => {
									navigate(`/${owner?.username}/`);
								}}
							>
								<Avatar />
								<div>
									<p>{owner?.fullName}</p>
									<p
										style={{
											opacity: '0.4',
											fontSize: '12px',
										}}
									>
										{owner?.username}
									</p>
								</div>
							</div>
						</Skeleton>
					</div>

					<Divider />
					<div className="flex justify-between ">
						<p>{cube.name}</p>
						<p className="opacity-50 font-thin font-sans">{getDate(cube.createdAt)}</p>
					</div>
					<Skeleton isLoaded={cubeLoaded}>
						<div
							style={{
								width: '100%',
								aspectRatio: '1',

								overflow: 'hidden',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								position: 'relative',
							}}
						>
							<CubeCanvas
								cube={cube}
								setCubeLoaded={setCubeLoaded}
							/>
						</div>
					</Skeleton>

					<div
						style={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Skeleton isLoaded={likeCount !== null}>
							<p
								style={{
									opacity: '0.4',
								}}
							>
								{likeCount} likes
							</p>
						</Skeleton>
						{isAuth && (
							<Skeleton isLoaded={liked !== null}>
								<button
									style={{
										padding: '10px',
									}}
									onClick={likeHandler}
								>
									{liked ? <LikeFilled /> : <LikeOutlined />}
								</button>
							</Skeleton>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default CubeCard;