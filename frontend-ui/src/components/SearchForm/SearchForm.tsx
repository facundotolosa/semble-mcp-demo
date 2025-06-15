import {
	Box,
	FormControl,
	Input,
	VStack,
	Text,
	Center,
	InputGroup,
	InputRightAddon,
	InputRightElement,
	IconButton,
	Grid
} from '@chakra-ui/react';
import { PatientCard } from '../PatientCard';
import { ListLoading } from './ListLoading';
import { useSearchForm } from './hooks/useSearchForm';
import { getRandomPrompt } from './utils/getRandomPrompt';
import magicStickIcon from '../../assets/magic-stick.svg';
import searchIcon from '../../assets/search.svg';

export const SearchForm = () => {
	const { query, setQuery, loading, error, patients, hasSearched, handleSubmit } = useSearchForm();

	const showNoResults = !loading && hasSearched && patients.length === 0 && !error;

	const handleGetRandomPrompt = () => {
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
						<InputRightElement bg="transparent" borderColor="inherit" p={0} marginRight="33px">
							<IconButton
								type="submit"
								aria-label="Search"
								icon={<Box as="img" src={searchIcon} alt="Magic Stick" boxSize="20px" />}
								variant="ghost"
								h="100%"
								minW="auto"
								px={2}
								_hover={{ cursor: 'pointer' }}
								_focusVisible={{
									boxShadow: '0 0 0 2px rgb(0, 125, 125)',
									borderRadius: '0'
								}}
							/>
						</InputRightElement>

						<InputRightAddon bg="transparent" borderColor="inherit" p={0}>
							<IconButton
								aria-label="Generate random search prompt"
								icon={<Box as="img" src={magicStickIcon} alt="Magic Stick" boxSize="20px" />}
								onClick={handleGetRandomPrompt}
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
				<Grid templateColumns="repeat(auto-fit, minmax(280px, 460px))" gap={4} mt={8} justifyContent="center">
					{patients.map(patient => (
						<Box key={patient.id} maxW="440px" w="100%">
							<PatientCard patient={patient} />
						</Box>
					))}
				</Grid>
			)}
		</Box>
	);
};
