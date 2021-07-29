import { readFileSync, writeFileSync } from "fs";

export type StoredUserType = {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthday: string;
  profileImage: string;
};

const getList = () => {
  const usersBuffer = readFileSync("data/users.json");
  const usersString = usersBuffer.toString();
  if (!usersString) {
    return [];
  }
  const users: StoredUserType[] = JSON.parse(usersString);
  return users;
};

type ExistUserInput = {
  email: string;
};
const exist = ({ email }: ExistUserInput) => {
  const users = getList();
  return users.some((user) => user.email === email);
};

const write = (users: StoredUserType[]) => {
  writeFileSync("data/users.json", JSON.stringify(users));
};

const users = {
  getList,
  exist,
  write,
};

export default users;
