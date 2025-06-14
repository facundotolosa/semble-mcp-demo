import { Box, Heading, Container } from '@chakra-ui/react';
import { SearchForm } from './components/SearchForm';

function App() {
	return (
		<Container maxW="container.xl" py={8}>
			<Box textAlign="center" mb={8}>
				<Heading as="h1" size="xl">
					Semble MCP Demo
				</Heading>
			</Box>
			<SearchForm />
		</Container>
	);
}

export default App;
