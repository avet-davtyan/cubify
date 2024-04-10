import { Divider, Skeleton } from '@nextui-org/react';
import { Cube } from '../../../types/CubeTypes';
import { useEffect, useState } from 'react';
import { User } from '../../../types/UserTypes';
import api from '../../../http/base_api';
import CubeCanvas from './components/CubeCanvas';
import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import useAuthStore from '../../../store/AuthStore';

const CubeCard = ({ cube }: { cube: Cube }) => {
	const [owner, setOwner] = useState<User | null>(null);
	const [liked, setLiked] = useState<boolean | null>(null);
	const [likeCount, setLikeCount] = useState<number | null>(null);
	const [cubeLoaded, setCubeLoaded] = useState<boolean>(false);
	const { isAuth } = useAuthStore();
	const [hover, setHover] = useState<boolean>(false);

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
						transition: 'all 0.3s',
						// border: '1px solid rgba(255,255,255,0.2)',
						gap: '10px',
					}}
					onMouseEnter={() => {
						setHover(true);
					}}
					onMouseLeave={() => {
						setHover(false);
					}}
				>
					{/* <p>{cube.name}</p> */}
					<Skeleton isLoaded={cubeLoaded}>
						<div
							style={{
								width: '100%',
								aspectRatio: '1',
								backgroundColor: 'black',
								overflow: 'hidden',
								display: 'flex',
								transition: 'all 0.3s',
								justifyContent: 'center',
								alignItems: 'center',
								position: 'relative',
							}}
							className="rounded"
						>
							<CubeCanvas
								cube={cube}
								setCubeLoaded={setCubeLoaded}
							/>
						</div>
					</Skeleton>

					{hover && (
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
					)}
				</div>
			</div>
		</>
	);
};

export default CubeCard;
