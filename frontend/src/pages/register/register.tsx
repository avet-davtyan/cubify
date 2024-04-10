import React from 'react';
import Welcome from './components/Welcome';
import SignUpForm from './components/SignUpForm';
import { useState } from 'react';
import ErrorModal from './components/ErrorModal';

const Register: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isOpenError, setIsOpenError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	return (
		<div
			className="w-full h-full absolute flex justify-center items-center"
			// style={{ backgroundImage: `url(${backImage})`, overflow: 'auto' }}
		>
			<SignUpForm
				setIsOpen={setIsOpen}
				setIsOpenError={setIsOpenError}
				setErrorMessage={setErrorMessage}
			/>
			<Welcome
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
			<ErrorModal
				isOpen={isOpenError}
				setIsOpen={setIsOpenError}
				message={errorMessage}
			/>
		</div>
	);
};
export default Register;
