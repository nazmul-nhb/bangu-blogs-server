import type { Document, Model } from 'mongoose';
import type { USER_ROLE } from './user.constants';

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface IUser {
	name: string;
	email: string;
	password: string;
	role: TUserRole;
	isBlocked?: boolean;
}

export interface ILoginCredentials {
	email: string;
	password: string;
}

export interface IToken { token: string };

export interface IUserDoc extends Document {}

export interface IUserModel extends Model<IUser> {
	validateUser(email: string): Promise<IUser>;
}
