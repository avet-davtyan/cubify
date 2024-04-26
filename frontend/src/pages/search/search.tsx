import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, CardHeader, Input, Pagination, Skeleton } from '@nextui-org/react';
import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { GeneralUser } from '../../types/AuthTypes';
import api from '../../http/base_api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError, isAxiosError } from 'axios';
import { Flip, toast } from 'react-toastify';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

const Search = () => {
	const [searchResults, setSearchResults] = useState<Array<GeneralUser> | null>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [userCount, setUserCount] = useState<number | null>(null);

	const navigate = useNavigate();
	const fetchSearchedUsers = async (searchTerm: string | null, page: number = 1) => {
		if (searchTerm === null) {
			return;
		}
		setIsLoading(true);
		const users: Array<GeneralUser> = (
			await api.get(`/user/search?searchTerm=${searchTerm}&page=${page}`)
		).data;

		const count: number = (await api.get(`/user/searchCount?searchTerm=${searchTerm}`)).data;

		if (count === 0) {
			setUserCount(null);
		} else {
			setUserCount(count);
		}

		if (users.length === 0) {
			setSearchResults(null);
		} else {
			setSearchResults(users);
		}
	};

	const fetchUsersCount = async (searchTerm: string | null) => {
		if (searchTerm === null) {
			return;
		}
		const count: number = (await api.get(`/user/searchCount?searchTerm=${searchTerm}`)).data;

		setUserCount(count);
	};

	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get('page');
	const searchTerm = searchParams.get('searchTerm');

	const handlePageChange = (page: number) => {
		setSearchParams({ ...Object.fromEntries(searchParams), page: page.toString() });
		fetchSearchedUsers(searchTerm, page);
	};

	const onSubmit = async (values: { searchTerm: string }) => {
		try {
			setSearchParams({ searchTerm: values.searchTerm.toString() });
			await fetchSearchedUsers(values.searchTerm);
		} catch (e) {
			const error = e as Error | AxiosError;
			if (isAxiosError(error)) {
				toast.error(error.response?.data.message, {
					position: 'top-left',
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
			setIsLoading(false);
		}
	};

	const fetch = async () => {
		try {
			fetchUsersCount(searchTerm);
			fetchSearchedUsers(searchTerm);
		} catch (e) {
			const error = e as Error | AxiosError;
			if (isAxiosError(error)) {
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
			}
		}
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<>
			<div
				style={{
					width: '900px',
					height: '100%',
					margin: '20px',
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Formik
					initialValues={{
						searchTerm: searchTerm || '',
					}}
					onSubmit={onSubmit}
				>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<form
							onSubmit={handleSubmit}
							className="w-full"
						>
							<div className="flex gap-2">
								<Input
									name="searchTerm"
									variant="flat"
									placeholder="Type to search"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.searchTerm}
									size="lg"
									className="w-full"
								/>
								<Button
									type="submit"
									color="primary"
									size="lg"
								>
									<SearchOutlined />
								</Button>
							</div>
						</form>
					)}
				</Formik>

				{searchResults ? (
					<div className="flex flex-col gap-4 p-4 w-full">
						{searchResults.map((user) => (
							<Card key={user.id}>
								<CardHeader
									className="justify-between cursor-pointer"
									onClick={() => {
										navigate(`/${user.username}`);
									}}
								>
									<div className="flex gap-5">
										<Avatar
											isBordered
											radius="full"
											size="md"
											src={user?.avatar}
										/>
										<div className="flex flex-col gap-1 items-start justify-center">
											<h4 className="text-small font-semibold leading-none text-default-600">
												{user.fullName}
											</h4>
											<h5 className="text-small tracking-tight text-default-400">
												{user.username}
											</h5>
										</div>
									</div>
								</CardHeader>
							</Card>
						))}
					</div>
				) : (
					<div
						style={{
							position: 'absolute',
							height: '80vh',
							width: '100%',
							zIndex: '-1',
						}}
						className="flex justify-center items-center"
					>
						{!isLoading ? (
							<p className="text-9xl opacity-15">
								<SearchOutlined />
							</p>
						) : (
							<ClimbingBoxLoader color="white" />
						)}
					</div>
				)}

				{userCount && (
					<Pagination
						showControls
						isCompact
						total={userCount ? Math.ceil(userCount / 20) : 1}
						initialPage={Number(page) || 1}
						onChange={handlePageChange}
					/>
				)}
			</div>
		</>
	);
};

export default Search;
