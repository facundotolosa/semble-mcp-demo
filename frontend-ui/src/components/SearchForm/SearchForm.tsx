import { useState } from 'react';
import { Box, FormControl, Input, Button, VStack, Text, Center } from '@chakra-ui/react';
import { api } from '../../services/api';
import { PatientCard } from '../PatientCard';
import { ListLoading } from './ListLoading';
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
						placeholder="Who are you looking for today?"
						value={query}
						onChange={e => setQuery(e.target.value)}
						size="lg"
						autoComplete="off"
						_focus={{
							borderColor: 'rgb(0, 125, 125)',
							boxShadow: '0 0 0 1px rgb(0, 125, 125)'
						}}
					/>
					<Button
						type="submit"
						isLoading={loading}
						loadingText="Searching..."
						width="full"
						bg="rgb(0, 125, 125)"
						_hover={{ bg: 'rgb(0, 105, 105)' }}
						_active={{ bg: 'rgb(0, 95, 95)' }}
						color="white"
					>
						Search
					</Button>
				</VStack>
			</FormControl>

			{error && (
				<Text color="red.500" textAlign="center" mt={4}>
					{error}
				</Text>
			)}

			{loading ? (
				<ListLoading />
			) : !loading && hasSearched && patients.length === 0 && !error ? (
				<Center py={8}>
					<Text fontSize="lg" color="gray.500">
						No patients found matching your search
					</Text>
				</Center>
			) : (
				<VStack spacing={4} mt={8}>
					{patients.map(patient => (
						<PatientCard key={patient.id} patient={patient} />
					))}
				</VStack>
			)}
		</Box>
	);
};
