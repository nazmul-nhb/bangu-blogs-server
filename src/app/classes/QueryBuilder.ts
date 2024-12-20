import { type Query, type FilterQuery, Model } from 'mongoose';

/**
 * @class QueryBuilder
 * @description Utility class to build MongoDB queries.
 */
export class QueryBuilder<T> {
	/**
	 * Creates an instance of `QueryBuilder`.
	 * @param modelQuery Mongoose model on which the query will be performed.
	 * @param query Query parameters for filtering, sorting and paginating.
	 */
	constructor(
		public modelQuery: Query<T[], T> = Model.find(),
		public query?: Record<string, unknown>,
	) {
		this.modelQuery = modelQuery;
		this.query = query;
	}

	/**
	 * Method to search for a keyword in the specified fields.
	 * @param searchFields An array of field names to search in.
	 * @returns The current instance of QueryBuilder.
	 */
	search(searchFields: string[]) {
		const keyword = this?.query?.search as string;

		if (keyword) {
			this.modelQuery = this.modelQuery.find({
				$or: searchFields.map(
					(field) =>
						({
							[field]: { $regex: keyword, $options: 'i' },
						}) as FilterQuery<T>,
				),
			});
		}

		return this;
	}

	/**
	 * Method to filter the query based on the provided query parameters.
	 * @returns The current instance of QueryBuilder.
	 */
	filter() {
		const queryObj = { ...this.query };

		const excludeFields = [
			'search',
			'sortBy',
			'sortOrder',
			'filter',
			'page',
			'limit',
		];

		excludeFields.forEach((field) => delete queryObj[field]);

		if (Object.keys(queryObj).length > 0) {
			this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
		}

		return this;
	}

	/**
	 * Sorts the query based on `sortBy` and `sortOrder` parameters.
	 * @returns The current instance of QueryBuilder.
	 */
	sort() {
		const sortField = (this.query?.sortBy as string) || 'createdAt';
		const sortOrder = (this.query?.sortOrder as string) || 'desc';

		const sortBy: { [key: string]: 1 | -1 } = {};
		sortBy[sortField] = sortOrder === 'asc' ? 1 : -1;

		this.modelQuery = this.modelQuery.sort(sortBy);

		return this;
	}

	/**
	 * Adds a filter to the query based on a specific field and a corresponding value from the query parameters.
	 * @param field The field to filter on.
	 * @param valueKey The key in the query parameters to extract the filter value.
	 * @returns The current instance of QueryBuilder.
	 */
	banguFilter(field: keyof T, valueKey: string) {
		const value = this.query?.[valueKey] as string;

		if (value) {
			this.modelQuery = this.modelQuery.find({
				[field]: value,
			} as FilterQuery<T>);
		}

		return this;
	}

	/**
	 * Method to paginate the query based on `page` and `limit` from the query object.
	 * @returns The current instance of QueryBuilder.
	 */
	paginate() {
		const page = Number(this?.query?.page) || 1;
		const limit = Number(this?.query?.limit) || 10;
		const skip = (page - 1) * limit;

		this.modelQuery = this.modelQuery.skip(skip).limit(limit);

		return this;
	}
}
