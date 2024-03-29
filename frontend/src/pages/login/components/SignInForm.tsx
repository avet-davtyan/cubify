import React, { Dispatch, SetStateAction, useState } from 'react';
import { LoginData } from '../../types/AuthTypes';
import AuthService from '../../../services/AuthService';
import { Button, Card, Chip, Image, Input, Link } from '@nextui-org/react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import cubifyAv from '../../../assets/rub.webp';
import { Formik } from 'formik';
import useAuthStore from '../../../store/AuthStore';
import { useNavigate } from 'react-router-dom';

const SignInForm: React.FC = () => {
	const authStore = useAuthStore();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const navigate = useNavigate();

	const [signInLoading, setSignInLoading] = useState<boolean>(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const validate = (values: LoginData) => {
		const errors = {} as LoginData;

		if (!values.emailOrUsername) {
			errors.emailOrUsername = 'Email or username is required';
		}

		if (!values.password) {
			errors.password = 'Password is required';
		}

		return errors;
	};

	const onSubmit = async (values: LoginData, { resetForm }: { resetForm: () => void }) => {
		console.log('s');
		try {
			setSignInLoading(true);
			await authStore.login(values.emailOrUsername, values.password);
			navigate('/');
			resetForm();
		} catch (error: any) {
			// setErrorMessage(error.request.response.data.message);
			console.log(error);
		} finally {
			setSignInLoading(false);
		}
	};

	const initialValues: LoginData = {
		emailOrUsername: '',
		password: '',
	};
	return (
		<Card className="p-10 bg-black bg-opacity-80 backdrop-blur-10">
			<div className="w-full flex justify-center mb-10">
				<p className="text-2xl">Welcome back</p>
			</div>

			<div className="w-full flex justify-center">
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
						<div className="flex flex-col gap-5">
							<Input
								name="emailOrUsername"
								isInvalid={errors.emailOrUsername && touched.emailOrUsername ? true : false}
								errorMessage={
									errors.emailOrUsername && touched.emailOrUsername && errors.emailOrUsername
								}
								label="Email or Username"
								variant="underlined"
								placeholder="Enter your email or username"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.emailOrUsername}
								size="lg"
								className="w-unit-7xl"
							/>

							<Input
								label="Password"
								name="password"
								variant="underlined"
								isInvalid={errors.password && touched.password ? true : false}
								errorMessage={errors.password && touched.password && errors.password}
								placeholder="Enter password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								size="lg"
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
							/>

							<div className="w-full flex justify-center items-center flex-col">
								<p className="opacity-50 text-sm">Don't have an account?</p>
								<Link
									href="/register"
									underline="hover"
								>
									<p className="text-sm">Sign Up</p>
								</Link>
							</div>
							<Button
								type="submit"
								variant="shadow"
								color="primary"
								disabled={isSubmitting}
								isLoading={signInLoading}
								size="lg"
							>
								Sign In
							</Button>
						</div>
					</form>
				)}
			</Formik>
		</Card>
	);
};

export default SignInForm;
