import axios from "axios";
import type { ApiResponse, QueryRequest } from "../types";

const API_URL = import.meta.env.VITE_MCP_API_URL || "http://localhost:3000";

export const api = {
  async queryPatients(request: QueryRequest): Promise<ApiResponse> {
    try {
      const response = await axios.post<ApiResponse>(
        `${API_URL}/v1/api/query`,
        request
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      return {
        errors: [{ message: "Error connecting to the server" }],
      };
    }
  },
};
