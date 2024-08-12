import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL as string;

export interface IHabit {
  _id?: string;
  name: string;
}

export const getHabits = async (): Promise<IHabit[]> => {
  const response = await axios.get<IHabit[]>(`${API_URL}/habits`);
  return response.data;
};

export const createHabit = async (habit: IHabit): Promise<IHabit[]> => {
  const response = await axios.post<IHabit[]>(`${API_URL}/habits`, habit);
  return response.data;
};

export const updateHabit = async (id: String, habit: IHabit): Promise<IHabit[]> => {
  const response = await axios.put<IHabit[]>(`${API_URL}/habits/${id}`, habit);
  return response.data;
};
