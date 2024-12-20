import type { Document, Model, Types } from 'mongoose';
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

export interface ITokens {
	accessToken: string;
	refreshToken: string;
}

export interface IUserDoc extends IUser, Document {
	_id: Types.ObjectId;
}

export interface IUserModel extends Model<IUserDoc> {
	validateUser(email?: string): Promise<IUserDoc>;
}
