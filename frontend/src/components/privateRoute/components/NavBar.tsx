import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	Link,
	Button,
	Image,
	Avatar,
	Chip,
	User,
	Input,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@nextui-org/react';
import cubifyAv from '../../../assets/rub.webp';
import { useState } from 'react';
import useAuthStore from '../../../store/AuthStore';
import { SearchOutlined } from '@ant-design/icons';
import style from './NavBar.module.scss';
import useDarkModeStore from '../../../store/DarkLightModeStore';

const NavBar = () => {
	const { user } = useAuthStore();
	const darkModeStore = useDarkModeStore();
	const pathName = location.pathname;
	return (
		<Navbar isBordered>
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
				<a
					href="/"
					style={{
						opacity: pathName == '/' ? '0.5' : '1',
						borderBottom: pathName == '/' ? '1px solid' : '',
					}}
				>
					Home
				</a>
				<a
					href="/cubes"
					style={{
						opacity: pathName == '/cubes' ? '0.5' : '1',
						borderBottom: pathName == '/cubes' ? '1px solid' : '',
					}}
				>
					Cubes
				</a>
				<a
					href="/create_cube"
					style={{
						opacity: pathName == '/create_cube' ? '0.5' : '1',
						borderBottom: pathName == '/create_cube' ? '1px solid' : '',
					}}
				>
					Create a Cube
				</a>
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
					<button
						onClick={() => {
							console.log('hi');
							darkModeStore.setDarkMode(!darkModeStore.darkMode);
						}}
					>
						darkMode
					</button>
					<p
						style={{
							opacity: '0.7',
						}}
					>
						{user?.fullName}
					</p>
				</div>
			</div>
		</Navbar>
	);
};

export default NavBar;
