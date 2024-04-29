import { Avatar, Button, Navbar } from '@nextui-org/react';
import useAuthStore from '../../../store/AuthStore';

import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import OpenSideBar from '../../../assets/openSideBar.svg';

const NavBar = ({
	setSideBarOpen,
}: {
	setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { user, isAuth } = useAuthStore();
	const navigate = useNavigate();
	const pathName = location.pathname;
	const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });
	const openSideBar = () => {
		setSideBarOpen(true);
	};
	return (
		<Navbar
			isBordered
			style={{
				backgroundColor: 'rgba(0,0,0,0.001)',
			}}
		>
			{isMobile && (
				<div
					className="cursor-pointer"
					onClick={openSideBar}
				>
					<img
						src={OpenSideBar}
						width={30}
					/>
				</div>
			)}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '20px',
				}}
			>
				<img
					src="cubeLogo.svg"
					width={40}
				/>
				<p>Cubify</p>
			</div>
			{!isMobile && (
				<div
					style={{
						display: 'flex',
						gap: '20px',
					}}
				>
					{!isAuth && (
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
					)}
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
			)}
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
						<div className={`flex ${isMobile ? 'gap-1' : 'gap-4'}`}>
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
