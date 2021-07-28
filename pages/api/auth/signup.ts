import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { StoredUserType } from "../../../lib/data/user";

const api = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, firstname, lastname, password, birthday } = req.body;
    if (!email || !firstname || !lastname || !password || !birthday) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }
    const alreadyExist = Data.user.exist(email);
    if (alreadyExist) {
      res.statusCode = 409;
      res.send("이미 가입된 이메일입니다.");
    }
    const hasedPassword = bcrypt.hashSync(password, 8);
    const users = Data.user.getList();
    let userId;
    if (users.length === 0) {
      userId = 1;
    } else {
      userId = users[users.length].id + 1;
    }
    const newUser: StoredUserType = {
      id: userId,
      email,
      firstname,
      password: hasedPassword,
      lastname,
      birthday,
      profileImage: "/static/image/default-profile.jpg",
    };
    Data.user.write([...users, newUser]);
    const token = jwt.sign(String(newUser.id), process.env.SECRET_KEY!);
    res.setHeader(
      "Set-Cookie",
      `access_token=${token}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3
      )}; httponly`
    );

    return res.end();
  }
  res.statusCode = 405;
  return res.end();
};

export default api;
