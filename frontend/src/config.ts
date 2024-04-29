let BASE_URL = import.meta.env.VITE_BACKEND_URL;
BASE_URL = 'http://localhost:5029/';
if (!BASE_URL) {
	throw new Error('BASE_URL is required');
}

export { BASE_URL };
