import React from 'react';
import backImage from '../../assets/cubeBack.png';
import SignInForm from './components/SignInForm';

const Login: React.FC = () => {
	return (
		<div
			className="w-full h-full absolute flex justify-center items-center"
			style={{ backgroundImage: `url(${backImage})`, overflow: 'auto' }}
		>
			<SignInForm />
		</div>
	);
};
export default Login;
