import axios from 'axios';
import { GraphQLResponse } from '../../types';

export class GraphQLService {
	private apiUrl: string;

	constructor() {
		this.apiUrl = process.env.BACKEND_API_URL || 'http://backend-api:5000/graphql';
	}

	async executeQuery(query: string): Promise<GraphQLResponse> {
		try {
			const response = await axios.post(this.apiUrl, { query });
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return error.response.data;
			}
			return {
				errors: [
					{
						message: error instanceof Error ? error.message : 'Failed to execute GraphQL query'
					}
				]
			};
		}
	}
}
