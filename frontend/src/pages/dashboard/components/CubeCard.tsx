import { Card, CardHeader, Avatar, Button, CardBody, CardFooter, Image } from '@nextui-org/react';

const CubeCard = () => {
	return (
		<Card
			style={{
				width: '300px',
			}}
		>
			<CardHeader className="justify-between">
				<div className="flex gap-5">
					<Avatar
						isBordered
						radius="full"
						size="md"
						src="/avatars/avatar-1.png"
					/>
					<div className="flex flex-col gap-1 items-start justify-center">
						<h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
						<h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
					</div>
				</div>
			</CardHeader>
			<CardBody className="px-3 py-0 text-small text-default-400">
				<Image
					width={300}
					height={300}
					src="https://images.pexels.com/photos/1500610/pexels-photo-1500610.jpeg?cs=srgb&dl=pexels-jadson-thomas-1500610.jpg&fm=jpg"
				/>
			</CardBody>
			<CardFooter>
				<Button color="primary">Like</Button>
			</CardFooter>
		</Card>
	);
};

export default CubeCard;
