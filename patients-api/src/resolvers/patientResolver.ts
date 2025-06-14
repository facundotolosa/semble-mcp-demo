import { Patient } from '../models/Patient';

export const resolvers = {
	Query: {
		patients: async (
			_: any,
			{
				searchInput,
				pagination
			}: {
				searchInput?: {
					search?: string;
					status?: string;
					dob?: string;
					gender?: string;
					occupation?: string;
					title?: string;
				};
				pagination: { page: number; pageSize: number };
			}
		) => {
			const { page, pageSize } = pagination;
			const skip = (page - 1) * pageSize;

			let query: any = {};

			if (searchInput) {
				const { search, status, dob, gender, occupation, title } = searchInput;

				if (search) {
					query.$or = [
						{ fullName: { $regex: search, $options: 'i' } },
						{ email: { $regex: search, $options: 'i' } }
					];
				}

				if (status) query.status = { $regex: new RegExp(`^${status}$`, 'i') };
				if (dob) query.dob = dob;
				if (gender) query.gender = { $regex: new RegExp(`^${gender}$`, 'i') };
				if (occupation) query.occupation = { $regex: new RegExp(`^${occupation}$`, 'i') };
				if (title) query.title = { $regex: new RegExp(`^${title}$`, 'i') };
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
