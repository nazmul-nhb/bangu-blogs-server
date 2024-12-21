import { Schema, model } from 'mongoose';
import type { IUserDoc, IUserModel } from './user.types';
import { hashPassword } from '../../utilities/authUtilities';
import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { STATUS_CODES } from '../../constants';

const userSchema = new Schema<IUserDoc>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			select: false,
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
userSchema.statics.validateUser = async function (email?: string) {
	if (!email) {
		throw new ErrorWithStatus(
			'Authentication Error',
			'Please provide a valid email!',
			STATUS_CODES.BAD_REQUEST,
			'user',
		);
	}

	const user: IUserDoc = await this.findOne({ email }).select('+password');

	if (!user) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`No user found with email: ${email}!`,
			STATUS_CODES.NOT_FOUND,
			'user',
		);
	}

	if (user.isBlocked) {
		throw new ErrorWithStatus(
			'Authentication Error',
			`User with email ${email} is Blocked!`,
			STATUS_CODES.FORBIDDEN,
			'user',
		);
	}

	return user;
};

export const User = model<IUserDoc, IUserModel>('User', userSchema);
