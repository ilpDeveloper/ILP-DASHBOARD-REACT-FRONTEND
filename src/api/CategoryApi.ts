import axios from "axios";

// Use import.meta.env to access environment variables
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/Category`;
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 5000; // Fallback to 5000 if not set

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable credentials
});

// Add request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNREFUSED") {
      return Promise.reject({
        success: false,
        message: "Unable to connect to the server. Please check if the server is running.",
      });
    }
    if (error.message?.includes("CORS")) {
      return Promise.reject({
        success: false,
        message: "CORS error: Please check if the backend server has CORS properly configured.",
      });
    }
    return Promise.reject(error);
  }
);

// API response type
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Category interface
export interface Category {
  categoryName: string;
  bColor: number;
  catStatus: string | null;
  ageVerification: boolean;
  position: number;
  showPOS: string;
  ageVerification2: boolean;
  isSync: boolean;
}

// Error handling helper
const handleApiError = (error: any): ApiResponse<any> => {
  if (error.response) {
    return {
      success: false,
      message: error.response.data?.message || "An error occurred",
      data: null,
    };
  }
  if (error.request) {
    if (error.message?.includes("CORS")) {
      return {
        success: false,
        message: "CORS error: Please check if the backend server has CORS properly configured.",
        data: null,
      };
    }
    return {
      success: false,
      message: "No response received from server",
      data: null,
    };
  }
  return {
    success: false,
    message: error.message || "An error occurred",
    data: null,
  };
};

// Fetch all categories
export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Category[]>>("/");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch category by name
export const getCategoryByName = async (name: string): Promise<ApiResponse<Category>> => {
  try {
    const response = await apiClient.get<ApiResponse<Category>>(`/${name}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a new category
export const createCategory = async (category: Category): Promise<ApiResponse<string>> => {
  try {
    const response = await apiClient.post<ApiResponse<string>>("/", category);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update a category
export const updateCategory = async (name: string, category: Category): Promise<ApiResponse<string>> => {
  try {
    const response = await apiClient.put<ApiResponse<string>>(`/${name}`, category);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete a category
export const deleteCategory = async (name: string): Promise<ApiResponse<string>> => {
  try {
    const response = await apiClient.delete<ApiResponse<string>>(`/${name}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export { apiClient };