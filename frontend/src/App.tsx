import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import PrivateRoute from './components/privateRoute/privateRoute';
import CreateCube from './pages/createCube/createCube';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<PrivateRoute />}
					></Route>
					<Route
						path="/create_cube"
						element={<CreateCube />}
					/>
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
	);
}

export default App;
