import { Request, Response } from 'express';
import { LLMService } from '../services/llmService/llmService';
import { GraphQLService } from '../services/graphqlService/graphqlService';
import { QueryRequest } from '../types';

export class QueryController {
	private llmService: LLMService;
	private graphqlService: GraphQLService;

	constructor() {
		this.llmService = new LLMService();
		this.graphqlService = new GraphQLService();
	}

	async handleQuery(req: Request<{}, {}, QueryRequest>, res: Response) {
		try {
			const { text } = req.body;

			if (!text) {
				return res.status(400).json({
					errors: [
						{
							message: 'Text field is required'
						}
					]
				});
			}

			const llmResponse = await this.llmService.translateToGraphQL(text);

			if (llmResponse.error) {
				return res.status(400).json({
					errors: [
						{
							message: llmResponse.error
						}
					]
				});
			}

			if (!llmResponse.query) {
				return res.status(400).json({
					errors: [
						{
							message: 'Failed to generate GraphQL query'
						}
					]
				});
			}

			const graphqlResponse = await this.graphqlService.executeQuery(llmResponse.query);
			return res.json(graphqlResponse);
		} catch (error) {
			return res.status(500).json({
				errors: [
					{
						message: error instanceof Error ? error.message : 'Internal server error'
					}
				]
			});
		}
	}
}
