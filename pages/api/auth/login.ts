import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { StoredUserType } from "../../../lib/data/user";

const api = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email || !password) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }
    const user = Data.user.getUser({ email });

    if (!user) {
      res.statusCode = 404;
      return res.send("로그인 하려는 유저가 없습니다.");
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      res.statusCode = 403;
      return res.send("패스워드가 맞지 않습니다.");
    }

    const token = jwt.sign(String(user.id), process.env.SECRET_KEY!);
    const cookieContent = `access_token=${token};path=/; expires=${new Date(
      Date.now() + 60 * 60 * 24 * 1000 * 3
    ).toISOString()};httponly`;

    res.setHeader("Set-Cookie", cookieContent);

    const newUserWithoutPassword: Partial<Pick<StoredUserType, "password">> =
      user;
    delete newUserWithoutPassword.password;
    res.statusCode = 201;
    return res.send(user);
  }
  res.statusCode = 405;
  return res.end();
};

export default api;
