import { Grid, Skeleton, Box } from '@chakra-ui/react';

export const ListLoading = () => {
	return (
		<Grid
			templateColumns="repeat(auto-fit, minmax(280px, 460px))"
			gap={4}
			mt={8}
			justifyContent="center"
			placeItems="center"
		>
			{[...Array(9)].map((_, index) => (
				<Box key={index} p={6} bg="white" borderRadius="lg" boxShadow="md" maxW="440px" w="100%">
					<Box display="flex" flexDirection="column" gap={4}>
						<Skeleton height="24px" width="200px" />
						<Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4}>
							{[...Array(4)].map((_, i) => (
								<Box key={i}>
									<Skeleton height="16px" width="100px" mb={2} />
									<Skeleton height="20px" width="150px" />
								</Box>
							))}
						</Box>
					</Box>
				</Box>
			))}
		</Grid>
	);
};
