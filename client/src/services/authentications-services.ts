import axios from 'axios';
import axiosInstance from "../api/axiosInstance";

export interface UserBasicInfo {
  _id: string;
  name: string;
  email: string;
}

export interface IUserRegistrationResponse {
  _id?: string;
  name: string;
  email: string;
}

export interface IUserRegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  _id?: string;
  name?: string;
  email: string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUserLogoutResponse {
  status: number;
}

export const registerUser = async (registrationData: IUserRegistrationRequest): Promise<IUserRegistrationResponse> => {
  // TODO: error handling
  const response = await axiosInstance.post<IUserRegistrationRequest>('/register', registrationData);
  return response.data;
};

export const loginUser = async (auth: IUserLoginRequest): Promise<IUserLoginResponse> => {
  // TODO: error handling
  const response = await axiosInstance.post<IUserLoginRequest>('/login', auth);
  return response.data;
};

export const checkAuth = async (): Promise<{ status: number; user?: UserBasicInfo }> => {
  const response = await axiosInstance.get<{ user: UserBasicInfo }>('/auth/check');
  const { status, data: { user } } = response;
  return { status, user };
};

export const logoutUser = async (): Promise<IUserLogoutResponse> => {
  // TODO: error handling
  const response = await axiosInstance.post('/logout');
  return response;
};
