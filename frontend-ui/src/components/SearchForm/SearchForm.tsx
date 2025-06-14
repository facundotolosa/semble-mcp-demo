import { useState } from 'react';
import { Box, FormControl, Input, Button, VStack, Text, Spinner, Center } from '@chakra-ui/react';
import { api } from '../../services/api';
import { PatientCard } from '../PatientCard';
import type { Patient } from '../../types';

export const SearchForm = () => {
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [patients, setPatients] = useState<Patient[]>([]);
	const [hasSearched, setHasSearched] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setHasSearched(true);

		try {
			const response = await api.queryPatients({ text: query });

			if (response.errors) {
				setError(response.errors[0].message);
				setPatients([]);
			} else if (response.data?.patients?.data) {
				setPatients(response.data.patients.data);
			} else {
				setPatients([]);
			}
		} catch (error) {
			setError('Error connecting to the server');
			setPatients([]);
			console.error('Search error:', error);
		} finally {
			setLoading(false);
			setQuery('');
		}
	};

	return (
		<Box as="form" onSubmit={handleSubmit} mb={8}>
			<FormControl>
				<VStack spacing={4}>
					<Input
						type="text"
						placeholder="Enter your query (e.g., show me all patients with last name Smith)"
						value={query}
						onChange={e => setQuery(e.target.value)}
						size="lg"
					/>
					<Button
						type="submit"
						isLoading={loading}
						loadingText="Searching..."
						width="full"
						colorScheme="blue"
					>
						Search
					</Button>
				</VStack>
			</FormControl>

			{loading && (
				<Center my={8}>
					<Spinner size="xl" />
				</Center>
			)}

			{error && (
				<Text color="red.500" textAlign="center" mt={4}>
					{error}
				</Text>
			)}

			{!loading && !error && hasSearched && patients.length === 0 && query && (
				<Text textAlign="center" mt={4} color="gray.500">
					No patients found matching your search criteria.
				</Text>
			)}

			<VStack spacing={4} mt={8}>
				{patients.map(patient => (
					<PatientCard key={patient.id} patient={patient} />
				))}
			</VStack>
		</Box>
	);
};
