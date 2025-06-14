import { gql } from 'apollo-server-express';

export const typeDefs = gql`
	type Patient {
		id: ID!
		title: String
		status: String
		firstName: String
		lastName: String
		fullName: String
		dob: String
		gender: String
		email: String
		occupation: String
		createdAt: String
		updatedAt: String
	}

	input PaginationInput {
		page: Int!
		pageSize: Int!
	}

	type PageInfo {
		page: Int!
		pageSize: Int!
		hasMore: Boolean!
	}

	type PatientData {
		data: [Patient]
		pageInfo: PageInfo
	}

	type Query {
		patients(search: String, pagination: PaginationInput!): PatientData
	}
`;
