import React, { Dispatch, SetStateAction, useState } from 'react';
import { RegistraionData } from '../../../types/AuthTypes';
import AuthService from '../../../services/AuthService';
import { Button, Card, Image, Input, Link } from '@nextui-org/react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import cubifyAv from '../../../assets/rub.webp';
import { Formik } from 'formik';

interface SignUpProps {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setIsOpenError: Dispatch<SetStateAction<boolean>>;
	setErrorMessage: Dispatch<SetStateAction<string>>;
}

const SignUpForm: React.FC<SignUpProps> = ({ setIsOpen, setIsOpenError }: SignUpProps) => {
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
		} else if (values.username.length < 6) {
			errors.username = 'Must be at least 6 characters';
		} else {
			if (!/^[a-z0-9._]+$/.test(values.username)) {
				errors.username = 'Only lowercase letters, numbers, . and _ are allowed';
			}
		}
		if (!values.fullName) {
			errors.fullName = 'Full Name is required';
		} else if (values.fullName.length > 30) {
			errors.fullName = 'Full Name at maximum 20 characters';
		}
		if (!values.password) {
			errors.password = 'Password is required';
		} else if (values.password.length < 8) {
			errors.password = 'Must be at least 8 characters';
		}

		if (!values.confirmPassword) {
			errors.confirmPassword = 'Pleas confirm your password';
		} else if (values.confirmPassword !== values.password) {
			errors.confirmPassword = `Password doesn't match`;
		}

		return errors;
	};

	const onSubmit = async (values: RegistraionData, { resetForm }: { resetForm: () => void }) => {
		try {
			setSignUpLoading(true);
			await AuthService.register({
				email: values.email,
				username: values.username,
				fullName: values.fullName,
				password: values.password,
			});
			setIsOpen(true);
			resetForm();
		} catch (error: any) {
			console.log(error);
			setIsOpenError(true);
		} finally {
			setSignUpLoading(false);
		}
	};

	const initialValues: RegistraionData = {
		email: '',
		username: '',
		fullName: '',
		password: '',
		confirmPassword: '',
	};
	return (
		<Card className="p-10">
			<div className="w-full flex justify-center mb-20">
				<p className="text-2xl">Create a Cubify account</p>
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
								type="email"
								name="email"
								isInvalid={errors.email && touched.email ? true : false}
								errorMessage={errors.email && touched.email && errors.email}
								label="Email"
								variant="underlined"
								placeholder="Enter your email"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								size="lg"
								className="w-unit-7xl"
							/>

							<Input
								name="username"
								label="Username"
								variant="underlined"
								isInvalid={errors.username && touched.username ? true : false}
								errorMessage={errors.username && touched.username && errors.username}
								placeholder="Create username"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.username}
								size="lg"
							/>

							<Input
								name="fullName"
								label="Full Name"
								variant="underlined"
								isInvalid={errors.fullName && touched.fullName ? true : false}
								errorMessage={errors.fullName && touched.fullName && errors.fullName}
								placeholder="Full Name"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.fullName}
								size="lg"
							/>

							<Input
								label="Password"
								name="password"
								variant="underlined"
								isInvalid={errors.password && touched.password ? true : false}
								errorMessage={errors.password && touched.password && errors.password}
								placeholder="Create password"
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

							<Input
								label="Confirm your password"
								name="confirmPassword"
								variant="underlined"
								isInvalid={errors.confirmPassword && touched.confirmPassword ? true : false}
								errorMessage={
									errors.confirmPassword && touched.confirmPassword && errors.confirmPassword
								}
								placeholder="Confirm your password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.confirmPassword}
								size="lg"
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
							/>

							<div className="w-full flex justify-center items-center flex-col">
								<p className="opacity-50 text-sm">Already have an account?</p>
								<Link
									href="/login"
									underline="hover"
								>
									<p className="text-sm">Sign In</p>
								</Link>
							</div>
							<Button
								type="submit"
								variant="shadow"
								color="primary"
								disabled={isSubmitting}
								isLoading={signUpLoading}
								size="lg"
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
