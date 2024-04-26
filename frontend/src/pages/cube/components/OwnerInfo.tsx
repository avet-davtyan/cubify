import { Avatar } from '@nextui-org/react';
import { GeneralUser } from '../../../types/AuthTypes';

const OwnerInfo = ({ owner, navigate }: { owner: GeneralUser | null; navigate: () => void }) => {
	const navigateToOwner = () => {
		navigate();
	};
	return (
		<div
			className="flex gap-5 cursor-pointer p-5 "
			style={{
				width: '300px',
			}}
			onClick={navigateToOwner}
		>
			<Avatar
				radius="full"
				size="md"
				src={owner?.avatar}
				isBordered
			/>
			<div className="flex flex-col gap-1 items-start justify-center">
				<h4 className="text-small font-semibold leading-none ">{owner?.fullName}</h4>
				<h5 className="tracking-tight text-tiny">{owner?.username && '@' + owner?.username}</h5>
			</div>
		</div>
	);
};

export default OwnerInfo;
