import {
	Avatar,
	Button,
	Card,
	CardHeader,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Navbar,
	Image,
	NavbarContent,
} from '@nextui-org/react';
import useAuthStore from '../../../store/AuthStore';

import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import OpenSideBar from '../../../assets/openSideBar.svg';
import cubeLogo from '../../../assets/cubeLogo.svg';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

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
					className="cursor-pointer h-full p-4 flex items-center"
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
				<Image
					src={cubeLogo}
					width={40}
					className="rounded-none"
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

					{isAuth && (
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
					)}
					<p
						style={{
							cursor: 'pointer',
							opacity: pathName == '/search' ? '0.5' : '1',
							borderBottom: pathName == '/search' ? '1px solid' : '',
						}}
						onClick={() => {
							navigate('/search');
						}}
						className="flex gap-2 items-center"
					>
						Search
						<SearchOutlined />
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
					{isAuth
						? !isMobile && (
								<a href={`/${user?.username}`}>
									<div className="flex flex-row items-center gap-5 cursor-pointer relative ">
										<p
											style={{
												opacity: '0.7',
											}}
										>
											{user?.fullName}
										</p>
										<Avatar src={user?.avatar} />
									</div>
								</a>
						  )
						: !isMobile && (
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
