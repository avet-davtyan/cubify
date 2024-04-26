import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import PrivateRoute from './components/privateRoute/privateRoute';
import CreateCube from './pages/createCube/createCube';
import Cubes from './pages/cubes/cubes';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import useDarkModeStore from './store/DarkLightModeStore';
import UserPage from './pages/user/user';
import CreateUsername from './pages/createUsername/createUsername';
import Verify from './pages/verify/verify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CubePage from './pages/cube/cube';
import Search from './pages/search/search';

function App() {
	const { darkMode } = useDarkModeStore();
	return (
		<NextUIProvider>
			<NextThemesProvider
				attribute="class"
				defaultTheme={darkMode ? 'dark' : 'light'}
			>
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={<PrivateRoute />}
						>
							<Route
								index
								element={<Dashboard />}
							/>
							<Route
								path="/cubes"
								element={<Cubes />}
							/>
							<Route
								path="/cube/:cubeId"
								element={<CubePage />}
							/>
							<Route
								path="/search"
								element={<Search />}
							/>
							<Route
								path="/create_cube"
								element={<CreateCube />}
							/>
							<Route
								path="/:username"
								element={<UserPage />}
							/>
						</Route>

						<Route
							path="/login"
							element={<Login />}
						/>
						<Route
							path="/register"
							element={<Register />}
						/>
						<Route
							path="/createusername"
							element={<CreateUsername />}
						/>
						<Route
							path="/verify"
							element={<Verify />}
						/>
					</Routes>
				</BrowserRouter>

				<ToastContainer />
			</NextThemesProvider>
		</NextUIProvider>
	);
}

export default App;
