import { Schema, model } from 'mongoose';
import type { IUser, IUserModel } from './user.types';
import { hashPassword } from '../../utilities/authUtilities';
import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { STATUS_CODES } from '../../constants';

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: 0,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
		isBlocked: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

// * Hash password before saving the user in DB.
userSchema.pre('save', async function (next) {
	this.password = await hashPassword(this.password);

	next();
});

/** Static method to check if user exists */
userSchema.statics.validateUser = async function (email:string) {
	const user = await this.findOne({ email }).select('+password');

	if (!user) {
		throw new ErrorWithStatus(
			'NotFoundError',
			`User with email ${email} not found!`,
			STATUS_CODES.NOT_FOUND,
			'user',
		);
	}

	if (user.isDeleted) {
		throw new ErrorWithStatus(
			'NotFoundError',
			`User with email ${email} is deleted!`,
			STATUS_CODES.FORBIDDEN,
			'user',
		);
	}

	if (user.status === 'blocked') {
		throw new ErrorWithStatus(
			'AuthenticationError',
			`User with email ${email} is blocked!`,
			STATUS_CODES.FORBIDDEN,
			'user',
		);
	}

	return user;
}

export const User = model<IUser, IUserModel>('User', userSchema);
