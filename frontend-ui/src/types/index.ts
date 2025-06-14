export interface Patient {
	id: string;
	fullName: string;
	email: string;
	dob: string;
	status: string | null;
	occupation: string;
}

export interface PatientData {
	data: Patient[];
	pageInfo: {
		hasMore: boolean;
	};
}

export interface QueryRequest {
	text: string;
}

export interface ApiError {
	message: string;
}

export interface ApiResponse {
	data?: {
		patients: PatientData;
	};
	errors?: ApiError[];
}
