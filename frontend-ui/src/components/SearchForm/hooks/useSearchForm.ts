import { useState } from 'react';
import { api } from '../../../services/api';
import type { Patient } from '../../../types';

export const useSearchForm = () => {
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

	return {
		query,
		setQuery,
		loading,
		error,
		patients,
		hasSearched,
		handleSubmit
	};
};
