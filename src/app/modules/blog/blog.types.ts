import type { Document, Types, Model } from 'mongoose';

export interface IBlog {
	title: string;
	content: string;
	author: Types.ObjectId;
	isPublished: boolean;
}

export interface IBlogDoc extends IBlog, Document {
	_id: Types.ObjectId;
}

export interface IPopulatedBlog {
	_id: Types.ObjectId;
	title: string;
	content: string;
	author: {
		_id: Types.ObjectId;
		name: string;
		email: string;
	};
}

export interface IBlogModel extends Model<IBlogDoc> {
	findBlogById: (id: Types.ObjectId) => Promise<IPopulatedBlog>;
}

export interface IBlogQuery {
	search?: string;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
	page?: number;
	limit?: number;
	[key: string]: unknown;
}
