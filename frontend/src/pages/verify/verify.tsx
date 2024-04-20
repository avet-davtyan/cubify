import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../http/base_api';
import SquareLoader from 'react-spinners/SquareLoader';

const Verify = () => {
	const [userInfo, setUserInfo] = useState<{ fullName: string; avatar: string } | null>(null);
	const [isFetching, setIsFetching] = useState<boolean>(true);
	const navigate = useNavigate();
	const fetch = async () => {
		try {
			const response = await api.post('auth/verifyNotVerified', {});
			setUserInfo(response.data);
			setIsFetching(false);
		} catch (error) {
			navigate('/');
		}
	};

	const resend = async () => {
		const response = await api.get('mail/resend');
		console.log(response);
	};

	useEffect(() => {
		fetch();
	}, []);
	return (
		<div className="w-full h-full absolute flex justify-center items-center">
			{isFetching ? (
				<SquareLoader color="white" />
			) : (
				<div className="flex flex-col gap-9">
					<div className="text-lg flex gap-2">
						<p className="font-bold">{userInfo?.fullName}</p>
						<p>Please Verify your Email</p>
					</div>
					<Button
						className="rounded"
						color="primary"
						onClick={resend}
					>
						Resend the email
					</Button>
				</div>
			)}
		</div>
	);
};

export default Verify;
