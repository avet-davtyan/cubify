import { Link, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React, { Dispatch, SetStateAction } from 'react';

interface WelcomeProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Welcome: React.FC<WelcomeProps> = ({ isOpen, setIsOpen }: WelcomeProps) => {
	const onClose = () => {
		setIsOpen(false);
	};
	return (
		<Modal
			size="sm"
			isOpen={isOpen}
			onClose={onClose}
			backdrop="blur"
		>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">
					<div
						style={{
							display: 'flex',
							width: '100%',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<p
							style={{
								fontSize: '20px',
							}}
						>
							Welcome to Cubify 🎉🎉🎉
						</p>
					</div>
				</ModalHeader>
				<ModalBody>
					<div
						style={{
							display: 'flex',
							width: '100%',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '10px',
							marginBottom: '20px',
						}}
					>
						<Link
							href="#"
							showAnchorIcon
						>
							Sign In
						</Link>
					</div>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default Welcome;
