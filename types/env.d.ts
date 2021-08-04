declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
      PORT: string;
      AWS_ACCESS?: string;
      AWS_SECRET?: string;
      NODE_ENV: "production" | "development" | "test";
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_GOOGLE_API_KEY: string;
      AWS_ACCESS_KEY: string;
      AWS_SECRET_KEY: string;
      S3_BUCKET_NAME: string;
    }
  }
}
