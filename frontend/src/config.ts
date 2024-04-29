let BASE_URL = import.meta.env.VITE_BACKEND_URL;

if (!BASE_URL) {
	throw new Error('BASE_URL is required');
}

export { BASE_URL };
