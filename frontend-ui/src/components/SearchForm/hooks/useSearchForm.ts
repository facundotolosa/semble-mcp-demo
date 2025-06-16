import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import type { Patient } from '../../../types';

export const useSearchForm = () => {
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [patients, setPatients] = useState<Patient[]>([]);
	const [hasSearched, setHasSearched] = useState(false);

	const searchPatients = async (searchText: string) => {
		setLoading(true);
		setError(null);
		setHasSearched(true);

		try {
			const response = await api.queryPatients({ text: searchText });

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
		}
	};

	useEffect(() => {
		searchPatients('first 20 patients');
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await searchPatients(query);
		setQuery('');
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
