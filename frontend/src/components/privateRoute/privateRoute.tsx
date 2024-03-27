import { useEffect } from 'react';
import NavBar from './components/NavBar';
import useAuthStore from '../../store/AuthStore';
import back from '../../assets/cubecube.png';
import { Card, Image, CardBody, CardHeader, Button, Avatar, CardFooter } from '@nextui-org/react';
import { Canvas } from '@react-three/fiber';
import Experience from '../../pages/createCube/components/Experience';

function PrivateRoute() {
	const authStore = useAuthStore();
	useEffect(() => {
		const fetchData = async () => {
			try {
				await authStore.verify();
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);
	return (
		<>
			{/* <div
				style={{
					position: 'absolute',
					height: '100%',
					width: '100%',
				}}
			></div>
			<div
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					backgroundColor: 'rgba(0,0,0,0.4)',

					backdropFilter: 'blur(20px)',
				}}
			></div>
			<NavBar /> */}
			<div>
				<div className="container mx-auto mt-20 flex justify-center">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"></div>
				</div>
			</div>
		</>
	);
}

export default PrivateRoute;
