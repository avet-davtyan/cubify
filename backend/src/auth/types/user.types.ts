import { GoogleAccount, LocalAccount, User } from "@prisma/client";

export interface LocalAccoutResponse {
    id: string;
    email: string;
    username: string;
    fullName: string;
}

export interface GoogleAccountResponse {
    id: string;
    fullName: string;
    email: string;
    googleId: string;
    avatar?: string;
    username?: string;
}

export interface UserAccountsIncluded extends User {
    googleAccount?: GoogleAccount;
    localAccount?: LocalAccount;
}
