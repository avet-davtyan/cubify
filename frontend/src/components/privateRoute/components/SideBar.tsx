import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/AuthStore';
import CloseSideBar from '../../../assets/closeSideBar.svg';

const SideBar = ({
	sideBarOpen,
	setSideBarOpen,
}: {
	sideBarOpen: boolean;
	setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const pathName = location.pathname;
	const { isAuth } = useAuthStore();
	const navigate = useNavigate();

	const navigateAndClose = (path: string) => {
		navigate(path);
		setSideBarOpen(false);
	};

	const closeSideBar = () => {
		setSideBarOpen(false);
	};
	return (
		<div
			style={{
				position: 'absolute',
				transition: 'all 0.7s',
				height: '100%',
				width: '100%',
				backgroundColor: 'black',
				zIndex: '40',
				transform: `translate(${sideBarOpen ? 0 : '-100%'}, 0)`,
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				padding: '40px',
				gap: '40px',
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
						navigateAndClose('/');
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
					navigateAndClose('/cubes');
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
					navigateAndClose('/create_cube');
				}}
			>
				Create a cube
			</p>
			<div
				className="absolute right-5 top-5 cursor-pointer"
				onClick={closeSideBar}
			>
				<img
					src={CloseSideBar}
					width={20}
				/>
			</div>
		</div>
	);
};

export default SideBar;
