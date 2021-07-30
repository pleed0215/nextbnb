import axios from ".";
import { UserType } from "../../types/user";

type SignUpAPIBody = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
};

export const signupAPI = (body: SignUpAPIBody) =>
  axios.post<UserType>("/api/auth/signup", body);

type LoginAPIBody = {
  email: string;
  password: string;
};

export const loginAPI = (body: LoginAPIBody) =>
  axios.post<UserType>("/api/auth/login", body);

export const meAPI = () => axios.get<UserType>("/api/auth/me");
export const logoutAPI = () => axios.delete("/api/auth/logout");
