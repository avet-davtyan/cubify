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

export interface GeneralUser {
	id: string;
	username?: string;
	email: string;
	fullName: string;
	avatar?: string;
	googleId?: string;
}
