import { Box, Heading, Text, SimpleGrid, VStack } from '@chakra-ui/react';
import type { Patient } from '../../types';

interface PatientCardProps {
	patient: Patient;
}

export const PatientCard = ({ patient }: PatientCardProps) => {
	return (
		<Box
			p={6}
			bg="white"
			borderRadius="lg"
			boxShadow="md"
			width="full"
			_hover={{ boxShadow: 'lg' }}
			transition="all 0.2s"
		>
			<VStack align="stretch" spacing={4}>
				<Heading size="md">{patient.fullName}</Heading>
				<SimpleGrid columns={2} spacing={4}>
					<Box>
						<Text fontWeight="bold" color="gray.600">
							Email:
						</Text>
						<Text>{patient.email}</Text>
					</Box>
					<Box>
						<Text fontWeight="bold" color="gray.600">
							Date of Birth:
						</Text>
						<Text>{new Date(patient.dob).toLocaleDateString()}</Text>
					</Box>
					<Box>
						<Text fontWeight="bold" color="gray.600">
							Status:
						</Text>
						<Text>{patient.status}</Text>
					</Box>
					<Box>
						<Text fontWeight="bold" color="gray.600">
							Occupation:
						</Text>
						<Text>{patient.occupation}</Text>
					</Box>
				</SimpleGrid>
			</VStack>
		</Box>
	);
};
