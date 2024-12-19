import type { Document, Types } from 'mongoose';

export interface IBlog {
	title: string;
	content: string;
	author: Types.ObjectId;
	isPublished: boolean;
}

export interface IBlogDoc extends IBlog, Document {
	_id: Types.ObjectId;
}
