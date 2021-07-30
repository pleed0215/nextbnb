import { NextApiRequest, NextApiResponse } from "next";
import * as jwt from "jsonwebtoken";
import Data from "../../../lib/data";
import { StoredUserType } from "../../../lib/data/user";

const api = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const accessToken = req.headers.cookie;
      if (!accessToken) {
        res.statusCode = 400;
        return res.send("access_token이 없습니다.");
      }
      const userId = <string>jwt.verify(accessToken, process.env.SECRET_KEY!);
      const user = Data.user.getUserById(+userId);
      if (!user) {
        res.statusCode = 403;
        return res.send("user 정보를 가져올 수 없습니다.");
      }
      const newUserWithoutPassword: Partial<Pick<StoredUserType, "password">> =
        user;
      delete newUserWithoutPassword.password;
      res.statusCode = 200;
      return res.send(user);
    } catch (e) {
      res.statusCode = 500;
      return res.send(e);
    }
  }
  res.statusCode = 405;
  return res.end();
};

export default api;
