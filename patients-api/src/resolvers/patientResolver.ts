import { Patient } from '../models/Patient';

export const resolvers = {
	Query: {
		patients: async (
			_: any,
			{ search, pagination }: { search?: string; pagination: { page: number; pageSize: number } }
		) => {
			const { page, pageSize } = pagination;
			const skip = (page - 1) * pageSize;

			let query = {};
			if (search) {
				query = {
					$or: [{ fullName: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }]
				};
			}

			const [patients, total] = await Promise.all([
				Patient.find(query).skip(skip).limit(pageSize),
				Patient.countDocuments(query)
			]);

			const hasMore = skip + patients.length < total;

			return {
				data: patients,
				pageInfo: {
					page,
					pageSize,
					hasMore
				}
			};
		}
	}
};
