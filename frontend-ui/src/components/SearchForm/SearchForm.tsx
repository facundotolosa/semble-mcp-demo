import {
	Box,
	FormControl,
	Input,
	Button,
	VStack,
	Text,
	Center,
	InputGroup,
	InputRightAddon,
	IconButton
} from '@chakra-ui/react';
import { PatientCard } from '../PatientCard';
import { ListLoading } from './ListLoading';
import { useSearchForm } from './hooks/useSearchForm';
import { getRandomPrompt } from './utils/getRandomPrompt';
import magicStickIcon from '../../assets/magic-stick.svg';

export const SearchForm = () => {
	const { query, setQuery, loading, error, patients, hasSearched, handleSubmit } = useSearchForm();

	const showNoResults = !loading && hasSearched && patients.length === 0 && !error;

	const handleMagicWandClick = () => {
		setQuery(getRandomPrompt());
	};

	return (
		<Box as="form" onSubmit={handleSubmit} mb={8}>
			<FormControl>
				<VStack spacing={4}>
					<InputGroup size="lg">
						<Input
							type="text"
							placeholder="Who are you looking for today?"
							value={query}
							onChange={e => setQuery(e.target.value)}
							autoComplete="off"
							_focus={{
								boxShadow: '0 0 0 1px rgb(0, 125, 125)'
							}}
						/>
						<InputRightAddon bg="transparent" borderColor="inherit" p={0}>
							<IconButton
								aria-label="Generate random search prompt"
								icon={<Box as="img" src={magicStickIcon} alt="Magic Stick" boxSize="25px" />}
								onClick={handleMagicWandClick}
								variant="ghost"
								h="100%"
								minW="auto"
								px={2}
								_focusVisible={{
									boxShadow: '0 0 0 2px rgb(0, 125, 125)',
									borderLeftRadius: '0'
								}}
							/>
						</InputRightAddon>
					</InputGroup>
					<Button
						type="submit"
						isLoading={loading}
						loadingText="Searching..."
						width="full"
						bg="rgb(0, 125, 125)"
						_hover={{ bg: 'rgb(0, 105, 105)' }}
						_active={{ bg: 'rgb(0, 0, 0)' }}
						_focus={{
							boxShadow: '0 0 0 2px rgb(0, 0, 0)'
						}}
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

			{loading && <ListLoading />}

			{showNoResults && (
				<Center py={8}>
					<Text fontSize="lg" color="gray.500">
						No patients found matching your search
					</Text>
				</Center>
			)}

			{!loading && patients.length > 0 && (
				<VStack spacing={4} mt={8}>
					{patients.map(patient => (
						<PatientCard key={patient.id} patient={patient} />
					))}
				</VStack>
			)}
		</Box>
	);
};
