import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL as string;

export interface IHabit {
  _id?: string;
  name: string;
}

export const IHabit = async (): Promise<IHabit[]> => {
  const response = await axios.get<IHabit[]>(`${API_URL}/habits`);
  return response.data;
};
