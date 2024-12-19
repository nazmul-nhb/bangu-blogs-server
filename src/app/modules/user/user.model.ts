import { Schema, model } from 'mongoose';
import type { IUser } from './user.types';
import { hashPassword } from '../../utilities/passwordUtils';

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

export const User = model<IUser>('User', userSchema);
