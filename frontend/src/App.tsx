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

function App() {
	const { darkMode } = useDarkModeStore();
	return (
		<NextUIProvider>
			<NextThemesProvider
				attribute="class"
				defaultTheme={darkMode ? 'dark' : 'light'}
			>
				<>
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
									path="/create_cube"
									element={<CreateCube />}
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
						</Routes>
					</BrowserRouter>
				</>
			</NextThemesProvider>
		</NextUIProvider>
	);
}

export default App;
