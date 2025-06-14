import OpenAI from 'openai';
import { LLMResponse } from '../../types';
import { llmInstructions } from './instructions';

export class LLMService {
	private openai: OpenAI;

	constructor() {
		this.openai = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY
		});
	}

	private formatExamples(): string {
		return llmInstructions.examples
			.map(example => `Example: For the text "${example.text}", the query should be:\n${example.query}`)
			.join('\n\n');
	}

	async translateToGraphQL(text: string): Promise<LLMResponse> {
		try {
			const completion = await this.openai.chat.completions.create({
				model: 'gpt-4o',
				messages: [
					{
						role: 'system',
						content: `${llmInstructions.role}\n\n${llmInstructions.context}\n\n${
							llmInstructions.format
						}\n\n${this.formatExamples()}`
					},
					{
						role: 'user',
						content: text
					}
				],
				response_format: { type: 'json_object' }
			});

			const response = JSON.parse(completion.choices[0].message.content || '{}');
			return response as LLMResponse;
		} catch (error) {
			return {
				error: error instanceof Error ? error.message : 'Failed to translate query'
			};
		}
	}
}
