import { apiClient } from "./apiClient";

// Define interfaces for login-related API responses
export interface SignInResponse {
  success: boolean;
  data: string | LoginCredentials;
}

export interface ChangePasswordResponse {
  success: boolean;
  data: string;
}

export interface LoginCredentials {
  UserId: string;
  CompanyId: number;
  UserEmail: string;
  CompanyName: string;
  UserRole: string;
  AppToken: string;
  locations: Location[];
}

export interface Location {
  LocationId: number;
  LocationName: string;
}

export interface SignInRequest {
  UserId: string;
  Password: string;
}

export interface ChangePasswordRequest {
  UserId: string;
  OTPCode: string;
  Password: string;
  ConfirmPassword: string;
}

// Sign in a user
export const signInUser = async (userId: string, password: string): Promise<SignInResponse> => {
  const response = await apiClient.post<SignInResponse>("/Login/SignInUser", {
    UserId: userId,
    Password: password,
  });
  return response.data;
};

// Change password via OTP (for new user registration)
export const changePasswordViaOTP = async (data: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
  const response = await apiClient.post<ChangePasswordResponse>("/Login/ChangePasswordViaOTP", data);
  return response.data;
};