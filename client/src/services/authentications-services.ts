import axiosInstance from "../api/axiosInstance";

export interface UserBasicInfo {
  _id: string;
  name: string;
  email: string;
}

export interface IUserRegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export const registerUser = async (registrationData: IUserRegistrationRequest): Promise<UserBasicInfo> => {
  // TODO: error handling
  const { data } = await axiosInstance.post<UserBasicInfo>('/register', registrationData);
  return data;
};

export const loginUser = async (auth: IUserLoginRequest): Promise<UserBasicInfo> => {
  // TODO: error handling
  const { data } = await axiosInstance.post<UserBasicInfo>('/login', auth);
  return data;
};

export const checkAuth = async (): Promise<{ status: number; user?: UserBasicInfo }> => {
  const response = await axiosInstance.get<{ user: UserBasicInfo }>('/auth/check');
  const { status, data: { user } } = response;
  return { status, user };
};

export const logoutUser = async (): Promise<{ status: number }> => {
  // TODO: error handling
  const { status } = await axiosInstance.post<{ status: number }>('/logout');
  return { status: status };
};
