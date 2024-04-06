export interface RegistraionData {
	email: string;
	username: string;
	fullName: string;
	password: string;
	confirmPassword: string;
}

export interface LoginData {
	emailOrUsername: string;
	password: string;
}
