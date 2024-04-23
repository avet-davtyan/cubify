import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input, Avatar, Divider } from '@nextui-org/react';
import { Formik } from 'formik';
import api from '../../http/base_api';
import SquareLoader from 'react-spinners/SquareLoader';
import { AxiosError, isAxiosError } from 'axios';
import { Flip, toast } from 'react-toastify';

const CreateUsername = () => {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState<{ fullName: string; avatar: string } | null>(null);

	const [signInLoading, setSignInLoading] = useState<boolean>(false);

	const [isFetching, setIsFetching] = useState<boolean>(true);

	const validate = (values: { username: string }) => {
		const errors: { username?: string } = {};

		if (!values.username) {
			errors.username = 'Username is required';
		} else if (values.username.length < 6) {
			errors.username = 'Must be at least 6 characters';
		} else {
			if (!/^[a-z0-9._]+$/.test(values.username)) {
				errors.username = 'Only lowercase letters, numbers, . and _ are allowed';
			}
		}

		return errors;
	};

	const onSubmit = async (
		values: { username: string },
		{ resetForm }: { resetForm: () => void },
	) => {
		try {
			setSignInLoading(true);
			await createUsername(values.username);
			navigate('/');
			resetForm();
		} catch (e) {
			const error = e as Error | AxiosError;
			if (isAxiosError(error)) {
				toast.error(error.response?.data.message, {
					position: 'top-center',
					autoClose: 1000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark',
					transition: Flip,
				});
			}
		} finally {
			setSignInLoading(false);
		}
	};

	const initialValues: { username: string } = {
		username: '',
	};

	const createUsername = async (username: string) => {
		await api.post('auth/createUsername', { username });
	};

	const fetch = async () => {
		try {
			const response = await api.post('auth/verifyGoogle', {});
			setUserInfo(response.data);
			setIsFetching(false);
		} catch (error) {
			navigate('/');
		}
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<div className="w-full h-full absolute flex justify-center items-center">
			{isFetching ? (
				<SquareLoader color="white" />
			) : (
				<Card className="p-10  rounded">
					<div
						style={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '20px',
							marginBottom: '20px',
						}}
					>
						<Avatar
							size="lg"
							isBordered
							src={userInfo?.avatar}
						/>
						<p className="text-2xl">{userInfo?.fullName}</p>
					</div>
					<Divider />
					<div className="w-full flex justify-center my-4">
						<p>Please create username</p>
					</div>

					<Formik
						initialValues={initialValues}
						validate={validate}
						onSubmit={onSubmit}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
						}) => (
							<form onSubmit={handleSubmit}>
								<div className="flex flex-col gap-5">
									<Input
										name="username"
										isInvalid={errors.username && touched.username ? true : false}
										errorMessage={errors.username && touched.username && errors.username}
										label="Create username"
										variant="underlined"
										placeholder="Username"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.username}
										size="lg"
										className="w-unit-7xl"
									/>

									<Button
										className="rounded"
										type="submit"
										color="primary"
										disabled={isSubmitting}
										isLoading={signInLoading}
										size="lg"
									>
										Create username
									</Button>
								</div>
							</form>
						)}
					</Formik>
				</Card>
			)}
		</div>
	);
};
export default CreateUsername;
