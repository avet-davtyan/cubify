import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useEffect } from 'react';
import useAuthStore from '../../store/AuthStore';
import SquareLoader from 'react-spinners/SquareLoader';
import useCubeStore from '../../store/CubeStore';

function PrivateRoute() {
	const authStore = useAuthStore();
	const cubeStore = useCubeStore();

	useEffect(() => {
		const fetch = async () => {
			try {
				await authStore.verify();
				await cubeStore.getCubeCount();
				authStore.setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetch();
	}, []);
	return (
		<>
			{authStore.isLoading ? (
				<div
					style={{
						position: 'absolute',
						height: '100%',
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
						display: 'flex',
					}}
				>
					<SquareLoader color="white" />
				</div>
			) : (
				<>
					<div
						style={{
							position: 'absolute',
							height: '100%',
							width: '100%',
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'column',
							overflow: 'auto',
						}}
					>
						<NavBar />
						<Outlet />
					</div>
					{/* <NavBar /> */}
				</>
			)}
		</>
	);
}

export default PrivateRoute;
