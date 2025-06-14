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

	input PatientSearchInput {
		search: String
		status: String
		dob: String
		gender: String
		occupation: String
		title: String
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
		patients(searchInput: PatientSearchInput, pagination: PaginationInput!): PatientData
	}
`;
