import React from 'react';
import backImage from '../assets/cubeBack.png';
import SignUpForm from './components/SignUpForm';
const Register: React.FC = () => {
	return (
		<div
			className="w-full h-full absolute flex justify-center items-center"
			style={{ backgroundImage: `url(${backImage})`, overflow: 'auto' }}
		>
			<SignUpForm />
		</div>
	);
};
export default Register;
