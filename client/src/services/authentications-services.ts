import axios from 'axios';
import axiosInstance from "../api/axiosInstance";

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

export interface IUserCheckAuthResponse {
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

export const checkAuth = async (): Promise<IUserCheckAuthResponse> => {
  // TODO: error handling
  const response = await axiosInstance.get('/auth/check');
  return response;
};

// TODO: add logout service
