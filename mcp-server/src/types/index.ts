export interface QueryRequest {
  text: string;
}

export interface LLMResponse {
  query?: string;
  error?: string;
}

export interface GraphQLResponse {
  data?: any;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: string[];
  }>;
}

export interface PaginationInput {
  page: number;
  pageSize: number;
}

export interface Patient {
  id: string;
  fullName: string;
  email: string;
  dob: string;
  status: string;
  occupation: string;
}

export interface PatientData {
  data: Patient[];
  pageInfo: {
    hasMore: boolean;
  };
}
