import { Avatar, Button, Navbar } from '@nextui-org/react';
import useAuthStore from '../../../store/AuthStore';

import useDarkModeStore from '../../../store/DarkLightModeStore';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
	const { user, isAuth } = useAuthStore();
	const navigate = useNavigate();
	const darkModeStore = useDarkModeStore();
	const pathName = location.pathname;
	return (
		<Navbar
			isBordered
			style={{
				backgroundColor: 'rgba(0,0,0,0.001)',
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '20px',
				}}
			>
				<div
					style={{
						backgroundColor: 'white',
						width: '30px',
						height: '30px',
					}}
				></div>
				<p>Cubify</p>
			</div>
			<div
				style={{
					display: 'flex',
					gap: '20px',
				}}
			>
				<p
					style={{
						cursor: 'pointer',
						opacity: pathName == '/' ? '0.5' : '1',
						borderBottom: pathName == '/' ? '1px solid' : '',
					}}
					onClick={() => {
						navigate('/');
					}}
				>
					Home
				</p>
				<p
					style={{
						cursor: 'pointer',
						opacity: pathName == '/cubes' ? '0.5' : '1',
						borderBottom: pathName == '/cubes' ? '1px solid' : '',
					}}
					onClick={() => {
						navigate('/cubes');
					}}
				>
					Cubes
				</p>
				<p
					style={{
						cursor: 'pointer',
						opacity: pathName == '/create_cube' ? '0.5' : '1',
						borderBottom: pathName == '/create_cube' ? '1px solid' : '',
					}}
					onClick={() => {
						navigate('/create_cube');
					}}
				>
					Create a cube
				</p>
			</div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '20px',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: '15px',
					}}
				>
					<p
						style={{
							opacity: '0.7',
						}}
					>
						{user?.fullName}
					</p>
					{isAuth && <Avatar src={user?.avatar} />}
				</div>
			</div>
		</Navbar>
	);
};

export default NavBar;
