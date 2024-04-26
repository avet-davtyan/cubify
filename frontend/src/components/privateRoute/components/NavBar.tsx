import { Avatar, Button, Navbar } from '@nextui-org/react';
import useAuthStore from '../../../store/AuthStore';

import { useNavigate } from 'react-router-dom';

const NavBar = () => {
	const { user, isAuth } = useAuthStore();
	const navigate = useNavigate();
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
					{isAuth ? (
						<>
							<p
								style={{
									opacity: '0.7',
								}}
							>
								{user?.fullName}
							</p>
							<Avatar src={user?.avatar} />
						</>
					) : (
						<div className="flex gap-4">
							<Button
								size="sm"
								color="primary"
								variant="shadow"
								onClick={() => {
									navigate('/login');
								}}
							>
								Sign In
							</Button>
							<Button
								size="sm"
								color="primary"
								variant="bordered"
								onClick={() => {
									navigate('/register');
								}}
							>
								Sign Up
							</Button>
						</div>
					)}
				</div>
			</div>
		</Navbar>
	);
};

export default NavBar;
