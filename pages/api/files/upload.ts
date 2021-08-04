import { File, IncomingForm } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import aws from "aws-sdk";
import { createReadStream } from "fs";
import { v4 as uuid } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const url = new Promise<string>((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
          const s3 = new aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
          });
          console.log(
            process.env.AWS_ACCESS_KEY,
            process.env.AWS_SECRET_KEY,
            process.env.S3_BUCKET_NAME
          );
          console.log(files);
          const file: File = files.file as File;
          const stream = createReadStream(file.path);
          const originalName = file.name?.split(".").shift();
          const fileExtension = file.name?.split(".").pop();
          await s3
            .upload({
              Bucket: process.env.S3_BUCKET_NAME!,
              Key: `${originalName}__${uuid()}.${fileExtension}`,
              ACL: "public-read",
              Body: stream,
            })
            .promise()
            .then((res) => resolve(res.Location))
            .catch((e) => reject(e));
        });
      });
      res.statusCode = 201;
      return res.send(await url);
    } catch (e) {
      res.statusCode = 406;
      return res.send(e);
    }
    res.statusCode = 201;
    return res.end();
  }
  res.statusCode = 405;
  return res.end();
};

export default api;
