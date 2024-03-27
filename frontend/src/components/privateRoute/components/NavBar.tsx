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
} from '@nextui-org/react';
import cubifyAv from '../../../assets/rub.webp';
import { useState } from 'react';
import useAuthStore from '../../../store/AuthStore';

const NavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const { isAuth, user } = useAuthStore();

	const menuItems = [
		'Profile',
		'Dashboard',
		'Activity',
		'Analytics',
		'System',
		'Deployments',
		'My Settings',
		'Team Settings',
		'Help & Feedback',
		'Log Out',
	];

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className="sm:hidden"
				/>
				<NavbarBrand>
					<Image
						src={cubifyAv}
						width={30}
					/>
					<p className="font-bold text-inherit ml-4">CUBIFY</p>
				</NavbarBrand>
			</NavbarContent>

			<User
				name="Junior Garcia"
				description={
					<Link
						href="https://twitter.com/jrgarciadev"
						size="sm"
						isExternal
					>
						{`@${user?.username}`}
					</Link>
				}
			/>
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							color={
								index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'
							}
							className="w-full"
							href="#"
							size="lg"
						>
							{item}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
};

export default NavBar;
