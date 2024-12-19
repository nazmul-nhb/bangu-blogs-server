import type { Document } from 'mongoose';
import type { USER_ROLE } from './user.constants';

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface IUser {
	name: string;
	email: string;
	password: string;
	role: TUserRole;
	isBlocked?: boolean;
}

export interface IUserDocument extends Document {}
