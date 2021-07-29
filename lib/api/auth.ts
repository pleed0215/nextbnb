import axios from "axios";
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
