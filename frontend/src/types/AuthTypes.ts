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

export interface User {
	id: string;
	username: string;
	email: string;
	fullName: string;
	avatar?: string;
}

export interface GoogleUser {
	id: string;
	fullName: string;
	email: string;
	googleId: string;
	avatar?: string;
	username?: string;
}
