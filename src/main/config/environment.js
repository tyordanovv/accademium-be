import dotenv from "dotenv";

dotenv.config();

export const profile = process.env.PROFILE;

export const devDBConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
};

export const passwordConfig = {
  saltRounds: 12,
};

export const openaiConfig = {
  openai_url: process.env.VITE_OPENAI_API_URL, 
  openai_key: process.env.VITE_OPENAI_API_KEY,
};

export const awsConfig = {
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  clientId: process.env.COGNITO_CLIENT_ID,
  region: process.env.COGNITO_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  clientSecret: process.env.COGNITO_CLIENT_SECRET,
};
