import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL as string;

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

export const registerUser = async (registrationData: IUserRegistrationRequest): Promise<IUserRegistrationResponse> => {
  // TODO: error handling
  const response = await axios.post<IUserRegistrationRequest>(`${API_URL}/register`, registrationData);
  return response.data;
};

export const loginUser = async (auth: IUserLoginRequest): Promise<IUserLoginResponse> => {
  // TODO: error handling
  const response = await axios.post<IUserLoginRequest>(`${API_URL}/login`, auth);
  return response.data;
};

// TODO: add logout service
