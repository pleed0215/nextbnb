import axios from ".";

export const uploadFileAPI = (file: FormData) =>
  axios.post<string>("/api/files/upload", file);
