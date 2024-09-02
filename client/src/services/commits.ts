import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL as string;

export interface ICommit {
  _id?: string;
  description: string;
  length: number;
  habit?: string;
  createdAt?: string;
}

export interface ICommitByDateInput {
  _id: string;
  count: number;
}

export interface ICommitByDateOutput {
  date: string;
  count: number;
  level: number;
}

export const getCommits = async (habitId: string): Promise<ICommit[]> => {
  const response = await axios.get<ICommit[]>(`${API_URL}/habit/${habitId}/commits`);
  return response.data;
};

export const getCommitsByDate = async (habitId: string): Promise<ICommitByDateOutput[]> => {
  const response = await axios.get<ICommitByDateInput[]>(`${API_URL}/habit/${habitId}/commitsByDate`);
  const commitsByDate = response.data.map((commitByDate) => {
    return (
      {
        "date": commitByDate._id,
        "count": commitByDate.count,
        "level": 1
      }
    )
  });

  return commitsByDate;
};

export const createCommit = async (commit: ICommit): Promise<ICommit[]> => {
  const response = await axios.post<ICommit[]>(`${API_URL}/commits`, {...commit});
  return response.data;
};

export const updateCommit = async (commitId: String, commit: ICommit): Promise<ICommit[]> => {
  const response = await axios.put<ICommit[]>(`${API_URL}/commits/${commitId}`, commit);
  return response.data;
};
