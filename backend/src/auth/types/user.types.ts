export interface User {
	id: string;
	username: string;
	email: string;
	fullName: string;
}

export interface SimpleUser {
	id: string;
	email: string;
	fullName: string;
}

export interface GoogleUser {
	id: string;
	fullName: string;
	email: string;
	googleId: string;
	avatar?: string;
	username?: string;
}

export interface RegisteredUser {
	id: string;
	username: string;
	email: string;
	password: string;
	fullName: string;
}

export interface UserAuth {
	id: string;
	simpleUser?: SimpleUser;
	googleUser?: GoogleUser;
	verificationToken: string;
	verified: boolean;
}
