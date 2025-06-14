import { VStack, Skeleton, Box } from '@chakra-ui/react';

export const ListLoading = () => {
	return (
		<VStack spacing={4} mt={8} width="full">
			{[...Array(5)].map((_, index) => (
				<Box key={index} p={6} bg="white" borderRadius="lg" boxShadow="md" width="full">
					<VStack align="stretch" spacing={4}>
						<Skeleton height="24px" width="200px" />
						<Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4}>
							{[...Array(4)].map((_, i) => (
								<Box key={i}>
									<Skeleton height="16px" width="100px" mb={2} />
									<Skeleton height="20px" width="150px" />
								</Box>
							))}
						</Box>
					</VStack>
				</Box>
			))}
		</VStack>
	);
};
