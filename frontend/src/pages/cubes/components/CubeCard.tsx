import {
	Avatar,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Skeleton,
} from '@nextui-org/react';
import { Cube } from '../../../types/CubeTypes';
import { useEffect, useState } from 'react';
import { User } from '../../../types/UserTypes';
import api from '../../../http/base_api';
import CubeCanvas from './components/CubeCanvas';
import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import useAuthStore from '../../../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import CubeLoader from './components/CubeLoader';
import { GoogleUser } from '../../../types/AuthTypes';

const CubeCard = ({ cube }: { cube: Cube }) => {
	const [owner, setOwner] = useState<GoogleUser | null>(null);
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

		return `${day} / ${month} / ${year}`;
	};

	const navigateToOwner = () => {
		navigate(`/${owner?.id}/`);
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
			.get<GoogleUser>('/user/' + cube.ownerId)
			.then((response) => {
				setOwner(response.data);
			})
			.catch(() => {
				setOwner(null);
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
			<Card
				className="px-3 pt-3"
				style={{
					maxWidth: '300px',
				}}
			>
				<CardHeader className="justify-between">
					<Skeleton isLoaded={owner ? true : false}>
						<div
							className="flex gap-5 cursor-pointer p-1"
							onClick={navigateToOwner}
						>
							<Avatar
								radius="full"
								size="md"
								src={owner?.avatar}
								isBordered
							/>
							<div className="flex flex-col gap-1 items-start justify-center">
								<h4 className="text-small font-semibold leading-none text-default-600">
									{owner?.fullName}
								</h4>
								<h5 className="text-small tracking-tight text-default-400">
									{'@' + owner?.username}
								</h5>
							</div>
						</div>
					</Skeleton>
				</CardHeader>
				<CardBody className="px-3 py-0 ">
					<div className="flex justify-between my-3">
						<p className="opacity-100 text-small">{cube.name}</p>
						<p className=" font-thin font-sans text-small">{getDate(cube.createdAt)}</p>
					</div>

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
						{!cubeLoaded && (
							<div
								style={{
									height: '100%',
									width: '100%',
									position: 'absolute',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<CubeLoader />
							</div>
						)}
						<div
							className={cubeLoaded ? 'opacity-100' : 'opacity-0'}
							style={{
								height: '100%',
								width: '100%',
							}}
						>
							<CubeCanvas
								cube={cube}
								setCubeLoaded={setCubeLoaded}
							/>
						</div>
					</div>
				</CardBody>
				<CardFooter>
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
				</CardFooter>
			</Card>
		</>
	);
};

export default CubeCard;
