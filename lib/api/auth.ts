import axios from "axios";

type SignUpAPIBody = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
};

export const signupAPI = (body: SignUpAPIBody) =>
  axios.post("/api/auth/signup", body);
