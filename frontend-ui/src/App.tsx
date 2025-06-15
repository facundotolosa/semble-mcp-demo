import { Box, Heading, Container, HStack, Image } from '@chakra-ui/react';
import { SearchForm } from './components/SearchForm';
import sembleLogo from './assets/only-semble-logo.svg';

function App() {
	return (
		<Container maxW="1500px" py={8}>
			<Box textAlign="center" mb={8}>
				<HStack spacing={4} justify="center" align="center">
					<Image src={sembleLogo} alt="Semble Logo" height="40px" />
					<Heading as="h1" size="xl">
						Search for patients
					</Heading>
				</HStack>
			</Box>
			<SearchForm />
		</Container>
	);
}

export default App;
