import { NextApiRequest, NextApiResponse } from "next";

const api = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "DELETE") {
      const cookie = `access_token=;path=/;httponly;`;
      res.setHeader("Set-Cookie", cookie);
      res.statusCode = 204;
      return res.end();
    }
  } catch (e) {
    console.log(e);
    return res.send(e.message);
  }
  res.statusCode = 405;
  return res.end();
};

export default api;
