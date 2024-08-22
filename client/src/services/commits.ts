import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL as string;

export interface ICommit {
  _id?: string;
  description: string;
  length: number;
  habit?: string;
}

export const getCommits = async (habitId: string): Promise<ICommit[]> => {
  const response = await axios.get<ICommit[]>(`${API_URL}/habit/${habitId}/commits`);
  return response.data;
};

export const createCommit = async (commit: ICommit): Promise<ICommit[]> => {
  const response = await axios.post<ICommit[]>(`${API_URL}/commits`, {...commit});
  return response.data;
};

export const updateCommit = async (commitId: String, commit: ICommit): Promise<ICommit[]> => {
  const response = await axios.put<ICommit[]>(`${API_URL}/commits/${commitId}`, commit);
  return response.data;
};
