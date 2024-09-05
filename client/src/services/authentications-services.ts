import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL as string;

export interface IAuthOutput {
  _id?: string;
  name: string;
  email: string;
}

export interface IAuthInput {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (auth: IAuthInput): Promise<IAuthOutput> => {
  const response = await axios.post<IAuthInput>(`${API_URL}/register`, auth);
  return response.data;
};

export const authenticateUser = async (auth: IAuthInput): Promise<IAuthOutput> => {
  const response = await axios.post<IAuthInput>(`${API_URL}/login`, auth);
  return response.data;
};

// TODO: add logout service
