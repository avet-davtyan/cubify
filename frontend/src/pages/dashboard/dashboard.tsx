import { useEffect, useState } from 'react';
import { initParticlesEngine } from '@tsparticles/react';
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from '@tsparticles/slim';
import style from './dashboard.module.scss';
import SignInForm from '../login/components/SignInForm';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { GoogleCircleFilled, GoogleOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import useAuthStore from '../../store/AuthStore';

const Dashboard: React.FC = () => {
	const [, setInit] = useState(false);
	const navigate = useNavigate();
	const { isAuth } = useAuthStore();
	const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
			// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
			// starting from v2 you can add only the features you need reducing the bundle size
			//await loadAll(engine);
			//await loadFull(engine);
			await loadSlim(engine);
			//await loadBasic(engine);
		}).then(() => {
			setInit(true);
		});
	}, []);

	return (
		<>
			<div
				style={{
					position: 'absolute',
					height: '100%',
					width: '100%',
					padding: '100px',
					// backgroundImage: 'url(/cubifyBackDark.png)',

					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				{!isAuth ? (
					<>
						<img
							className={style.floating}
							src={'cubify.svg'}
							width={isMobile ? 200 : 500}
						/>
						<div className="flex flex-col gap-6 items-center">
							<button
								style={{
									width: isMobile ? '200px' : '',
								}}
								className={style.signButton}
								onClick={() => {
									navigate('/login');
								}}
							>
								Sign In
							</button>
							<button
								style={{
									width: isMobile ? '200px' : '',
								}}
								className={style.signUpButton}
								onClick={() => {
									navigate('/register');
								}}
							>
								Sign Up
							</button>
						</div>
					</>
				) : (
					<img
						src={'cubify.svg'}
						width={600}
						className={style.floatingCubify}
					/>
				)}
			</div>
		</>
	);
};
export default Dashboard;
