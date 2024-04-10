import { Modal, ModalContent, ModalHeader } from '@nextui-org/react';
import React, { Dispatch, SetStateAction } from 'react';

interface ErrorProps {
	message: string;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ErrorModal: React.FC<ErrorProps> = ({ isOpen, setIsOpen, message }: ErrorProps) => {
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
					<p
						style={{
							fontSize: '20px',
						}}
					>
						{message} 😔😔😔
					</p>
				</ModalHeader>
			</ModalContent>
		</Modal>
	);
};

export default ErrorModal;
