import { useState } from 'react';
import { RegistraionData } from '../types/RegistrationTypes';
import AuthService from '../../services/AuthService';
import { Button, Card, Chip, Image, Input, Link } from '@nextui-org/react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import cubifyAv from '../../assets/rub.webp';
import { Formik } from 'formik';

const SignUpForm = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isVisibleConfirm, setIsVisibleConfirm] = useState<boolean>(false);

	const [signUpLoading, setSignUpLoading] = useState<boolean>(false);

	const toggleVisibility = () => setIsVisible(!isVisible);
	const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

	const validate = (values: RegistraionData) => {
		const errors = {} as RegistraionData;

		if (!values.email) {
			errors.email = 'Email is required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
			errors.email = 'Invalid email address';
		}
		if (!values.username) {
			errors.username = 'Username is required';
		}
		if (!values.password) {
			errors.password = 'Password is required';
		} else if (values.password.length < 8) {
			errors.password = 'Must be at least 8 characters';
		}
		if (!values.confirmPassword) {
			errors.confirmPassword = 'Pleas confirm your password';
		} else if (values.confirmPassword !== values.password) {
			errors.confirmPassword = 'Wrong password';
		}

		return errors;
	};

	const onSubmit = async (values: RegistraionData) => {
		console.log('submitting');
		try {
			setSignUpLoading(true);
			await AuthService.register({
				email: values.email,
				username: values.username,
				password: values.password,
			});
		} catch (error) {
			console.log(error);
		} finally {
			setSignUpLoading(false);
		}
	};

	const initialValues: RegistraionData = {
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
	};
	return (
		<Card
			className="p-10"
			style={{
				backgroundColor: 'rgba(0,0,0,0.8)',
				backdropFilter: 'blur(10px)',
			}}
		>
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					marginBottom: '20px',
				}}
			>
				<p
					style={{
						fontSize: '20px',
					}}
				>
					Create a Cubify account
				</p>
			</div>

			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Image
					src={cubifyAv}
					width={50}
				/>
			</div>
			<Formik
				initialValues={initialValues}
				validate={validate}
				onSubmit={onSubmit}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-3">
							<Input
								type="email"
								name="email"
								label="Email"
								variant="underlined"
								placeholder="Enter your email"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
							/>
							{errors.email && touched.email && (
								<Chip
									size="sm"
									color="danger"
									variant="bordered"
								>
									{errors.email}
								</Chip>
							)}
							<Input
								name="username"
								label="Username"
								variant="underlined"
								placeholder="Create username"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.username}
							/>
							{errors.username && touched.username && (
								<Chip
									size="sm"
									color="danger"
									variant="bordered"
								>
									{errors.username}
								</Chip>
							)}
							<Input
								label="Password"
								name="password"
								variant="underlined"
								placeholder="Create password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								endContent={
									<button
										className="focus:outline-none"
										type="button"
										onClick={toggleVisibility}
									>
										{isVisible ? (
											<EyeInvisibleFilled className="text-2xl text-default-400 pointer-events-none" />
										) : (
											<EyeFilled className="text-2xl text-default-400 pointer-events-none" />
										)}
									</button>
								}
								type={isVisible ? 'text' : 'password'}
								className="max-w-xs"
							/>
							{errors.password && touched.password && (
								<Chip
									size="sm"
									color="danger"
									variant="bordered"
								>
									{errors.password}
								</Chip>
							)}
							<Input
								label="Confirm your password"
								name="confirmPassword"
								variant="underlined"
								placeholder="Confirm your password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.confirmPassword}
								endContent={
									<button
										className="focus:outline-none"
										type="button"
										onClick={toggleVisibilityConfirm}
									>
										{isVisibleConfirm ? (
											<EyeInvisibleFilled className="text-2xl text-default-400 pointer-events-none" />
										) : (
											<EyeFilled className="text-2xl text-default-400 pointer-events-none" />
										)}
									</button>
								}
								type={isVisibleConfirm ? 'text' : 'password'}
								className="max-w-xs"
							/>
							{errors.confirmPassword && touched.confirmPassword && (
								<Chip
									size="sm"
									color="danger"
									variant="bordered"
								>
									{errors.confirmPassword}
								</Chip>
							)}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column',
								}}
							>
								<p
									style={{
										opacity: '0.5',
										fontSize: '13px',
									}}
								>
									Already have an account?
								</p>
								<Link
									href="#"
									underline="hover"
								>
									<p
										style={{
											fontSize: '12px',
										}}
									>
										Sign In
									</p>
								</Link>
							</div>
							<Button
								type="submit"
								variant="shadow"
								color="primary"
								disabled={isSubmitting}
								isLoading={signUpLoading}
							>
								Sign Up
							</Button>
						</div>
					</form>
				)}
			</Formik>
		</Card>
	);
};

export default SignUpForm;
